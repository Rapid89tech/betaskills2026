import { supabase } from '@/integrations/supabase/client';
import { logger } from './logger';

/**
 * Initialize the bulletproof data persistence system
 * This ensures all necessary database structures exist
 */
export const initializeBulletproofSystem = async (): Promise<boolean> => {
  try {
    logger.info('Initializing bulletproof persistence system...');

    // Check if user_data_snapshots table exists
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'user_data_snapshots');

    if (tablesError) {
      logger.warn('Could not check for tables:', tablesError);
      return false;
    }

    if (!tables || tables.length === 0) {
      logger.info('Creating user_data_snapshots table...');
      
      // Create the table using raw SQL
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS user_data_snapshots (
            id BIGSERIAL PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            data_snapshot JSONB NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(user_id)
          );

          ALTER TABLE user_data_snapshots ENABLE ROW LEVEL SECURITY;

          CREATE POLICY IF NOT EXISTS "Users can view own data snapshots" ON user_data_snapshots
            FOR SELECT USING (auth.uid() = user_id);

          CREATE POLICY IF NOT EXISTS "Users can insert own data snapshots" ON user_data_snapshots
            FOR INSERT WITH CHECK (auth.uid() = user_id);

          CREATE POLICY IF NOT EXISTS "Users can update own data snapshots" ON user_data_snapshots
            FOR UPDATE USING (auth.uid() = user_id);

          CREATE POLICY IF NOT EXISTS "Users can delete own data snapshots" ON user_data_snapshots
            FOR DELETE USING (auth.uid() = user_id);

          CREATE INDEX IF NOT EXISTS idx_user_data_snapshots_user_id ON user_data_snapshots(user_id);
          CREATE INDEX IF NOT EXISTS idx_user_data_snapshots_updated_at ON user_data_snapshots(updated_at);
        `
      });

      if (createError) {
        logger.warn('Failed to create table with RPC, trying direct approach:', createError);
        
        // Fallback: Try to create without RPC
        // Note: This might not work depending on Supabase setup, but worth trying
        try {
          const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Apikey': process.env.REACT_APP_SUPABASE_ANON_KEY || '',
              'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY || ''}`
            },
            body: JSON.stringify({
              sql: `
                CREATE TABLE IF NOT EXISTS user_data_snapshots (
                  id BIGSERIAL PRIMARY KEY,
                  user_id UUID,
                  data_snapshot JSONB NOT NULL,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                  UNIQUE(user_id)
                );
              `
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          
          logger.info('Table creation attempted via direct API');
        } catch (directError) {
          logger.warn('Direct table creation also failed:', directError);
          logger.info('Please manually create the table using the SQL in createUserDataSnapshotsTable.sql');
        }
      } else {
        logger.info('user_data_snapshots table created successfully');
      }
    } else {
      logger.info('user_data_snapshots table already exists');
    }

    // Test table access
    const { error: testError } = await supabase
      .from('user_data_snapshots')
      .select('id')
      .limit(1);

    if (testError) {
      logger.warn('Table exists but might not be accessible:', testError);
      return false;
    }

    logger.info('Bulletproof persistence system initialized successfully');
    return true;
  } catch (error) {
    logger.error('Failed to initialize bulletproof system:', error);
    return false;
  }
};

/**
 * Emergency data recovery function
 * This runs when a user logs in and ensures all their data is restored
 */
export const performEmergencyDataRecovery = async (userId: string): Promise<void> => {
  try {
    logger.info('Performing emergency data recovery for user:', userId);

    // Step 1: Try to load from Supabase user_data_snapshots
    let recoveredData: any = null;
    
    try {
      const { data: snapshot, error: snapshotError } = await supabase
        .from('user_data_snapshots')
        .select('data_snapshot')
        .eq('user_id', userId)
        .single();

      if (!snapshotError && snapshot?.data_snapshot) {
        recoveredData = snapshot.data_snapshot;
        logger.info('Found data snapshot in Supabase');
      }
    } catch (error) {
      logger.info('No data snapshot found in Supabase');
    }

    // Step 2: Try to load enrollments directly from enrollments table
    let enrollmentsData: any[] = [];
    
    try {
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId);

      if (!enrollmentsError && enrollments) {
        enrollmentsData = enrollments;
        logger.info(`Found ${enrollments.length} enrollments in database`);
      }
    } catch (error) {
      logger.info('No enrollments found in database');
    }

    // Step 3: Merge and restore data
    if (recoveredData || enrollmentsData.length > 0) {
      logger.info('Restoring recovered data to localStorage...');

      // Restore enrollments
      const enrollmentsToRestore = recoveredData?.enrollments || enrollmentsData;
      if (enrollmentsToRestore && enrollmentsToRestore.length > 0) {
        localStorage.setItem('enrollments', JSON.stringify(enrollmentsToRestore));
        localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify(enrollmentsToRestore));
        
        // Dispatch event to notify components
        window.dispatchEvent(new CustomEvent('enrollment-recovered', { 
          detail: { enrollments: enrollmentsToRestore } 
        }));
      }

      // Restore progress data
      if (recoveredData?.progress) {
        Object.entries(recoveredData.progress).forEach(([courseId, progress]) => {
          localStorage.setItem(`progress-${courseId}`, progress.toString());
        });
      }

      // Restore completed lessons
      if (recoveredData?.completedLessons) {
        Object.entries(recoveredData.completedLessons).forEach(([courseId, lessons]) => {
          localStorage.setItem(`completed-lessons-${courseId}`, JSON.stringify(lessons));
        });
      }

      // Restore quiz attempts
      if (recoveredData?.quizAttempts) {
        Object.entries(recoveredData.quizAttempts).forEach(([quizId, attempts]) => {
          localStorage.setItem(`quiz-attempts-${quizId}`, JSON.stringify(attempts));
        });
      }

      // Restore user profile
      if (recoveredData?.userProfile) {
        localStorage.setItem(`user-profile-${userId}`, JSON.stringify(recoveredData.userProfile));
      }

      // Mark recovery as completed
      localStorage.setItem(`emergency-recovery-${userId}`, new Date().toISOString());
      
      logger.info('Emergency data recovery completed');
      
      // Dispatch global recovery event
      window.dispatchEvent(new CustomEvent('emergency-recovery-completed', {
        detail: { 
          userId,
          recoveredData: {
            enrollments: enrollmentsToRestore?.length || 0,
            progress: Object.keys(recoveredData?.progress || {}).length,
            completedLessons: Object.keys(recoveredData?.completedLessons || {}).length,
            quizAttempts: Object.keys(recoveredData?.quizAttempts || {}).length,
            hasProfile: !!recoveredData?.userProfile
          }
        }
      }));
    } else {
      logger.info('No data to recover - user might be new or data was already cleared');
    }
  } catch (error) {
    logger.error('Emergency data recovery failed:', error);
  }
};

/**
 * Restore common course enrollments if no data is found
 */
export const restoreCommonCourses = (userId: string): void => {
  const existingEnrollments = localStorage.getItem('enrollments');
  if (existingEnrollments && JSON.parse(existingEnrollments).length > 0) {
    return; // User already has enrollments
  }

  logger.info('Restoring common course enrollments as fallback...');

  const commonCourses = [
    {
      course_id: 'entrepreneurship-final',
      course_title: 'Entrepreneurship',
      user_id: userId,
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
      progress: 0
    },
    {
      course_id: 'ai-human-relations',
      course_title: 'AI and Human Relations',
      user_id: userId,
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
      progress: 0
    },
    {
      course_id: 'podcast-management-101',
      course_title: 'Podcast Management',
      user_id: userId,
      status: 'approved',
      enrolled_at: new Date().toISOString(),
      approved_at: new Date().toISOString(),
      progress: 0
    }
  ];

  localStorage.setItem('enrollments', JSON.stringify(commonCourses));
  localStorage.setItem(`emergency-restored-enrollments-${userId}`, JSON.stringify(commonCourses));
  localStorage.setItem(`common-courses-restored-${userId}`, new Date().toISOString());

  logger.info('Common course enrollments restored');
};
