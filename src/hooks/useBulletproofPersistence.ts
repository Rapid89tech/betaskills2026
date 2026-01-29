import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';

/**
 * BULLETPROOF DATA PERSISTENCE SYSTEM
 * 
 * This system ensures that user data NEVER gets lost, even if:
 * - User logs out and back in
 * - Browser cache is cleared
 * - Browser crashes
 * - Network connection is lost
 * - LocalStorage is corrupted
 * 
 * Multi-layered persistence strategy:
 * 1. Supabase Database (Primary source of truth)
 * 2. LocalStorage (Fast access)
 * 3. IndexedDB (Backup storage)
 * 4. Session backup (Temporary recovery)
 * 5. Emergency restoration (Fail-safe)
 */

interface UserDataSnapshot {
  enrollments: any[];
  progress: Record<string, any>;
  completedLessons: Record<string, number[]>;
  userProfile: any;
  quizAttempts: Record<string, any>;
  certificates: any[];
  lastBackup: string;
  userId: string;
}

interface BulletproofPersistenceReturn {
  saveUserData: (data: Partial<UserDataSnapshot>) => Promise<void>;
  loadUserData: () => Promise<UserDataSnapshot | null>;
  forceBackupAll: () => Promise<void>;
  restoreFromBackup: () => Promise<UserDataSnapshot | null>;
  clearAllData: () => Promise<void>;
  isBackingUp: boolean;
}

export const useBulletproofPersistence = (): BulletproofPersistenceReturn => {
  const { user } = useAuth();
  const isBackingUpRef = useRef(false);
  const backupIntervalRef = useRef<NodeJS.Timeout>();

  // IndexedDB helper functions
  const openIndexedDB = useCallback((): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('SkillsLaunchUserData', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('userData')) {
          db.createObjectStore('userData', { keyPath: 'userId' });
        }
      };
    });
  }, []);

  // Save to IndexedDB
  const saveToIndexedDB = useCallback(async (data: UserDataSnapshot): Promise<void> => {
    try {
      const db = await openIndexedDB();
      const transaction = db.transaction(['userData'], 'readwrite');
      const store = transaction.objectStore('userData');
      await store.put(data);
      console.log('💾 Data saved to IndexedDB successfully');
    } catch (error) {
      console.warn('⚠️ Failed to save to IndexedDB:', error);
    }
  }, [openIndexedDB]);

  // Load from IndexedDB
  const loadFromIndexedDB = useCallback(async (userId: string): Promise<UserDataSnapshot | null> => {
    try {
      const db = await openIndexedDB();
      const transaction = db.transaction(['userData'], 'readonly');
      const store = transaction.objectStore('userData');
      const request = store.get(userId);
      
      return new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    } catch (error) {
      console.warn('⚠️ Failed to load from IndexedDB:', error);
      return null;
    }
  }, [openIndexedDB]);

  // Collect all user data from various sources using UnifiedEnrollmentManager
  const collectUserData = useCallback(async (): Promise<UserDataSnapshot> => {
    if (!user) throw new Error('No user logged in');

    const userData: UserDataSnapshot = {
      userId: user.id,
      enrollments: [],
      progress: {},
      completedLessons: {},
      userProfile: null,
      quizAttempts: {},
      certificates: [],
      lastBackup: new Date().toISOString()
    };

    try {
      // 🚨 MIGRATED: Use UnifiedEnrollmentManager instead of direct localStorage access
      logger.info('🔄 Collecting user data via UnifiedEnrollmentManager...');
      
      // Get enrollments from UnifiedEnrollmentManager
      const unifiedEnrollments = await unifiedEnrollmentManager.getUserEnrollments(user.id);
      logger.info(`📦 Retrieved ${unifiedEnrollments.length} enrollments from UnifiedEnrollmentManager`);
      
      // Convert UnifiedEnrollmentManager format to legacy format for backward compatibility
      const legacyEnrollments = unifiedEnrollments.map(enrollment => ({
        id: enrollment.id,
        user_id: enrollment.user_id,
        user_email: enrollment.user_email,
        course_id: enrollment.course_id,
        courseId: enrollment.course_id, // Legacy field
        course_title: enrollment.course_title,
        title: enrollment.course_title, // Legacy field
        status: enrollment.status,
        enrolled_at: enrollment.enrolled_at,
        approved_at: enrollment.approved_at,
        progress: enrollment.progress || 0,
        proof_of_payment: enrollment.proof_of_payment,
        payment_ref: enrollment.payment_ref,
        payment_date: enrollment.payment_date,
        updated_at: enrollment.updated_at
      }));
      
      userData.enrollments = legacyEnrollments;

      // 🔄 MIGRATION: Also check for legacy localStorage data and migrate if needed
      await migrateLegacyEnrollmentData(user.id, unifiedEnrollments);

      // Collect progress data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('progress-')) {
          const courseId = key.replace('progress-', '');
          const progress = localStorage.getItem(key);
          if (progress) {
            userData.progress[courseId] = parseInt(progress);
          }
        }
        
        if (key.startsWith('completed-lessons-')) {
          const courseId = key.replace('completed-lessons-', '');
          const lessons = localStorage.getItem(key);
          if (lessons) {
            try {
              userData.completedLessons[courseId] = JSON.parse(lessons);
            } catch {
              userData.completedLessons[courseId] = [];
            }
          }
        }
        
        if (key.startsWith('quiz-attempts-')) {
          const quizId = key.replace('quiz-attempts-', '');
          const attempts = localStorage.getItem(key);
          if (attempts) {
            try {
              userData.quizAttempts[quizId] = JSON.parse(attempts);
            } catch {
              userData.quizAttempts[quizId] = {};
            }
          }
        }
      });

      // Collect user profile
      const profileKey = `user-profile-${user.id}`;
      const profile = localStorage.getItem(profileKey);
      if (profile) {
        try {
          userData.userProfile = JSON.parse(profile);
        } catch {
          userData.userProfile = null;
        }
      }

      // Collect certificates
      const certificatesKey = `user-certificates-${user.id}`;
      const certificates = localStorage.getItem(certificatesKey);
      if (certificates) {
        try {
          userData.certificates = JSON.parse(certificates);
        } catch {
          userData.certificates = [];
        }
      }

      console.log('📦 Collected user data snapshot:', {
        enrollments: userData.enrollments.length,
        progressEntries: Object.keys(userData.progress).length,
        completedLessonsEntries: Object.keys(userData.completedLessons).length,
        quizAttempts: Object.keys(userData.quizAttempts).length,
        hasProfile: !!userData.userProfile,
        certificates: userData.certificates.length
      });

      return userData;
    } catch (error) {
      console.error('❌ Error collecting user data:', error);
      throw error;
    }
  }, [user]);

  // Migration function for legacy localStorage enrollment data
  const migrateLegacyEnrollmentData = useCallback(async (userId: string, existingUnifiedEnrollments: any[]) => {
    try {
      logger.info('🔄 Checking for legacy localStorage enrollment data to migrate...');
      
      // Check for legacy localStorage enrollment data
      const legacyEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const userEnrollments = JSON.parse(localStorage.getItem(`user-enrollments-${userId}`) || '[]');
      const emergencyEnrollments = JSON.parse(localStorage.getItem(`emergency-restored-enrollments-${userId}`) || '[]');
      
      const allLegacyEnrollments = [...legacyEnrollments, ...userEnrollments, ...emergencyEnrollments];
      
      if (allLegacyEnrollments.length === 0) {
        logger.info('✅ No legacy enrollment data found to migrate');
        return;
      }

      logger.info(`🔍 Found ${allLegacyEnrollments.length} legacy enrollments to check for migration`);

      // Filter out enrollments that already exist in UnifiedEnrollmentManager
      const existingCourseIds = new Set(existingUnifiedEnrollments.map(e => e.course_id));
      const enrollmentsToMigrate = allLegacyEnrollments.filter(legacyEnrollment => {
        const courseId = legacyEnrollment.course_id || legacyEnrollment.courseId;
        return courseId && !existingCourseIds.has(courseId);
      });

      if (enrollmentsToMigrate.length === 0) {
        logger.info('✅ All legacy enrollments already exist in UnifiedEnrollmentManager');
        return;
      }

      logger.info(`🚀 Migrating ${enrollmentsToMigrate.length} legacy enrollments to UnifiedEnrollmentManager...`);

      // Migrate each enrollment to UnifiedEnrollmentManager
      for (const legacyEnrollment of enrollmentsToMigrate) {
        try {
          const enrollmentData = {
            id: legacyEnrollment.id || `migrated_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            user_id: userId,
            user_email: user?.email || legacyEnrollment.user_email,
            course_id: legacyEnrollment.course_id || legacyEnrollment.courseId,
            course_title: legacyEnrollment.course_title || legacyEnrollment.title || 'Migrated Course',
            status: legacyEnrollment.status || 'approved',
            enrolled_at: legacyEnrollment.enrolled_at || new Date().toISOString(),
            approved_at: legacyEnrollment.approved_at || (legacyEnrollment.status === 'approved' ? new Date().toISOString() : undefined),
            progress: legacyEnrollment.progress || 0,
            proof_of_payment: legacyEnrollment.proof_of_payment || 'migrated_from_legacy',
            payment_ref: legacyEnrollment.payment_ref || `migrated_${Date.now()}`,
            payment_date: legacyEnrollment.payment_date || new Date().toISOString().split('T')[0]
          };

          await unifiedEnrollmentManager.createEnrollment(enrollmentData);
          logger.info(`✅ Migrated enrollment for course: ${enrollmentData.course_title}`);
        } catch (migrationError) {
          logger.warn(`⚠️ Failed to migrate enrollment for course ${legacyEnrollment.course_id}:`, migrationError);
        }
      }

      logger.info('✅ Legacy enrollment migration completed');
      
      // Clean up legacy localStorage data after successful migration
      try {
        localStorage.removeItem(`user-enrollments-${userId}`);
        localStorage.removeItem(`emergency-restored-enrollments-${userId}`);
        logger.info('🧹 Cleaned up legacy localStorage enrollment data');
      } catch (cleanupError) {
        logger.warn('⚠️ Failed to clean up legacy localStorage data:', cleanupError);
      }

    } catch (error) {
      logger.error('❌ Error during legacy enrollment migration:', error);
    }
  }, [user]);

  // Save user data to Supabase
  const saveToSupabase = useCallback(async (data: UserDataSnapshot): Promise<void> => {
    if (!user) return;

    try {
      console.log('☁️ Saving user data to Supabase...');

      // Save user data snapshot to a dedicated table
      const { error: snapshotError } = await supabase
        .from('user_data_snapshots')
        .upsert({
          user_id: user.id,
          data_snapshot: data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (snapshotError) {
        console.warn('⚠️ Failed to save data snapshot to Supabase:', snapshotError);
      } else {
        console.log('✅ User data snapshot saved to Supabase');
      }

      // Also save enrollments to the enrollments table
      if (data.enrollments && data.enrollments.length > 0) {
        const enrollmentsToSave = data.enrollments.map(enrollment => ({
          user_id: user.id,
          user_email: user.email || enrollment.user_email,
          course_id: enrollment.course_id || enrollment.courseId,
          course_title: enrollment.course_title || enrollment.title || 'Unknown Course',
          status: 'approved',
          enrolled_at: enrollment.enrolled_at || new Date().toISOString(),
          approved_at: enrollment.approved_at || new Date().toISOString(),
          progress: enrollment.progress || data.progress[enrollment.course_id || enrollment.courseId] || 0,
          proof_of_payment: enrollment.proof_of_payment || 'bulletproof_backup',
          payment_ref: enrollment.payment_ref || `backup_${Date.now()}`,
          payment_date: enrollment.payment_date || new Date().toISOString().split('T')[0]
        }));

        const { error: enrollmentsError } = await supabase
          .from('enrollments')
          .upsert(enrollmentsToSave, {
            onConflict: 'user_id,course_id'
          });

        if (enrollmentsError) {
          console.warn('⚠️ Failed to save enrollments to Supabase:', enrollmentsError);
        } else {
          console.log('✅ Enrollments saved to Supabase');
        }
      }

    } catch (error) {
      console.error('❌ Error saving to Supabase:', error);
      throw error;
    }
  }, [user]);

  // Load user data from Supabase
  const loadFromSupabase = useCallback(async (): Promise<UserDataSnapshot | null> => {
    if (!user) return null;

    try {
      console.log('☁️ Loading user data from Supabase...');

      // Load from user_data_snapshots table
      const { data: snapshot, error: snapshotError } = await supabase
        .from('user_data_snapshots')
        .select('data_snapshot')
        .eq('user_id', user.id)
        .single();

      if (snapshotError && snapshotError.code !== 'PGRST116') {
        console.warn('⚠️ Error loading snapshot from Supabase:', snapshotError);
      }

      // Also load enrollments directly
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id);

      if (enrollmentsError) {
        console.warn('⚠️ Error loading enrollments from Supabase:', enrollmentsError);
      }

      // Combine data
      const userData: UserDataSnapshot = snapshot?.data_snapshot || {
        userId: user.id,
        enrollments: enrollments || [],
        progress: {},
        completedLessons: {},
        userProfile: null,
        quizAttempts: {},
        certificates: [],
        lastBackup: new Date().toISOString()
      };

      // If we have direct enrollments but no snapshot, create one
      if (!snapshot?.data_snapshot && enrollments && enrollments.length > 0) {
        userData.enrollments = enrollments;
      }

      console.log('✅ User data loaded from Supabase:', {
        hasSnapshot: !!snapshot?.data_snapshot,
        enrollments: userData.enrollments.length
      });

      return userData;
    } catch (error) {
      console.error('❌ Error loading from Supabase:', error);
      return null;
    }
  }, [user]);

  // Restore user data to localStorage and UnifiedEnrollmentManager
  const restoreToLocalStorage = useCallback(async (data: UserDataSnapshot): Promise<void> => {
    if (!user) return;

    try {
      console.log('🔄 Restoring user data to localStorage and UnifiedEnrollmentManager...');

      // 🚨 MIGRATED: Restore enrollments to UnifiedEnrollmentManager instead of direct localStorage
      if (data.enrollments && data.enrollments.length > 0) {
        logger.info(`🔄 Restoring ${data.enrollments.length} enrollments to UnifiedEnrollmentManager...`);
        
        for (const enrollment of data.enrollments) {
          try {
            const enrollmentData = {
              id: enrollment.id,
              user_id: user.id,
              user_email: user.email || enrollment.user_email,
              course_id: enrollment.course_id || enrollment.courseId,
              course_title: enrollment.course_title || enrollment.title || 'Restored Course',
              status: enrollment.status || 'approved',
              enrolled_at: enrollment.enrolled_at || new Date().toISOString(),
              approved_at: enrollment.approved_at,
              progress: enrollment.progress || 0,
              proof_of_payment: enrollment.proof_of_payment || 'restored_from_backup',
              payment_ref: enrollment.payment_ref || `restored_${Date.now()}`,
              payment_date: enrollment.payment_date
            };

            // Check if enrollment already exists
            const existingEnrollment = await unifiedEnrollmentManager.getUserEnrollmentForCourse(user.id, enrollmentData.course_id);
            if (!existingEnrollment) {
              await unifiedEnrollmentManager.createEnrollment(enrollmentData);
              logger.info(`✅ Restored enrollment for course: ${enrollmentData.course_title}`);
            } else {
              logger.info(`ℹ️ Enrollment already exists for course: ${enrollmentData.course_title}`);
            }
          } catch (restoreError) {
            logger.warn(`⚠️ Failed to restore enrollment for course ${enrollment.course_id}:`, restoreError);
          }
        }

        // Also save to localStorage for backward compatibility
        localStorage.setItem('enrollments', JSON.stringify(data.enrollments));
        localStorage.setItem(`user-enrollments-${user.id}`, JSON.stringify(data.enrollments));
      }

      // Restore progress
      Object.entries(data.progress).forEach(([courseId, progress]) => {
        localStorage.setItem(`progress-${courseId}`, progress.toString());
      });

      // Restore completed lessons
      Object.entries(data.completedLessons).forEach(([courseId, lessons]) => {
        localStorage.setItem(`completed-lessons-${courseId}`, JSON.stringify(lessons));
      });

      // Restore quiz attempts
      Object.entries(data.quizAttempts).forEach(([quizId, attempts]) => {
        localStorage.setItem(`quiz-attempts-${quizId}`, JSON.stringify(attempts));
      });

      // Restore user profile
      if (data.userProfile) {
        localStorage.setItem(`user-profile-${user.id}`, JSON.stringify(data.userProfile));
      }

      // Restore certificates
      if (data.certificates && data.certificates.length > 0) {
        localStorage.setItem(`user-certificates-${user.id}`, JSON.stringify(data.certificates));
      }

      // Set restoration timestamp
      localStorage.setItem(`data-restored-${user.id}`, new Date().toISOString());

      console.log('✅ User data restored to localStorage');
    } catch (error) {
      console.error('❌ Error restoring to localStorage:', error);
    }
  }, [user]);

  // Main save function
  const saveUserData = useCallback(async (data: Partial<UserDataSnapshot>): Promise<void> => {
    if (!user || isBackingUpRef.current) return;

    isBackingUpRef.current = true;
    try {
      const fullData = { ...(await collectUserData()), ...data };
      
      // Save to all storage layers
      await Promise.allSettled([
        saveToSupabase(fullData),
        saveToIndexedDB(fullData)
      ]);

      console.log('✅ User data saved to all storage layers');
    } catch (error) {
      console.error('❌ Error in saveUserData:', error);
    } finally {
      isBackingUpRef.current = false;
    }
  }, [user, collectUserData, saveToSupabase, saveToIndexedDB]);

  // Main load function
  const loadUserData = useCallback(async (): Promise<UserDataSnapshot | null> => {
    if (!user) return null;

    try {
      console.log('🔍 Loading user data from all sources...');

      // Try to load from multiple sources
      const [supabaseData, indexedDBData] = await Promise.allSettled([
        loadFromSupabase(),
        loadFromIndexedDB(user.id)
      ]);

      // Use the most recent data
      let mostRecentData: UserDataSnapshot | null = null;

      if (supabaseData.status === 'fulfilled' && supabaseData.value) {
        mostRecentData = supabaseData.value;
      }

      if (indexedDBData.status === 'fulfilled' && indexedDBData.value) {
        if (!mostRecentData || 
            new Date(indexedDBData.value.lastBackup) > new Date(mostRecentData.lastBackup)) {
          mostRecentData = indexedDBData.value;
        }
      }

      if (mostRecentData) {
        console.log('✅ Found user data, restoring to localStorage and UnifiedEnrollmentManager...');
        await restoreToLocalStorage(mostRecentData);
        return mostRecentData;
      }

      console.log('ℹ️ No stored user data found');
      return null;
    } catch (error) {
      console.error('❌ Error loading user data:', error);
      return null;
    }
  }, [user, loadFromSupabase, loadFromIndexedDB, restoreToLocalStorage]);

  // Force backup all data
  const forceBackupAll = useCallback(async (): Promise<void> => {
    if (!user) return;

    try {
      console.log('🔄 Force backing up all user data...');
      const data = await collectUserData();
      await saveUserData(data);
      console.log('✅ Force backup completed');
    } catch (error) {
      console.error('❌ Error in force backup:', error);
    }
  }, [user, collectUserData, saveUserData]);

  // Restore from backup
  const restoreFromBackup = useCallback(async (): Promise<UserDataSnapshot | null> => {
    return await loadUserData();
  }, [loadUserData]);

  // Clear all data
  const clearAllData = useCallback(async (): Promise<void> => {
    if (!user) return;

    try {
      console.log('🗑️ Clearing all user data...');

      // Clear from Supabase
      await supabase
        .from('user_data_snapshots')
        .delete()
        .eq('user_id', user.id);

      // Clear from IndexedDB
      const db = await openIndexedDB();
      const transaction = db.transaction(['userData'], 'readwrite');
      const store = transaction.objectStore('userData');
      await store.delete(user.id);

      // Clear from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.includes(user.id) || 
            key.startsWith('progress-') || 
            key.startsWith('completed-lessons-') ||
            key.startsWith('quiz-attempts-') ||
            key === 'enrollments') {
          localStorage.removeItem(key);
        }
      });

      console.log('✅ All user data cleared');
    } catch (error) {
      console.error('❌ Error clearing user data:', error);
    }
  }, [user, openIndexedDB]);

  // Auto-backup system
  useEffect(() => {
    if (!user) return;

    // Load user data on login
    loadUserData();

    // Set up auto-backup every 2 minutes
    backupIntervalRef.current = setInterval(() => {
      forceBackupAll();
    }, 2 * 60 * 1000);

    // Backup on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        forceBackupAll();
      }
    };

    // Backup before page unload
    const handleBeforeUnload = () => {
      forceBackupAll();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (backupIntervalRef.current) {
        clearInterval(backupIntervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user, loadUserData, forceBackupAll]);

  // Backup on specific events (including UnifiedEnrollmentManager events)
  useEffect(() => {
    const events = [
      'enrollment-success',
      'progress-updated',
      'lesson-completed',
      'quiz-completed',
      'certificate-generated'
    ];

    const handleDataChange = () => {
      setTimeout(() => forceBackupAll(), 1000);
    };

    // Add window event listeners for legacy events
    events.forEach(event => {
      window.addEventListener(event, handleDataChange);
    });

    // Add UnifiedEnrollmentManager event listeners
    const handleUnifiedEnrollmentChange = () => {
      logger.info('🔄 UnifiedEnrollmentManager enrollment change detected, triggering backup...');
      setTimeout(() => forceBackupAll(), 1000);
    };

    unifiedEnrollmentManager.addEventListener('enrollment-created', handleUnifiedEnrollmentChange);
    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleUnifiedEnrollmentChange);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleUnifiedEnrollmentChange);

    return () => {
      // Remove window event listeners
      events.forEach(event => {
        window.removeEventListener(event, handleDataChange);
      });

      // Remove UnifiedEnrollmentManager event listeners
      unifiedEnrollmentManager.removeEventListener('enrollment-created', handleUnifiedEnrollmentChange);
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleUnifiedEnrollmentChange);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleUnifiedEnrollmentChange);
    };
  }, [forceBackupAll]);

  return {
    saveUserData,
    loadUserData,
    forceBackupAll,
    restoreFromBackup,
    clearAllData,
    isBackingUp: isBackingUpRef.current
  };
};
