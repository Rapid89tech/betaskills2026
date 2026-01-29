import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Search, 
  User, 
  FileText, 
  Download,
  RefreshCw,
  Eye
} from 'lucide-react';
import { AuditLoggingService, AuditLogEntry } from '@/services/AuditLoggingService';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

interface AuditLogViewerProps {
  className?: string;
}

export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ className }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all');
  const [targetTypeFilter, setTargetTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const { toast } = useToast();

  // Fetch audit logs
  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const options: {
        startDate: string;
        endDate: string;
        actionType?: string;
        targetType?: 'user' | 'enrollment' | 'system';
        limit: number;
      } = {
        startDate: dateRange.startDate + 'T00:00:00Z',
        endDate: dateRange.endDate + 'T23:59:59Z',
        limit: 100
      };

      if (actionTypeFilter !== 'all') {
        options.actionType = actionTypeFilter;
      }

      if (targetTypeFilter !== 'all') {
        options.targetType = targetTypeFilter as 'user' | 'enrollment' | 'system';
      }

      const logs = await AuditLoggingService.getAuditLogs(options);
      setAuditLogs(logs);

      // Generate summary
      const summaryData = logs.reduce((acc, log) => {
        acc[log.action_type] = (acc[log.action_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      setSummary(summaryData);

      logger.info('Audit logs fetched successfully', { count: logs.length });

    } catch (error: any) {
      logger.error('Error fetching audit logs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch audit logs. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate audit report
  const generateReport = async () => {
    try {
      setLoading(true);
      const report = await AuditLoggingService.generateAuditReport(
        dateRange.startDate + 'T00:00:00Z',
        dateRange.endDate + 'T23:59:59Z'
      );

      // Create downloadable report
      const reportData = {
        generatedAt: new Date().toISOString(),
        dateRange,
        summary: report.summary,
        totalActions: report.totalCount,
        logs: report.logs.map(log => ({
          timestamp: log.timestamp,
          admin_id: log.admin_id,
          action_type: log.action_type,
          target_type: log.target_type,
          target_id: log.target_id,
          details: log.action_details
        }))
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-report-${dateRange.startDate}-to-${dateRange.endDate}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Report Generated',
        description: 'Audit report has been downloaded successfully.'
      });

    } catch (error: any) {
      logger.error('Error generating audit report:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate audit report.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter logs based on search term
  const filteredLogs = auditLogs.filter(log => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      log.action_type.toLowerCase().includes(searchLower) ||
      log.target_type.toLowerCase().includes(searchLower) ||
      log.admin_id.toLowerCase().includes(searchLower) ||
      (log.target_id && log.target_id.toLowerCase().includes(searchLower)) ||
      JSON.stringify(log.action_details).toLowerCase().includes(searchLower)
    );
  });

  // Get action type badge color
  const getActionTypeBadgeColor = (actionType: string) => {
    if (actionType.includes('CREATED')) return 'bg-green-100 text-green-800';
    if (actionType.includes('UPDATED')) return 'bg-blue-100 text-blue-800';
    if (actionType.includes('DELETED')) return 'bg-red-100 text-red-800';
    if (actionType.includes('APPROVED')) return 'bg-green-100 text-green-800';
    if (actionType.includes('REJECTED')) return 'bg-red-100 text-red-800';
    if (actionType.includes('LOGIN')) return 'bg-purple-100 text-purple-800';
    if (actionType.includes('SECURITY')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Get target type icon
  const getTargetTypeIcon = (targetType: string) => {
    switch (targetType) {
      case 'user': return <User className="h-4 w-4" />;
      case 'enrollment': return <FileText className="h-4 w-4" />;
      case 'system': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Load logs on component mount and when filters change
  useEffect(() => {
    fetchAuditLogs();
  }, [dateRange, actionTypeFilter, targetTypeFilter]);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Audit Log Viewer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters and Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Action Type</label>
              <select
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Actions</option>
                <option value="USER_CREATED">User Created</option>
                <option value="USER_UPDATED">User Updated</option>
                <option value="USER_DELETED">User Deleted</option>
                <option value="ENROLLMENT_APPROVED">Enrollment Approved</option>
                <option value="ENROLLMENT_REJECTED">Enrollment Rejected</option>
                <option value="ADMIN_LOGIN">Admin Login</option>
                <option value="PASSWORD_CHANGED">Password Changed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Type</label>
              <select
                value={targetTypeFilter}
                onChange={(e) => setTargetTypeFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Targets</option>
                <option value="user">Users</option>
                <option value="enrollment">Enrollments</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchAuditLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={generateReport} disabled={loading} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Summary Statistics */}
          {Object.keys(summary).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(summary).map(([actionType, count]) => (
                    <div key={actionType} className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{count}</div>
                      <div className="text-sm text-gray-600">{actionType.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Audit Logs Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium">Audit Logs ({filteredLogs.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p>Loading audit logs...</p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <p>No audit logs found for the selected criteria.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getTargetTypeIcon(log.target_type)}
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className={getActionTypeBadgeColor(log.action_type)}>
                                {log.action_type.replace(/_/g, ' ')}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {log.target_type}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Admin: {log.admin_id.substring(0, 8)}...
                              {log.target_id && ` | Target: ${log.target_id.substring(0, 8)}...`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {formatTimestamp(log.timestamp)}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Log Details Modal */}
          {selectedLog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Audit Log Details</h3>
                  <Button variant="ghost" onClick={() => setSelectedLog(null)}>
                    ×
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Action Type</label>
                      <p className="font-medium">{selectedLog.action_type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Target Type</label>
                      <p className="font-medium">{selectedLog.target_type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Admin ID</label>
                      <p className="font-mono text-sm">{selectedLog.admin_id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Timestamp</label>
                      <p className="font-medium">{formatTimestamp(selectedLog.timestamp)}</p>
                    </div>
                  </div>
                  {selectedLog.target_id && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Target ID</label>
                      <p className="font-mono text-sm">{selectedLog.target_id}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Action Details</label>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {JSON.stringify(selectedLog.action_details, null, 2)}
                    </pre>
                  </div>
                  {selectedLog.ip_address && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">IP Address</label>
                      <p className="font-mono text-sm">{selectedLog.ip_address}</p>
                    </div>
                  )}
                  {selectedLog.user_agent && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">User Agent</label>
                      <p className="text-sm break-all">{selectedLog.user_agent}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};