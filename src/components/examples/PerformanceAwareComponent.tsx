import React, { useState, useEffect } from 'react';
import { usePerformanceManager, usePagePerformance, useComponentPerformance } from '../../hooks/usePerformanceManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Clock } from 'lucide-react';

/**
 * Example component demonstrating how to use the PerformanceManager
 * This shows best practices for performance-aware React components
 */

interface PerformanceAwareComponentProps {
  componentName?: string;
}

const PerformanceAwareComponent: React.FC<PerformanceAwareComponentProps> = ({
  componentName = 'PerformanceAwareComponent'
}) => {
  const [heavyData, setHeavyData] = useState<any[]>([]);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);

  // Use performance tracking hooks
  const {
    loadComponent,
    preloadComponent,
    trackInteraction,
    measurePageLoad,
    isLoading,
    performanceSummary
  } = usePerformanceManager({
    trackMount: true,
    trackInteractions: true,
    preloadComponents: ['AdminDashboard', 'CourseVideoLearning'],
    componentName
  });

  // Track page performance
  const { trackInteraction: trackPageInteraction } = usePagePerformance(componentName);

  // Monitor component render performance
  const { renderCount, lastRenderTime } = useComponentPerformance(componentName);

  // Simulate heavy data loading with performance tracking
  const loadHeavyData = async () => {
    trackInteraction('load-heavy-data');
    
    setHeavyData([]);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate some mock data
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 100
    }));
    
    setHeavyData(data);
    trackInteraction('heavy-data-loaded');
  };

  // Load a component dynamically with performance tracking
  const handleLoadComponent = async (componentName: string) => {
    setIsLoadingComponent(true);
    trackInteraction('dynamic-component-load', componentName);
    
    try {
      await loadComponent(componentName);
      console.log(`✅ Successfully loaded component: ${componentName}`);
    } catch (error) {
      console.error(`❌ Failed to load component: ${componentName}`, error);
    } finally {
      setIsLoadingComponent(false);
    }
  };

  // Preload components on hover
  const handlePreloadOnHover = (componentName: string) => {
    trackInteraction('preload-hover', componentName);
    preloadComponent(componentName).catch(console.warn);
  };

  // Track button clicks
  const handleButtonClick = (action: string) => {
    trackInteraction('button-click', action);
    trackPageInteraction('user-action', action);
  };

  // Measure page load on mount
  useEffect(() => {
    measurePageLoad(componentName);
  }, [componentName, measurePageLoad]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Performance Aware Component
          </span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Renders: {renderCount}
            </Badge>
            {lastRenderTime && (
              <Badge variant={lastRenderTime > 16 ? "destructive" : "default"}>
                Last: {lastRenderTime.toFixed(2)}ms
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Component Cache</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {performanceSummary?.componentCache ? 
                  Object.keys(performanceSummary.componentCache).length : 0}
              </div>
              <p className="text-xs text-muted-foreground">Cached components</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Preloaded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {performanceSummary?.preloadedComponents?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Ready components</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Avg Load Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {performanceSummary?.performanceMetrics?.averageDuration?.toFixed(0) || 0}ms
              </div>
              <p className="text-xs text-muted-foreground">Average duration</p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Performance Testing Controls</h3>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => {
                handleButtonClick('load-data');
                loadHeavyData();
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Load Heavy Data ({heavyData.length} items)
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => handleLoadComponent('AdminDashboard')}
              disabled={isLoadingComponent}
            >
              {isLoadingComponent ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Load Admin Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onMouseEnter={() => handlePreloadOnHover('CourseVideoLearning')}
              onClick={() => handleButtonClick('preload-course')}
            >
              Preload Course Component (Hover)
            </Button>
          </div>
        </div>

        {/* Preloaded Components Display */}
        {performanceSummary?.preloadedComponents?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Preloaded Components:</h4>
            <div className="flex flex-wrap gap-1">
              {performanceSummary.preloadedComponents.map((component: string) => (
                <Badge key={component} variant="default">
                  {component}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Component Cache Display */}
        {performanceSummary?.componentCache && Object.keys(performanceSummary.componentCache).length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Component Cache:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(performanceSummary.componentCache).map(([name, info]: [string, any]) => (
                <div key={name} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm font-medium">{name}</span>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {info.loadTime?.toFixed(0)}ms
                    </Badge>
                    {info.isPreloaded && (
                      <Badge variant="default" className="text-xs">
                        Preloaded
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Heavy Data Display */}
        {heavyData.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Heavy Data Sample (First 10 items):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {heavyData.slice(0, 10).map((item) => (
                <div key={item.id} className="p-2 bg-muted rounded text-xs">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">{item.value.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Development Info */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-4 bg-muted rounded">
            <h4 className="font-medium mb-2">Development Info:</h4>
            <div className="text-sm space-y-1">
              <p>• Open browser console and run <code>window.verifyPerformanceManager()</code> to test</p>
              <p>• Performance Manager is available at <code>window.performanceManager</code></p>
              <p>• Component renders: {renderCount}</p>
              {lastRenderTime && (
                <p>• Last render time: {lastRenderTime.toFixed(2)}ms</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceAwareComponent;