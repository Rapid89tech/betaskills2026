import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Trash2,
  Loader2
} from 'lucide-react';
import { enrollmentRestoreService } from '@/services/enrollmentRestoreService';
import { supabase } from '@/integrations/supabase/client';

const EnrollmentRestoreButton: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    users: 0
  });

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      // Get localStorage stats
      const localStats = enrollmentRestoreService.getLocalStorageStats();
      
      // Get Supabase stats
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*');
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*');

      setStats({
        total: enrollments?.length || 0,
        approved: enrollments?.filter(e => e.status === 'approved').length || 0,
        pending: enrollments?.filter(e => e.status === 'pending').length || 0,
        rejected: enrollments?.filter(e => e.status === 'rejected').length || 0,
        users: profiles?.length || 0
      });

      toast({
        title: "Stats Loaded",
        description: `Found ${localStats.total} enrollments in localStorage, ${enrollments?.length || 0} in database.`,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      toast({
        title: "Error Loading Stats",
        description: "Failed to load enrollment statistics.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      const result = await enrollmentRestoreService.restoreApprovedEnrollments();
      
      if (result.success) {
        toast({
          title: "Enrollments Restored",
          description: result.message,
        });
        loadStats();
      } else {
        toast({
          title: "Restoration Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error restoring enrollments:', error);
      toast({
        title: "Restoration Error",
        description: "An unexpected error occurred during restoration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLocalStorage = () => {
    try {
      enrollmentRestoreService.clearLocalStorageEnrollments();
      toast({
        title: "LocalStorage Cleared",
        description: "All enrollment data has been removed from localStorage.",
      });
      loadStats();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      toast({
        title: "Clear Error",
        description: "Failed to clear localStorage data.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Enrollment Data Restoration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Restore all approved enrollments from localStorage to Supabase database.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Current Database Statistics</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={loadStats}
              disabled={isLoadingStats}
            >
              {isLoadingStats ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Users className="w-4 h-4 mr-2" />
              )}
              Refresh Stats
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-800">Total Enrollments</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-green-800">Approved</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-yellow-800">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-red-800">Rejected</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.users}</div>
              <div className="text-sm text-purple-800">Users</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleRestore}
            disabled={isLoading}
            className="flex-1 min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Restore Approved Enrollments
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={loadStats}
            disabled={isLoadingStats}
          >
            <Users className="w-4 h-4 mr-2" />
            Load Stats
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-600">Danger Zone</h4>
              <p className="text-sm text-muted-foreground">
                Clear localStorage enrollment data
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearLocalStorage}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear LocalStorage
            </Button>
          </div>
        </div>

        {/* Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">What this does:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Finds all approved enrollments in localStorage</li>
                <li>Restores them to the Supabase database</li>
                <li>Creates user profiles for enrolled users</li>
                <li>Preserves all progress and enrollment data</li>
                <li>Course cards automatically update to show correct enrollment status</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentRestoreButton;
