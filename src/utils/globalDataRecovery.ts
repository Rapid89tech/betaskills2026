// 🌐 GLOBAL DATA RECOVERY SYSTEM
// This system runs on app startup to detect and recover data loss immediately

import { DataRecovery } from './dataRecovery';
import { supabase } from '@/integrations/supabase/client';

export class GlobalDataRecovery {
  private static instance: GlobalDataRecovery;
  private hasRun = false;

  public static getInstance(): GlobalDataRecovery {
    if (!GlobalDataRecovery.instance) {
      GlobalDataRecovery.instance = new GlobalDataRecovery();
    }
    return GlobalDataRecovery.instance;
  }

  /**
   * Run global data recovery check on app startup
   */
  public async runGlobalRecovery(): Promise<void> {
    if (this.hasRun) {
      console.log('🔄 Global recovery already ran, skipping...');
      return;
    }

    this.hasRun = true;
    console.log('🌐 Running global data recovery check...');

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        console.log('👤 User is logged in, checking for data loss...');
        const dataRecovery = DataRecovery.getInstance();
        const wasRecovered = await dataRecovery.checkAndRecoverData(session.user.id, session.user.email);
        
        if (wasRecovered) {
          console.log('✅ Global recovery: Data was recovered successfully');
          // Trigger a page reload to ensure all components get the recovered data
          setTimeout(() => {
            console.log('🔄 Reloading page to apply recovered data...');
            window.location.reload();
          }, 1000);
        } else {
          console.log('ℹ️ Global recovery: No data recovery needed');
        }
      } else {
        console.log('👤 No user logged in, skipping global recovery');
      }
    } catch (error) {
      console.error('❌ Error during global recovery:', error);
    }
  }

  /**
   * Check for data loss and attempt recovery for a specific user
   */
  public async checkUserData(userId: string, email: string): Promise<boolean> {
    console.log(`🔍 Checking data for user: ${email}`);
    
    try {
      const dataRecovery = DataRecovery.getInstance();
      const wasRecovered = await dataRecovery.checkAndRecoverData(userId, email);
      
      if (wasRecovered) {
        console.log('✅ User data was recovered successfully');
        return true;
      } else {
        console.log('ℹ️ No user data recovery needed');
        return false;
      }
    } catch (error) {
      console.error('❌ Error checking user data:', error);
      return false;
    }
  }

  /**
   * Force a data recovery attempt
   */
  public async forceRecovery(email: string): Promise<boolean> {
    console.log(`🔄 Forcing data recovery for: ${email}`);
    
    try {
      const dataRecovery = DataRecovery.getInstance();
      const recoveredData = await dataRecovery.attemptRecovery(email);
      
      if (recoveredData) {
        await dataRecovery.restoreData(recoveredData);
        console.log('✅ Force recovery successful');
        return true;
      } else {
        console.log('❌ Force recovery failed - no data found');
        return false;
      }
    } catch (error) {
      console.error('❌ Error during force recovery:', error);
      return false;
    }
  }
}

// Auto-run global recovery when this module is imported
const globalRecovery = GlobalDataRecovery.getInstance();

// Run recovery after a short delay to ensure the app is fully loaded
setTimeout(() => {
  globalRecovery.runGlobalRecovery();
}, 2000);

export default globalRecovery;
