import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Download, Upload, Shield, Database, HardDrive } from 'lucide-react';
import { useBulletproofPersistence } from '@/hooks/useBulletproofPersistence';
import { useAuth } from '@/hooks/AuthContext';

/**
 * Bulletproof Data Recovery Component
 * 
 * Provides users with manual data recovery controls:
 * - Force backup all data
 * - Restore from backup
 * - View data status
 * - Emergency recovery options
 */
const BulletproofDataRecovery: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    forceBackupAll, 
    restoreFromBackup, 
    clearAllData, 
    isBackingUp 
  } = useBulletproofPersistence();
  
  const [isRecovering, setIsRecovering] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [dataStatus, setDataStatus] = useState<any>(null);

  const checkDataStatus = () => {
    if (!user) return;

    const status = {
      localStorage: {
        enrollments: !!localStorage.getItem('enrollments'),
        userEnrollments: !!localStorage.getItem(`user-enrollments-${user.id}`),
        userProfile: !!localStorage.getItem(`user-profile-${user.id}`),
        progressEntries: Object.keys(localStorage).filter(key => key.startsWith('progress-')).length,
        completedLessonsEntries: Object.keys(localStorage).filter(key => key.startsWith('completed-lessons-')).length,
        quizAttempts: Object.keys(localStorage).filter(key => key.startsWith('quiz-attempts-')).length
      },
      timestamps: {
        lastRecovery: localStorage.getItem(`emergency-recovery-${user.id}`),
        lastRestore: localStorage.getItem(`data-restored-${user.id}`),
        commonCoursesRestored: localStorage.getItem(`common-courses-restored-${user.id}`)
      }
    };

    setDataStatus(status);
    return status;
  };

  const handleForceBackup = async () => {
    try {
      await forceBackupAll();
      toast({
        title: "✅ Backup Complete",
        description: "All your data has been safely backed up to multiple locations.",
        duration: 5000,
      });
      checkDataStatus();
    } catch (error) {
      toast({
        title: "❌ Backup Failed",
        description: "There was an error backing up your data. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleRestoreFromBackup = async () => {
    setIsRecovering(true);
    try {
      const recoveredData = await restoreFromBackup();
      if (recoveredData) {
        toast({
          title: "✅ Data Restored",
          description: `Successfully restored your data including ${recoveredData.enrollments?.length || 0} enrollments.`,
          duration: 5000,
        });
        
        // Force page reload to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast({
          title: "ℹ️ No Backup Found",
          description: "No backup data was found to restore from.",
          duration: 5000,
        });
      }
      checkDataStatus();
    } catch (error) {
      toast({
        title: "❌ Restore Failed",
        description: "There was an error restoring your data. Please contact support.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsRecovering(false);
    }
  };

  const handleClearAllData = async () => {
    const confirmed = window.confirm(
      "⚠️ WARNING: This will permanently delete ALL your course data, progress, and enrollments. This action cannot be undone. Are you absolutely sure?"
    );
    
    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      "🚨 FINAL WARNING: You are about to delete ALL your data. Type 'DELETE' in the next prompt to confirm."
    );
    
    if (!doubleConfirmed) return;

    const deleteConfirmation = window.prompt(
      "Type 'DELETE' to permanently remove all your data:"
    );

    if (deleteConfirmation !== 'DELETE') {
      toast({
        title: "❌ Action Cancelled",
        description: "Data deletion was cancelled.",
        duration: 3000,
      });
      return;
    }

    setIsClearing(true);
    try {
      await clearAllData();
      toast({
        title: "✅ Data Cleared",
        description: "All your data has been permanently deleted.",
        duration: 5000,
      });
      
      // Force logout and redirect
      setTimeout(() => {
        window.location.href = '/auth';
      }, 2000);
    } catch (error) {
      toast({
        title: "❌ Clear Failed",
        description: "There was an error clearing your data.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsClearing(false);
    }
  };

  React.useEffect(() => {
    checkDataStatus();
  }, [user]);

  if (!user) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-600">Please log in to access data recovery options.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold">🛡️ Bulletproof Data Recovery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Backup Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium">Backup Data</h4>
          </div>
          <p className="text-sm text-gray-600">
            Manually backup all your course data to multiple secure locations.
          </p>
          <Button
            onClick={handleForceBackup}
            disabled={isBackingUp}
            className="w-full"
            variant="outline"
          >
            {isBackingUp ? "Backing up..." : "Force Backup Now"}
          </Button>
        </div>

        {/* Restore Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-green-600" />
            <h4 className="font-medium">Restore Data</h4>
          </div>
          <p className="text-sm text-gray-600">
            Restore your course data from the latest backup if something went wrong.
          </p>
          <Button
            onClick={handleRestoreFromBackup}
            disabled={isRecovering}
            className="w-full"
            variant="outline"
          >
            {isRecovering ? "Restoring..." : "Restore from Backup"}
          </Button>
        </div>

        {/* Clear Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h4 className="font-medium">Clear Data</h4>
          </div>
          <p className="text-sm text-gray-600">
            Permanently delete all your data. This action cannot be undone.
          </p>
          <Button
            onClick={handleClearAllData}
            disabled={isClearing}
            className="w-full"
            variant="destructive"
          >
            {isClearing ? "Clearing..." : "Clear All Data"}
          </Button>
        </div>
      </div>

      {/* Data Status */}
      {dataStatus && (
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-purple-600" />
            <h4 className="font-medium">Current Data Status</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-medium flex items-center gap-1">
                <HardDrive className="h-4 w-4" />
                Local Storage
              </h5>
              <ul className="space-y-1 text-gray-600">
                <li>📚 Enrollments: {dataStatus.localStorage.enrollments ? '✅ Present' : '❌ Missing'}</li>
                <li>👤 User Profile: {dataStatus.localStorage.userProfile ? '✅ Present' : '❌ Missing'}</li>
                <li>📊 Progress Entries: {dataStatus.localStorage.progressEntries}</li>
                <li>✅ Completed Lessons: {dataStatus.localStorage.completedLessonsEntries}</li>
                <li>🧪 Quiz Attempts: {dataStatus.localStorage.quizAttempts}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium">Recovery History</h5>
              <ul className="space-y-1 text-gray-600">
                <li>🚨 Last Recovery: {dataStatus.timestamps.lastRecovery ? new Date(dataStatus.timestamps.lastRecovery).toLocaleString() : 'Never'}</li>
                <li>📥 Last Restore: {dataStatus.timestamps.lastRestore ? new Date(dataStatus.timestamps.lastRestore).toLocaleString() : 'Never'}</li>
                <li>🎯 Common Courses: {dataStatus.timestamps.commonCoursesRestored ? '✅ Restored' : '❌ Not restored'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">🛡️ How Bulletproof Persistence Works</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your data is automatically backed up every 2 minutes</li>
          <li>• Data is stored in multiple locations: Supabase, IndexedDB, and localStorage</li>
          <li>• Recovery happens automatically when you log in</li>
          <li>• All enrollments, progress, and achievements are preserved</li>
          <li>• Even if your browser cache is cleared, your data can be restored</li>
        </ul>
      </div>
    </div>
  );
};

export default BulletproofDataRecovery;
