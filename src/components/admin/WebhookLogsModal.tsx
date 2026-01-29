import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  Download,
  Trash2,
  Eye
} from 'lucide-react';

interface WebhookLog {
  id: string;
  timestamp: string;
  type: string;
  action: string;
  invoice_id: string;
  user_id: string;
  payload: any;
  status: 'pending' | 'success' | 'failed';
  processing_time_ms: number;
  error?: string;
  user_agent: string;
  session_id: string;
}

interface WebhookLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WebhookLogsModal = ({ isOpen, onClose }: WebhookLogsModalProps) => {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [filter, setFilter] = useState<'all' | 'success' | 'failed' | 'pending'>('all');

  useEffect(() => {
    if (isOpen) {
      loadLogs();
    }
  }, [isOpen]);

  const loadLogs = () => {
    const storedLogs = JSON.parse(localStorage.getItem('webhook_logs') || '[]');
    setLogs(storedLogs);
  };

  const clearLogs = () => {
    localStorage.removeItem('webhook_logs');
    setLogs([]);
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `webhook-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'default',
      failed: 'destructive',
      pending: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Webhook Logs
            </DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadLogs}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['all', 'success', 'failed', 'pending'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status as any)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <Badge variant="secondary" className="ml-2">
                  {status === 'all' ? logs.length : logs.filter(log => log.status === status).length}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Logs List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No webhook logs found
              </div>
            ) : (
              filteredLogs.map((log) => (
                <Card key={log.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(log.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{log.action}</span>
                            {getStatusBadge(log.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatTime(log.timestamp)} • {log.processing_time_ms}ms
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Invoice: {log.invoice_id?.slice(-8)}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {log.error && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        Error: {log.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Log Detail Modal */}
        {selectedLog && (
          <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Webhook Log Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedLog.status)}
                      {getStatusBadge(selectedLog.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Processing Time</label>
                    <p className="text-sm mt-1">{selectedLog.processing_time_ms}ms</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timestamp</label>
                    <p className="text-sm mt-1">{formatTime(selectedLog.timestamp)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Action</label>
                    <p className="text-sm mt-1">{selectedLog.action}</p>
                  </div>
                </div>
                
                {selectedLog.error && (
                  <div>
                    <label className="text-sm font-medium text-red-600">Error</label>
                    <pre className="text-sm mt-1 bg-red-50 p-2 rounded overflow-x-auto">
                      {selectedLog.error}
                    </pre>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium">Payload</label>
                  <pre className="text-sm mt-1 bg-muted p-4 rounded overflow-x-auto">
                    {JSON.stringify(selectedLog.payload, null, 2)}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WebhookLogsModal;