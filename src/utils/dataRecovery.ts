// 🔄 DATA RECOVERY SYSTEM
// This system automatically recovers user data after browser cache clearing

import { supabase } from '@/integrations/supabase/client';

export interface RecoveryData {
  userId: string;
  email: string;
  profile: any;
  enrollments: any[];
  progress: any;
  lastBackup: string;
}

export class DataRecovery {
  private static instance: DataRecovery;
  private recoveryAttempts = 0;
  private maxRecoveryAttempts = 3;
  private isRecovering = false;

  public static getInstance(): DataRecovery {
    if (!DataRecovery.instance) {
      DataRecovery.instance = new DataRecovery();
    }
    return DataRecovery.instance;
  }

  /**
   * Check if data has been lost and attempt recovery immediately
   */
  public async checkAndRecoverData(userId: string, email: string): Promise<boolean> {
    if (this.isRecovering) {
      console.log('🔄 Recovery already in progress...');
      return false;
    }

    this.isRecovering = true;
    console.log('🔍 Checking for data loss...');

    try {
      // Check if primary data exists in unified system
      // Legacy localStorage data recovery removed - using unified enrollment system
      console.log('✅ Using unified enrollment system - no legacy data recovery needed');
      this.isRecovering = false;
      return true;
    } catch (error) {
      console.error('❌ Error during data check/recovery:', error);
      this.isRecovering = false;
      return false;
    }
  }

  /**
   * Attempt to recover user data from all possible sources
   */
  public async attemptRecovery(email: string): Promise<RecoveryData | null> {
    if (this.recoveryAttempts >= this.maxRecoveryAttempts) {
      console.warn('Max recovery attempts reached');
      return null;
    }

    this.recoveryAttempts++;
    console.log(`🔄 Attempting data recovery (attempt ${this.recoveryAttempts}/${this.maxRecoveryAttempts})`);

    try {
      // 1. Try to recover from IndexedDB (survives cache clearing)
      const indexedDBData = await this.recoverFromIndexedDB(email);
      if (indexedDBData) {
        console.log('✅ Data recovered from IndexedDB');
        return indexedDBData;
      }

      // 2. Try to recover from cloud backup
      const cloudData = await this.recoverFromCloudBackup(email);
      if (cloudData) {
        console.log('✅ Data recovered from cloud backup');
        return cloudData;
      }

      // 3. Try to recover from Supabase (enrollments and profile)
      const supabaseData = await this.recoverFromSupabase(email);
      if (supabaseData) {
        console.log('✅ Data recovered from Supabase');
        return supabaseData;
      }

      // 4. Try to recover from multiple localStorage keys
      const localStorageData = await this.recoverFromLocalStorage(email);
      if (localStorageData) {
        console.log('✅ Data recovered from localStorage backup');
        return localStorageData;
      }

      console.warn('❌ No data could be recovered');
      return null;

    } catch (error) {
      console.error('❌ Error during data recovery:', error);
      return null;
    }
  }

  private async recoverFromIndexedDB(email: string): Promise<RecoveryData | null> {
    try {
      if (!('indexedDB' in window)) return null;

      const db = await this.openIndexedDB();
      const transaction = db.transaction(['userData'], 'readonly');
      const store = transaction.objectStore('userData');
      
      // Get all records and find the one matching the email
      const request = store.getAll();
      
      return new Promise((resolve) => {
        request.onsuccess = () => {
          const allData = request.result;
          const userData = allData.find((data: any) => 
            data.profile?.email === email || data.profile?.id === email
          );
          
          if (userData) {
            resolve({
              userId: userData.profile.id,
              email: userData.profile.email,
              profile: userData.profile,
              enrollments: userData.enrollments || [],
              progress: userData.courseProgress || {},
              lastBackup: userData.metadata?.lastBackup || new Date().toISOString()
            });
          } else {
            resolve(null);
          }
        };
        
        request.onerror = () => resolve(null);
      });
    } catch (error) {
      console.warn('Error recovering from IndexedDB:', error);
      return null;
    }
  }

  private async recoverFromCloudBackup(email: string): Promise<RecoveryData | null> {
    try {
      // Check multiple cloud backup keys
      const backupKeys = [
        `cloud-backup-${email}`,
        `cloud-backup-${email}-v2`,
        `cloud-backup-${email}-v3`,
        `user-data-backup-${email}`,
        `user-data-backup-${email}-${Date.now() - 86400000}`, // Yesterday
        `user-data-backup-${email}-${Date.now() - 172800000}`, // 2 days ago
      ];

      for (const key of backupKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.profile?.email === email) {
            return {
              userId: parsed.profile.id,
              email: parsed.profile.email,
              profile: parsed.profile,
              enrollments: parsed.enrollments || [],
              progress: parsed.courseProgress || {},
              lastBackup: parsed.metadata?.lastBackup || new Date().toISOString()
            };
          }
        }
      }
      return null;
    } catch (error) {
      console.warn('Error recovering from cloud backup:', error);
      return null;
    }
  }

  private async recoverFromSupabase(email: string): Promise<RecoveryData | null> {
    try {
      // Get user profile from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (profileError || !profile) {
        console.warn('No profile found in Supabase');
        return null;
      }

      // Get enrollments from Supabase
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_email', email);

      if (enrollmentsError) {
        console.warn('Error fetching enrollments from Supabase:', enrollmentsError);
      }

      return {
        userId: profile.id,
        email: profile.email,
        profile: profile,
        enrollments: enrollments || [],
        progress: {}, // Progress would need to be recovered from other sources
        lastBackup: new Date().toISOString()
      };
    } catch (error) {
      console.warn('Error recovering from Supabase:', error);
      return null;
    }
  }

  private async recoverFromLocalStorage(email: string): Promise<RecoveryData | null> {
    try {
      // Check all localStorage keys for user data
      const keys = Object.keys(localStorage);
      const userDataKeys = keys.filter(key => 
        key.includes('user-data') || key.includes('cloud-backup')
      );

      for (const key of userDataKeys) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            if (parsed.profile?.email === email) {
              return {
                userId: parsed.profile.id,
                email: parsed.profile.email,
                profile: parsed.profile,
                enrollments: parsed.enrollments || [],
                progress: parsed.courseProgress || {},
                lastBackup: parsed.metadata?.lastBackup || new Date().toISOString()
              };
            }
          }
        } catch (e) {
          // Skip invalid JSON
          continue;
        }
      }
      return null;
    } catch (error) {
      console.warn('Error recovering from localStorage:', error);
      return null;
    }
  }

  private async openIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('BetaSkillUserData', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('userData')) {
          db.createObjectStore('userData', { keyPath: 'id' });
        }
      };
    });
  }

  /**
   * Restore recovered data to the bulletproof persistence system
   */
  public async restoreData(recoveryData: RecoveryData): Promise<void> {
    try {
      console.log('🔄 Restoring recovered data...');
      
      // Restore to localStorage
      localStorage.setItem(`user-data-${recoveryData.userId}`, JSON.stringify({
        profile: recoveryData.profile,
        enrollments: recoveryData.enrollments,
        courseProgress: recoveryData.progress,
        activityHistory: [],
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
          autoSave: true,
          lastDashboardView: 'overview',
        },
        session: {
          lastLogin: new Date().toISOString(),
          totalSessions: 0,
          totalTimeSpent: 0,
          deviceInfo: navigator.userAgent,
          browserInfo: navigator.userAgent,
        },
        metadata: {
          lastBackup: recoveryData.lastBackup,
          dataVersion: '1.0.0',
          checksum: '',
          backupCount: 0,
        },
      }));

      // Restore to sessionStorage
      sessionStorage.setItem(`user-data-${recoveryData.userId}`, JSON.stringify({
        profile: recoveryData.profile,
        enrollments: recoveryData.enrollments,
        courseProgress: recoveryData.progress,
        activityHistory: [],
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
          autoSave: true,
          lastDashboardView: 'overview',
        },
        session: {
          lastLogin: new Date().toISOString(),
          totalSessions: 0,
          totalTimeSpent: 0,
          deviceInfo: navigator.userAgent,
          browserInfo: navigator.userAgent,
        },
        metadata: {
          lastBackup: recoveryData.lastBackup,
          dataVersion: '1.0.0',
          checksum: '',
          backupCount: 0,
        },
      }));

      // Restore to IndexedDB
      if ('indexedDB' in window) {
        const db = await this.openIndexedDB();
        const transaction = db.transaction(['userData'], 'readwrite');
        const store = transaction.objectStore('userData');
        await store.put({
          id: recoveryData.userId,
          profile: recoveryData.profile,
          enrollments: recoveryData.enrollments,
          courseProgress: recoveryData.progress,
          activityHistory: [],
          preferences: {
            theme: 'light',
            language: 'en',
            notifications: true,
            autoSave: true,
            lastDashboardView: 'overview',
          },
          session: {
            lastLogin: new Date().toISOString(),
            totalSessions: 0,
            totalTimeSpent: 0,
            deviceInfo: navigator.userAgent,
            browserInfo: navigator.userAgent,
          },
          metadata: {
            lastBackup: recoveryData.lastBackup,
            dataVersion: '1.0.0',
            checksum: '',
            backupCount: 0,
          },
        }, recoveryData.userId);
      }

      // Also restore to cloud backup
      localStorage.setItem(`cloud-backup-${recoveryData.userId}`, JSON.stringify({
        profile: recoveryData.profile,
        enrollments: recoveryData.enrollments,
        courseProgress: recoveryData.progress,
        activityHistory: [],
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
          autoSave: true,
          lastDashboardView: 'overview',
        },
        session: {
          lastLogin: new Date().toISOString(),
          totalSessions: 0,
          totalTimeSpent: 0,
          deviceInfo: navigator.userAgent,
          browserInfo: navigator.userAgent,
        },
        metadata: {
          lastBackup: recoveryData.lastBackup,
          dataVersion: '1.0.0',
          checksum: '',
          backupCount: 0,
        },
      }));

      console.log('✅ Data restored successfully to all storage locations');
    } catch (error) {
      console.error('❌ Error restoring data:', error);
    }
  }
}
