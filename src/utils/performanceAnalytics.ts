/**
 * Performance Analytics - Collect and analyze performance data over time
 */

import { performanceMonitor } from './performanceMonitor';
import { performanceOptimizer } from './performanceOptimizer';
import { useDataManager } from '@/hooks/useDataManager';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { errorHandler } from './ErrorHandler';

interface PerformanceDataPoint {
    timestamp: number;
    pageLoadTime: number;
    apiResponseTime: number;
    memoryUsage: number;
    performanceScore: number;
    url: string;
    userAgent: string;
    connectionType?: string;
    deviceMemory?: number;
}

interface PerformanceReport {
    period: 'hour' | 'day' | 'week' | 'month';
    startTime: number;
    endTime: number;
    totalSessions: number;
    averagePerformanceScore: number;
    averagePageLoadTime: number;
    averageApiResponseTime: number;
    averageMemoryUsage: number;
    performanceTrends: {
        pageLoadTrend: 'improving' | 'stable' | 'degrading';
        apiPerformanceTrend: 'improving' | 'stable' | 'degrading';
        memoryUsageTrend: 'improving' | 'stable' | 'degrading';
    };
    topIssues: string[];
    appliedOptimizations: string[];
    recommendations: string[];
}

interface DeviceInfo {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connectionType?: string;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
}

class PerformanceAnalytics {
    private dataPoints: PerformanceDataPoint[] = [];
    private maxDataPoints: number = 1000;
    private isEnabled: boolean;
    private reportingInterval: NodeJS.Timeout | null = null;

    constructor() {
        this.isEnabled = import.meta.env.DEV || localStorage.getItem('enablePerformanceAnalytics') === 'true';

        if (this.isEnabled) {
            this.loadStoredData();
            this.startPeriodicReporting();
            this.setupBeforeUnloadHandler();
        }
    }

    /**
     * Collect a performance data point
     */
    collectDataPoint(): void {
        if (!this.isEnabled) return;

        const health = performanceMonitor.getPerformanceHealth();
        const apiSummary = performanceMonitor.getApiPerformanceSummary();
        const pageLoadSummary = performanceMonitor.getPageLoadSummary();
        const deviceInfo = this.getDeviceInfo();

        const dataPoint: PerformanceDataPoint = {
            timestamp: Date.now(),
            pageLoadTime: pageLoadSummary.averageLoadTime || 0,
            apiResponseTime: apiSummary.averageResponseTime || 0,
            memoryUsage: this.getCurrentMemoryUsage(),
            performanceScore: health.score,
            url: window.location.pathname,
            userAgent: navigator.userAgent,
            connectionType: deviceInfo.effectiveType,
            deviceMemory: deviceInfo.deviceMemory
        };

        this.dataPoints.push(dataPoint);

        // Limit the number of stored data points
        if (this.dataPoints.length > this.maxDataPoints) {
            this.dataPoints = this.dataPoints.slice(-this.maxDataPoints);
        }

        // Store data periodically
        this.storeData();
    }

    /**
     * Generate performance report for a specific period
     */
    generateReport(period: 'hour' | 'day' | 'week' | 'month' = 'day'): PerformanceReport {
        const now = Date.now();
        const periodMs = this.getPeriodInMs(period);
        const startTime = now - periodMs;

        const periodData = this.dataPoints.filter(dp => dp.timestamp >= startTime);

        if (periodData.length === 0) {
            return this.getEmptyReport(period, startTime, now);
        }

        const averagePerformanceScore = this.calculateAverage(periodData, 'performanceScore');
        const averagePageLoadTime = this.calculateAverage(periodData, 'pageLoadTime');
        const averageApiResponseTime = this.calculateAverage(periodData, 'apiResponseTime');
        const averageMemoryUsage = this.calculateAverage(periodData, 'memoryUsage');

        const trends = this.calculateTrends(periodData);
        const topIssues = this.identifyTopIssues(periodData);
        const appliedOptimizations = this.getAppliedOptimizations();
        const recommendations = this.generateRecommendations(periodData);

        return {
            period,
            startTime,
            endTime: now,
            totalSessions: periodData.length,
            averagePerformanceScore,
            averagePageLoadTime,
            averageApiResponseTime,
            averageMemoryUsage,
            performanceTrends: trends,
            topIssues,
            appliedOptimizations,
            recommendations
        };
    }

    /**
     * Get performance trends over time
     */
    getPerformanceTrends(days: number = 7): {
        dates: string[];
        performanceScores: number[];
        pageLoadTimes: number[];
        apiResponseTimes: number[];
        memoryUsage: number[];
    } {
        const now = Date.now();
        const startTime = now - (days * 24 * 60 * 60 * 1000);
        const periodData = this.dataPoints.filter(dp => dp.timestamp >= startTime);

        // Group data by day
        const dailyData = this.groupDataByDay(periodData, days);

        return {
            dates: dailyData.map(d => d.date),
            performanceScores: dailyData.map(d => d.averagePerformanceScore),
            pageLoadTimes: dailyData.map(d => d.averagePageLoadTime),
            apiResponseTimes: dailyData.map(d => d.averageApiResponseTime),
            memoryUsage: dailyData.map(d => d.averageMemoryUsage)
        };
    }

    /**
     * Get performance comparison between different time periods
     */
    getPerformanceComparison(currentPeriodDays: number = 7, previousPeriodDays: number = 7): {
        current: PerformanceReport;
        previous: PerformanceReport;
        improvements: string[];
        regressions: string[];
    } {
        const now = Date.now();
        const currentStart = now - (currentPeriodDays * 24 * 60 * 60 * 1000);
        const previousStart = currentStart - (previousPeriodDays * 24 * 60 * 60 * 1000);

        const currentData = this.dataPoints.filter(dp => dp.timestamp >= currentStart);
        const previousData = this.dataPoints.filter(dp =>
            dp.timestamp >= previousStart && dp.timestamp < currentStart
        );

        const currentReport = this.generateReportFromData(currentData, 'week', currentStart, now);
        const previousReport = this.generateReportFromData(previousData, 'week', previousStart, currentStart);

        const improvements: string[] = [];
        const regressions: string[] = [];

        // Compare metrics
        if (currentReport.averagePerformanceScore > previousReport.averagePerformanceScore) {
            improvements.push(`Performance score improved by ${(currentReport.averagePerformanceScore - previousReport.averagePerformanceScore).toFixed(1)} points`);
        } else if (currentReport.averagePerformanceScore < previousReport.averagePerformanceScore) {
            regressions.push(`Performance score decreased by ${(previousReport.averagePerformanceScore - currentReport.averagePerformanceScore).toFixed(1)} points`);
        }

        if (currentReport.averagePageLoadTime < previousReport.averagePageLoadTime) {
            improvements.push(`Page load time improved by ${(previousReport.averagePageLoadTime - currentReport.averagePageLoadTime).toFixed(0)}ms`);
        } else if (currentReport.averagePageLoadTime > previousReport.averagePageLoadTime) {
            regressions.push(`Page load time increased by ${(currentReport.averagePageLoadTime - previousReport.averagePageLoadTime).toFixed(0)}ms`);
        }

        return {
            current: currentReport,
            previous: previousReport,
            improvements,
            regressions
        };
    }

    /**
     * Export performance data for external analysis
     */
    exportData(format: 'json' | 'csv' = 'json'): string {
        if (format === 'csv') {
            return this.exportToCsv();
        }

        return JSON.stringify({
            exportTime: new Date().toISOString(),
            dataPoints: this.dataPoints,
            summary: this.generateReport('month')
        }, null, 2);
    }

    /**
     * Clear all collected data
     */
    clearData(): void {
        this.dataPoints = [];
        localStorage.removeItem('performanceAnalyticsData');
    }

    /**
     * Enable/disable performance analytics
     */
    setEnabled(enabled: boolean): void {
        this.isEnabled = enabled;

        if (enabled) {
            localStorage.setItem('enablePerformanceAnalytics', 'true');
            this.startPeriodicReporting();
        } else {
            localStorage.removeItem('enablePerformanceAnalytics');
            if (this.reportingInterval) {
                clearInterval(this.reportingInterval);
                this.reportingInterval = null;
            }
        }
    }

    // Private helper methods

    private loadStoredData(): void {
        try {
            const storedData = localStorage.getItem('performanceAnalyticsData');
            if (storedData) {
                this.dataPoints = JSON.parse(storedData);
            }
        } catch (error) {
            console.warn('Failed to load stored performance data:', error);
        }
    }

    private storeData(): void {
        try {
            localStorage.setItem('performanceAnalyticsData', JSON.stringify(this.dataPoints));
        } catch (error) {
            console.warn('Failed to store performance data:', error);
        }
    }

    private startPeriodicReporting(): void {
        if (this.reportingInterval) return;

        // Collect data every 30 seconds
        this.reportingInterval = setInterval(() => {
            this.collectDataPoint();
        }, 30000);

        // Collect initial data point
        setTimeout(() => this.collectDataPoint(), 1000);
    }

    private setupBeforeUnloadHandler(): void {
        window.addEventListener('beforeunload', () => {
            this.collectDataPoint();
            this.storeData();
        });
    }

    private getDeviceInfo(): DeviceInfo {
        const info: DeviceInfo = {};

        // Device memory
        if ('deviceMemory' in navigator) {
            info.deviceMemory = (navigator as any).deviceMemory;
        }

        // Hardware concurrency
        if ('hardwareConcurrency' in navigator) {
            info.hardwareConcurrency = navigator.hardwareConcurrency;
        }

        // Network information
        if ('connection' in navigator) {
            const connection = (navigator as any).connection;
            info.connectionType = connection.type;
            info.effectiveType = connection.effectiveType;
            info.downlink = connection.downlink;
            info.rtt = connection.rtt;
        }

        return info;
    }

    private getCurrentMemoryUsage(): number {
        if ('memory' in performance) {
            const memory = (performance as any).memory;
            return memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
        }
        return 0;
    }

    private getPeriodInMs(period: 'hour' | 'day' | 'week' | 'month'): number {
        switch (period) {
            case 'hour': return 60 * 60 * 1000;
            case 'day': return 24 * 60 * 60 * 1000;
            case 'week': return 7 * 24 * 60 * 60 * 1000;
            case 'month': return 30 * 24 * 60 * 60 * 1000;
            default: return 24 * 60 * 60 * 1000;
        }
    }

    private calculateAverage(data: PerformanceDataPoint[], field: keyof PerformanceDataPoint): number {
        if (data.length === 0) return 0;
        const sum = data.reduce((acc, dp) => acc + (dp[field] as number), 0);
        return sum / data.length;
    }

    private calculateTrends(data: PerformanceDataPoint[]): PerformanceReport['performanceTrends'] {
        if (data.length < 2) {
            return {
                pageLoadTrend: 'stable',
                apiPerformanceTrend: 'stable',
                memoryUsageTrend: 'stable'
            };
        }

        const midPoint = Math.floor(data.length / 2);
        const firstHalf = data.slice(0, midPoint);
        const secondHalf = data.slice(midPoint);

        const firstHalfPageLoad = this.calculateAverage(firstHalf, 'pageLoadTime');
        const secondHalfPageLoad = this.calculateAverage(secondHalf, 'pageLoadTime');
        const pageLoadChange = (secondHalfPageLoad - firstHalfPageLoad) / firstHalfPageLoad;

        const firstHalfApiResponse = this.calculateAverage(firstHalf, 'apiResponseTime');
        const secondHalfApiResponse = this.calculateAverage(secondHalf, 'apiResponseTime');
        const apiResponseChange = (secondHalfApiResponse - firstHalfApiResponse) / firstHalfApiResponse;

        const firstHalfMemory = this.calculateAverage(firstHalf, 'memoryUsage');
        const secondHalfMemory = this.calculateAverage(secondHalf, 'memoryUsage');
        const memoryChange = (secondHalfMemory - firstHalfMemory) / firstHalfMemory;

        return {
            pageLoadTrend: this.getTrendDirection(pageLoadChange),
            apiPerformanceTrend: this.getTrendDirection(apiResponseChange),
            memoryUsageTrend: this.getTrendDirection(memoryChange)
        };
    }

    private getTrendDirection(change: number): 'improving' | 'stable' | 'degrading' {
        if (change < -0.1) return 'improving';
        if (change > 0.1) return 'degrading';
        return 'stable';
    }

    private identifyTopIssues(data: PerformanceDataPoint[]): string[] {
        const issues: string[] = [];

        const avgPageLoad = this.calculateAverage(data, 'pageLoadTime');
        const avgApiResponse = this.calculateAverage(data, 'apiResponseTime');
        const avgMemory = this.calculateAverage(data, 'memoryUsage');
        const avgScore = this.calculateAverage(data, 'performanceScore');

        if (avgPageLoad > 3000) issues.push('Slow page load times');
        if (avgApiResponse > 1000) issues.push('Slow API response times');
        if (avgMemory > 100) issues.push('High memory usage');
        if (avgScore < 70) issues.push('Low performance score');

        return issues;
    }

    private getAppliedOptimizations(): string[] {
        // This would track optimizations applied by the performance optimizer
        return [];
    }

    private generateRecommendations(data: PerformanceDataPoint[]): string[] {
        const recommendations: string[] = [];
        const suggestions = performanceOptimizer.getOptimizationSuggestions();

        return suggestions.slice(0, 3).map(s => s.name);
    }

    private groupDataByDay(data: PerformanceDataPoint[], days: number): Array<{
        date: string;
        averagePerformanceScore: number;
        averagePageLoadTime: number;
        averageApiResponseTime: number;
        averageMemoryUsage: number;
    }> {
        const result = [];
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dayStart = new Date(date.setHours(0, 0, 0, 0)).getTime();
            const dayEnd = new Date(date.setHours(23, 59, 59, 999)).getTime();

            const dayData = data.filter(dp => dp.timestamp >= dayStart && dp.timestamp <= dayEnd);

            result.push({
                date: date.toISOString().split('T')[0],
                averagePerformanceScore: this.calculateAverage(dayData, 'performanceScore'),
                averagePageLoadTime: this.calculateAverage(dayData, 'pageLoadTime'),
                averageApiResponseTime: this.calculateAverage(dayData, 'apiResponseTime'),
                averageMemoryUsage: this.calculateAverage(dayData, 'memoryUsage')
            });
        }

        return result;
    }

    private generateReportFromData(
        data: PerformanceDataPoint[],
        period: 'hour' | 'day' | 'week' | 'month',
        startTime: number,
        endTime: number
    ): PerformanceReport {
        if (data.length === 0) {
            return this.getEmptyReport(period, startTime, endTime);
        }

        return {
            period,
            startTime,
            endTime,
            totalSessions: data.length,
            averagePerformanceScore: this.calculateAverage(data, 'performanceScore'),
            averagePageLoadTime: this.calculateAverage(data, 'pageLoadTime'),
            averageApiResponseTime: this.calculateAverage(data, 'apiResponseTime'),
            averageMemoryUsage: this.calculateAverage(data, 'memoryUsage'),
            performanceTrends: this.calculateTrends(data),
            topIssues: this.identifyTopIssues(data),
            appliedOptimizations: this.getAppliedOptimizations(),
            recommendations: this.generateRecommendations(data)
        };
    }

    private getEmptyReport(period: 'hour' | 'day' | 'week' | 'month', startTime: number, endTime: number): PerformanceReport {
        return {
            period,
            startTime,
            endTime,
            totalSessions: 0,
            averagePerformanceScore: 0,
            averagePageLoadTime: 0,
            averageApiResponseTime: 0,
            averageMemoryUsage: 0,
            performanceTrends: {
                pageLoadTrend: 'stable',
                apiPerformanceTrend: 'stable',
                memoryUsageTrend: 'stable'
            },
            topIssues: [],
            appliedOptimizations: [],
            recommendations: []
        };
    }

    private exportToCsv(): string {
        const headers = [
            'timestamp',
            'pageLoadTime',
            'apiResponseTime',
            'memoryUsage',
            'performanceScore',
            'url',
            'connectionType',
            'deviceMemory'
        ];

        const csvRows = [
            headers.join(','),
            ...this.dataPoints.map(dp => [
                new Date(dp.timestamp).toISOString(),
                dp.pageLoadTime,
                dp.apiResponseTime,
                dp.memoryUsage,
                dp.performanceScore,
                `"${dp.url}"`,
                dp.connectionType || '',
                dp.deviceMemory || ''
            ].join(','))
        ];

        return csvRows.join('\n');
    }
}

// Create singleton instance
export const performanceAnalytics = new PerformanceAnalytics();

// Export utility functions
export const collectPerformanceData = () => performanceAnalytics.collectDataPoint();
export const generatePerformanceReport = (period?: 'hour' | 'day' | 'week' | 'month') =>
    performanceAnalytics.generateReport(period);
export const getPerformanceTrends = (days?: number) => performanceAnalytics.getPerformanceTrends(days);
export const exportPerformanceData = (format?: 'json' | 'csv') => performanceAnalytics.exportData(format);

export default PerformanceAnalytics;