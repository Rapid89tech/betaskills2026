import React, { useState, useEffect } from 'react';
import { performanceManager } from '../utils/PerformanceManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Clock, Zap, RefreshCw, Eye, EyeOff, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Globe, Server } from 'lucide-react';

/**
 * Performance monitoring component for development and debugging
 * Shows real-time performance metrics and allows control of performance features
 */

interface PerformanceMonitorProps {
  className?: string;
  showInProduction?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  className = '',
  showInProduction = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceSummary, setPerformanceSummary] = useState<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('health');

  // Only show in development unless explicitly allowed in production
  const shouldShow = import.meta.env.DEV || showInProduction;

  useEffect(() => {
    if (!shouldShow) return;

    // Check if performance manager is enabled
    setIsEnabled(localStorage.getItem('enablePerformanceManager') === 'true');

    // Update performance summary periodically
    const updateSummary = () => {
      setPerformanceSummary(performanceManager.getPerformanceSummary());
    };

    updateSummary();
    const interval = setInterval(updateSummary, 2000);

    return () => clearInterval(interval);
  }, [shouldShow]);

  const togglePerformanceManager = () => {
    const newEnabled = !isEnabled;
    performanceManager.setEnabled(newEnabled);
    setIsEnabled(newEnabled);
  };

  const clearMetrics = () => {
    performanceManager.clearCache();
    setPerformanceSummary(performanceManager.getPerformanceSummary());
  };

  if (!shouldShow) return null;

  return (
    <>
      {/* Toggle button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed bottom-4 right-4 z-50 ${className}`}
        title="Toggle Performance Monitor"
      >
        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <Activity className="h-4 w-4 ml-1" />
      </Button>

      {/* Performance monitor panel */}
      {isVisible && (
        <Card className="fixed bottom-16 right-4 w-96 max-h-96 overflow-auto z-50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Performance Monitor
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant={isEnabled ? "default" : "secondary"}>
                  {isEnabled ? "ON" : "OFF"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePerformanceManager}
                  title="Toggle Performance Manager"
                >
                  <Zap className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearMetrics}
                  title="Clear Metrics"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            {!isEnabled ? (
              <div className="text-center py-4 text-muted-foreground">
                Performance monitoring is disabled.
                <br />
                Click the ⚡ button to enable.
              </div>
            ) : (
              <Tabs defaultValue="metrics" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="cache">Cache</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metrics" className="space-y-2">
                  {performanceSummary?.performanceMetrics && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Operations:</span>
                        <Badge variant="outline">
                          {performanceSummary.performanceMetrics.totalOperations}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Duration:</span>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {performanceSummary.performanceMetrics.averageDuration?.toFixed(2)}ms
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Slow Operations:</span>
                        <Badge variant={performanceSummary.performanceMetrics.slowOperations?.length > 0 ? "destructive" : "default"}>
                          {performanceSummary.performanceMetrics.slowOperations?.length || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Fast Operations:</span>
                        <Badge variant="default">
                          {performanceSummary.performanceMetrics.fastOperations?.length || 0}
                        </Badge>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="components" className="space-y-2">
                  <div className="space-y-1">
                    <div className="font-medium">Preloaded Components:</div>
                    {performanceSummary?.preloadedComponents?.length > 0 ? (
                      performanceSummary.preloadedComponents.map((component: string) => (
                        <Badge key={component} variant="default" className="mr-1 mb-1">
                          {component}
                        </Badge>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No components preloaded</div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="cache" className="space-y-2">
                  <div className="space-y-1">
                    <div className="font-medium">Component Cache:</div>
                    {performanceSummary?.componentCache && Object.keys(performanceSummary.componentCache).length > 0 ? (
                      Object.entries(performanceSummary.componentCache).map(([name, info]: [string, any]) => (
                        <div key={name} className="flex justify-between items-center">
                          <span className="truncate">{name}</span>
                          <div className="flex items-center space-x-1">
                            <Badge variant={info.isPreloaded ? "default" : "secondary"} className="text-xs">
                              {info.loadTime?.toFixed(0)}ms
                            </Badge>
                            {info.isPreloaded && (
                              <Badge variant="outline" className="text-xs">P</Badge>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No components cached</div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PerformanceMonitor;