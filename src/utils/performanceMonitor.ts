/**
 * Performance monitoring utility for tracking bundle loading and component performance
 */

interface PerformanceMetric {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    type: 'component' | 'chunk' | 'route' | 'api' | 'page-load' | 'user-interaction';
    metadata?: {
        url?: string;
        method?: string;
        status?: number;
        size?: number;
        cached?: boolean;
        error?: string;
    };
}

interface PageLoadMetrics {
    pageName: string;
    navigationStart: number;
    domContentLoaded: number;
    loadComplete: number;
    firstPaint?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
    firstInputDelay?: number;
    timeToInteractive?: number;
}

interface ApiCallMetrics {
    url: string;
    method: string;
    duration: number;
    status: number;
    size?: number;
    cached: boolean;
    timestamp: number;
    error?: string;
}

interface PerformanceHealth {
    score: number; // 0-100
    issues: string[];
    recommendations: string[];
    trends: {
        pageLoadTrend: 'improving' | 'stable' | 'degrading';
        apiPerformanceTrend: 'improving' | 'stable' | 'degrading';
        errorRateTrend: 'improving' | 'stable' | 'degrading';
    };
}

class PerformanceMonitor {
    private metrics: Map<string, PerformanceMetric> = new Map();
    private pageLoadMetrics: PageLoadMetrics[] = [];
    private apiCallMetrics: ApiCallMetrics[] = [];
    private isEnabled: boolean;
    private performanceObserver?: PerformanceObserver;
    private vitalsObserver?: PerformanceObserver;

    constructor() {
        // Only enable in development or when explicitly enabled
        this.isEnabled = import.meta.env.DEV || localStorage.getItem('enablePerformanceMonitoring') === 'true';
        
        if (this.isEnabled && typeof window !== 'undefined') {
            this.initializeWebVitalsTracking();
            this.initializeApiInterception();
        }
    }

    /**
     * Start measuring performance for a specific operation
     */
    startMeasure(name: string, type: PerformanceMetric['type'] = 'component'): void {
        if (!this.isEnabled) return;

        const startTime = performance.now();
        this.metrics.set(name, {
            name,
            startTime,
            type
        });

        if (type === 'chunk') {
            console.log(`🚀 Loading chunk: ${name}`);
        }
    }

    /**
     * End measuring performance for a specific operation
     */
    endMeasure(name: string): number | null {
        if (!this.isEnabled) return null;

        const metric = this.metrics.get(name);
        if (!metric) {
            console.warn(`Performance metric "${name}" not found`);
            return null;
        }

        const endTime = performance.now();
        const duration = endTime - metric.startTime;

        metric.endTime = endTime;
        metric.duration = duration;

        // Log performance results
        this.logPerformance(metric);

        return duration;
    }

    /**
     * Measure the performance of a function
     */
    async measureAsync<T>(
        name: string,
        fn: () => Promise<T>,
        type: PerformanceMetric['type'] = 'component'
    ): Promise<T> {
        this.startMeasure(name, type);
        try {
            const result = await fn();
            this.endMeasure(name);
            return result;
        } catch (error) {
            this.endMeasure(name);
            throw error;
        }
    }

    /**
     * Measure synchronous function performance
     */
    measure<T>(
        name: string,
        fn: () => T,
        type: PerformanceMetric['type'] = 'component'
    ): T {
        this.startMeasure(name, type);
        try {
            const result = fn();
            this.endMeasure(name);
            return result;
        } catch (error) {
            this.endMeasure(name);
            throw error;
        }
    }

    /**
     * Log performance metric with appropriate styling
     */
    private logPerformance(metric: PerformanceMetric): void {
        if (!metric.duration) return;

        const duration = metric.duration.toFixed(2);
        let emoji = '✅';
        let color = 'color: green';

        // Determine performance level
        if (metric.duration > 1000) {
            emoji = '🐌';
            color = 'color: red';
        } else if (metric.duration > 500) {
            emoji = '⚠️';
            color = 'color: orange';
        } else if (metric.duration > 100) {
            emoji = '⏱️';
            color = 'color: blue';
        }

        console.log(
            `%c${emoji} ${metric.type.toUpperCase()}: ${metric.name} - ${duration}ms`,
            color
        );

        // Warn about slow operations
        if (metric.duration > 1000) {
            console.warn(`Slow ${metric.type} detected: ${metric.name} took ${duration}ms`);
            this.suggestOptimizations(metric);
        }
    }

    /**
     * Suggest optimizations based on performance metrics
     */
    private suggestOptimizations(metric: PerformanceMetric): void {
        const suggestions: string[] = [];

        switch (metric.type) {
            case 'chunk':
                suggestions.push('Consider splitting this chunk further');
                suggestions.push('Check if all imports in this chunk are necessary');
                break;
            case 'component':
                suggestions.push('Consider lazy loading this component');
                suggestions.push('Check for unnecessary re-renders');
                suggestions.push('Optimize component dependencies');
                break;
            case 'route':
                suggestions.push('Implement route-based code splitting');
                suggestions.push('Preload critical route components');
                break;
            case 'api':
                suggestions.push('Implement request caching');
                suggestions.push('Consider request debouncing');
                break;
        }

        console.group(`💡 Optimization suggestions for ${metric.name}:`);
        suggestions.forEach(suggestion => console.log(`• ${suggestion}`));
        console.groupEnd();
    }

    /**
     * Get all recorded metrics
     */
    getMetrics(): PerformanceMetric[] {
        return Array.from(this.metrics.values()).filter(metric => metric.duration !== undefined);
    }

    /**
     * Get performance summary
     */
    getSummary(): {
        totalOperations: number;
        averageDuration: number;
        slowOperations: PerformanceMetric[];
        fastOperations: PerformanceMetric[];
        pageLoadSummary: ReturnType<typeof this.getPageLoadSummary>;
        apiPerformanceSummary: ReturnType<typeof this.getApiPerformanceSummary>;
        performanceHealth: PerformanceHealth;
    } {
        const metrics = this.getMetrics();
        const totalOperations = metrics.length;
        const averageDuration = totalOperations > 0 
            ? metrics.reduce((sum, metric) => sum + (metric.duration || 0), 0) / totalOperations 
            : 0;
        const slowOperations = metrics.filter(metric => (metric.duration || 0) > 500);
        const fastOperations = metrics.filter(metric => (metric.duration || 0) < 100);

        return {
            totalOperations,
            averageDuration,
            slowOperations,
            fastOperations,
            pageLoadSummary: this.getPageLoadSummary(),
            apiPerformanceSummary: this.getApiPerformanceSummary(),
            performanceHealth: this.getPerformanceHealth()
        };
    }

    /**
     * Clear all metrics
     */
    clear(): void {
        this.metrics.clear();
    }

    /**
     * Track page load performance with comprehensive metrics
     */
    trackPageLoad(pageName: string): void {
        if (!this.isEnabled || typeof window === 'undefined') return;

        // Wait for page to fully load before collecting metrics
        if (document.readyState === 'complete') {
            this.collectPageLoadMetrics(pageName);
        } else {
            window.addEventListener('load', () => this.collectPageLoadMetrics(pageName), { once: true });
        }
    }

    /**
     * Track API call performance
     */
    trackApiCall(url: string, method: string, startTime: number, response?: Response, error?: Error): void {
        if (!this.isEnabled) return;

        const duration = performance.now() - startTime;
        const apiMetric: ApiCallMetrics = {
            url,
            method,
            duration,
            status: response?.status || 0,
            size: response?.headers.get('content-length') ? parseInt(response.headers.get('content-length')!) : undefined,
            cached: response?.headers.get('x-cache') === 'HIT' || false,
            timestamp: Date.now(),
            error: error?.message
        };

        this.apiCallMetrics.push(apiMetric);

        // Log slow API calls
        if (duration > 2000) {
            console.warn(`🐌 Slow API call: ${method} ${url} took ${duration.toFixed(2)}ms`);
        }

        // Keep only last 100 API calls to prevent memory issues
        if (this.apiCallMetrics.length > 100) {
            this.apiCallMetrics.shift();
        }
    }

    /**
     * Get performance health assessment
     */
    getPerformanceHealth(): PerformanceHealth {
        const recentPageLoads = this.pageLoadMetrics.slice(-10);
        const recentApiCalls = this.apiCallMetrics.slice(-50);
        
        let score = 100;
        const issues: string[] = [];
        const recommendations: string[] = [];

        // Assess page load performance
        const avgPageLoad = recentPageLoads.reduce((sum, metric) => sum + metric.loadComplete, 0) / recentPageLoads.length;
        if (avgPageLoad > 3000) {
            score -= 20;
            issues.push('Slow page load times');
            recommendations.push('Implement code splitting and lazy loading');
        }

        // Assess API performance
        const avgApiTime = recentApiCalls.reduce((sum, metric) => sum + metric.duration, 0) / recentApiCalls.length;
        if (avgApiTime > 1000) {
            score -= 15;
            issues.push('Slow API response times');
            recommendations.push('Implement request caching and optimize API endpoints');
        }

        // Assess error rates
        const errorRate = recentApiCalls.filter(call => call.error || call.status >= 400).length / recentApiCalls.length;
        if (errorRate > 0.1) {
            score -= 25;
            issues.push('High API error rate');
            recommendations.push('Implement better error handling and retry logic');
        }

        // Assess Core Web Vitals
        const recentLCP = recentPageLoads.map(m => m.largestContentfulPaint).filter(Boolean);
        const avgLCP = recentLCP.reduce((sum, lcp) => sum + lcp!, 0) / recentLCP.length;
        if (avgLCP > 2500) {
            score -= 15;
            issues.push('Poor Largest Contentful Paint');
            recommendations.push('Optimize images and critical rendering path');
        }

        return {
            score: Math.max(0, score),
            issues,
            recommendations,
            trends: this.calculateTrends()
        };
    }

    /**
     * Get API performance summary
     */
    getApiPerformanceSummary(): {
        totalCalls: number;
        averageResponseTime: number;
        errorRate: number;
        slowestCalls: ApiCallMetrics[];
        cacheHitRate: number;
    } {
        const recentCalls = this.apiCallMetrics.slice(-100);
        const totalCalls = recentCalls.length;
        const averageResponseTime = recentCalls.reduce((sum, call) => sum + call.duration, 0) / totalCalls;
        const errorCount = recentCalls.filter(call => call.error || call.status >= 400).length;
        const errorRate = errorCount / totalCalls;
        const slowestCalls = recentCalls
            .filter(call => call.duration > 1000)
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5);
        const cachedCalls = recentCalls.filter(call => call.cached).length;
        const cacheHitRate = cachedCalls / totalCalls;

        return {
            totalCalls,
            averageResponseTime,
            errorRate,
            slowestCalls,
            cacheHitRate
        };
    }

    /**
     * Get page load performance summary
     */
    getPageLoadSummary(): {
        averageLoadTime: number;
        averageFCP: number;
        averageLCP: number;
        slowestPages: PageLoadMetrics[];
    } {
        const recentLoads = this.pageLoadMetrics.slice(-20);
        const averageLoadTime = recentLoads.reduce((sum, load) => sum + load.loadComplete, 0) / recentLoads.length;
        
        const fcpValues = recentLoads.map(l => l.firstContentfulPaint).filter(Boolean) as number[];
        const averageFCP = fcpValues.reduce((sum, fcp) => sum + fcp, 0) / fcpValues.length;
        
        const lcpValues = recentLoads.map(l => l.largestContentfulPaint).filter(Boolean) as number[];
        const averageLCP = lcpValues.reduce((sum, lcp) => sum + lcp, 0) / lcpValues.length;
        
        const slowestPages = recentLoads
            .filter(load => load.loadComplete > 2000)
            .sort((a, b) => b.loadComplete - a.loadComplete)
            .slice(0, 5);

        return {
            averageLoadTime,
            averageFCP,
            averageLCP,
            slowestPages
        };
    }

    /**
     * Initialize Web Vitals tracking
     */
    private initializeWebVitalsTracking(): void {
        if (!('PerformanceObserver' in window)) return;

        // Track Largest Contentful Paint (LCP)
        try {
            this.vitalsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        const lcpEntry = entry as PerformanceEntry;
                        this.updateLatestPageLoadMetric('largestContentfulPaint', lcpEntry.startTime);
                    }
                }
            });
            this.vitalsObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP tracking not supported');
        }

        // Track First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const fidEntry = entry as any;
                    this.updateLatestPageLoadMetric('firstInputDelay', fidEntry.processingStart - fidEntry.startTime);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.warn('FID tracking not supported');
        }

        // Track Cumulative Layout Shift (CLS)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const clsEntry = entry as any;
                    if (!clsEntry.hadRecentInput) {
                        clsValue += clsEntry.value;
                        this.updateLatestPageLoadMetric('cumulativeLayoutShift', clsValue);
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('CLS tracking not supported');
        }
    }

    /**
     * Initialize API call interception for automatic tracking
     */
    private initializeApiInterception(): void {
        // Intercept fetch calls
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const startTime = performance.now();
            const url = typeof args[0] === 'string' ? args[0] : args[0].url;
            const method = args[1]?.method || 'GET';

            try {
                const response = await originalFetch(...args);
                this.trackApiCall(url, method, startTime, response);
                return response;
            } catch (error) {
                this.trackApiCall(url, method, startTime, undefined, error as Error);
                throw error;
            }
        };

        // Intercept XMLHttpRequest
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
            (this as any)._performanceStartTime = performance.now();
            (this as any)._performanceMethod = method;
            (this as any)._performanceUrl = url.toString();
            return originalXHROpen.call(this, method, url, ...args);
        };

        XMLHttpRequest.prototype.send = function(...args: any[]) {
            const xhr = this;
            const startTime = (xhr as any)._performanceStartTime;
            const method = (xhr as any)._performanceMethod;
            const url = (xhr as any)._performanceUrl;

            if (startTime && method && url) {
                xhr.addEventListener('loadend', () => {
                    const mockResponse = {
                        status: xhr.status,
                        headers: {
                            get: (name: string) => xhr.getResponseHeader(name)
                        }
                    } as Response;
                    
                    performanceMonitor.trackApiCall(url, method, startTime, mockResponse);
                });
            }

            return originalXHRSend.call(this, ...args);
        };
    }

    /**
     * Collect comprehensive page load metrics
     */
    private collectPageLoadMetrics(pageName: string): void {
        if (!window.performance) return;

        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (!navigation) return;

        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime;
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime;

        const pageMetrics: PageLoadMetrics = {
            pageName,
            navigationStart: navigation.navigationStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            loadComplete: navigation.loadEventEnd - navigation.navigationStart,
            firstPaint,
            firstContentfulPaint
        };

        this.pageLoadMetrics.push(pageMetrics);

        // Keep only last 50 page loads to prevent memory issues
        if (this.pageLoadMetrics.length > 50) {
            this.pageLoadMetrics.shift();
        }

        console.log(`📊 Page Load Metrics for ${pageName}:`, pageMetrics);
    }

    /**
     * Update the latest page load metric with additional data
     */
    private updateLatestPageLoadMetric(key: keyof PageLoadMetrics, value: number): void {
        if (this.pageLoadMetrics.length > 0) {
            const latest = this.pageLoadMetrics[this.pageLoadMetrics.length - 1];
            (latest as any)[key] = value;
        }
    }

    /**
     * Calculate performance trends
     */
    private calculateTrends(): PerformanceHealth['trends'] {
        const recentPageLoads = this.pageLoadMetrics.slice(-10);
        const olderPageLoads = this.pageLoadMetrics.slice(-20, -10);
        
        const recentApiCalls = this.apiCallMetrics.slice(-25);
        const olderApiCalls = this.apiCallMetrics.slice(-50, -25);

        const pageLoadTrend = this.calculateTrend(
            olderPageLoads.map(p => p.loadComplete),
            recentPageLoads.map(p => p.loadComplete)
        );

        const apiPerformanceTrend = this.calculateTrend(
            olderApiCalls.map(a => a.duration),
            recentApiCalls.map(a => a.duration)
        );

        const olderErrorRate = olderApiCalls.filter(a => a.error || a.status >= 400).length / olderApiCalls.length;
        const recentErrorRate = recentApiCalls.filter(a => a.error || a.status >= 400).length / recentApiCalls.length;
        const errorRateTrend = this.calculateTrend([olderErrorRate], [recentErrorRate]);

        return {
            pageLoadTrend,
            apiPerformanceTrend,
            errorRateTrend
        };
    }

    /**
     * Calculate trend direction from two data sets
     */
    private calculateTrend(older: number[], recent: number[]): 'improving' | 'stable' | 'degrading' {
        if (older.length === 0 || recent.length === 0) return 'stable';

        const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;
        const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
        
        const change = (recentAvg - olderAvg) / olderAvg;
        
        if (change < -0.1) return 'improving';
        if (change > 0.1) return 'degrading';
        return 'stable';
    }

    /**
     * Enable/disable performance monitoring
     */
    setEnabled(enabled: boolean): void {
        this.isEnabled = enabled;
        if (enabled) {
            localStorage.setItem('enablePerformanceMonitoring', 'true');
            if (typeof window !== 'undefined') {
                this.initializeWebVitalsTracking();
                this.initializeApiInterception();
            }
        } else {
            localStorage.removeItem('enablePerformanceMonitoring');
            this.performanceObserver?.disconnect();
            this.vitalsObserver?.disconnect();
        }
    }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export utility functions for easier usage
export const measureChunkLoad = (chunkName: string) =>
    performanceMonitor.startMeasure(chunkName, 'chunk');

export const measureComponentRender = (componentName: string) =>
    performanceMonitor.startMeasure(componentName, 'component');

export const measureRouteLoad = (routeName: string) =>
    performanceMonitor.startMeasure(routeName, 'route');

export const trackPageLoad = (pageName: string) =>
    performanceMonitor.trackPageLoad(pageName);

export const trackApiCall = (url: string, method: string, startTime: number, response?: Response, error?: Error) =>
    performanceMonitor.trackApiCall(url, method, startTime, response, error);

export const getPerformanceHealth = () =>
    performanceMonitor.getPerformanceHealth();

export const getApiPerformanceSummary = () =>
    performanceMonitor.getApiPerformanceSummary();

export const getPageLoadSummary = () =>
    performanceMonitor.getPageLoadSummary();

export const endMeasure = (name: string) =>
    performanceMonitor.endMeasure(name);

// Note: React hook moved to separate hooks file to avoid circular dependencies