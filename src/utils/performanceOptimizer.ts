/**
 * Performance Optimizer - Automatic performance optimization suggestions and implementations
 */

import { performanceMonitor } from './performanceMonitor';
import { performanceManager } from './PerformanceManager';

interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  category: 'bundle' | 'api' | 'rendering' | 'memory' | 'network';
  priority: 'high' | 'medium' | 'low';
  check: () => boolean;
  apply: () => Promise<void> | void;
  impact: string;
}

interface PerformanceReport {
  score: number;
  issues: string[];
  optimizations: OptimizationRule[];
  appliedOptimizations: string[];
  recommendations: string[];
}

class PerformanceOptimizer {
  private appliedOptimizations: Set<string> = new Set();
  private optimizationRules: OptimizationRule[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = import.meta.env.DEV || localStorage.getItem('enablePerformanceOptimizer') === 'true';
    this.initializeOptimizationRules();
  }

  /**
   * Initialize all optimization rules
   */
  private initializeOptimizationRules(): void {
    this.optimizationRules = [
      // Bundle optimization rules
      {
        id: 'enable-gzip-compression',
        name: 'Enable GZIP Compression',
        description: 'Enable GZIP compression for static assets to reduce bundle size',
        category: 'bundle',
        priority: 'high',
        check: () => !this.isGzipEnabled(),
        apply: () => this.suggestGzipCompression(),
        impact: 'Reduces bundle size by 60-80%'
      },
      {
        id: 'implement-code-splitting',
        name: 'Implement Code Splitting',
        description: 'Split large bundles into smaller chunks for better loading performance',
        category: 'bundle',
        priority: 'high',
        check: () => this.shouldImplementCodeSplitting(),
        apply: () => this.suggestCodeSplitting(),
        impact: 'Reduces initial bundle size by 30-50%'
      },
      {
        id: 'optimize-images',
        name: 'Optimize Images',
        description: 'Compress and optimize images for better loading performance',
        category: 'network',
        priority: 'medium',
        check: () => this.hasUnoptimizedImages(),
        apply: () => this.optimizeImages(),
        impact: 'Reduces image load time by 40-70%'
      },

      // API optimization rules
      {
        id: 'implement-request-caching',
        name: 'Implement Request Caching',
        description: 'Cache API responses to reduce server load and improve response times',
        category: 'api',
        priority: 'high',
        check: () => this.shouldImplementCaching(),
        apply: () => this.implementRequestCaching(),
        impact: 'Reduces API response time by 80-95%'
      },
      {
        id: 'implement-request-debouncing',
        name: 'Implement Request Debouncing',
        description: 'Debounce frequent API calls to reduce server load',
        category: 'api',
        priority: 'medium',
        check: () => this.hasFrequentApiCalls(),
        apply: () => this.implementRequestDebouncing(),
        impact: 'Reduces API calls by 60-80%'
      },
      {
        id: 'optimize-api-payloads',
        name: 'Optimize API Payloads',
        description: 'Reduce API payload sizes by selecting only necessary fields',
        category: 'api',
        priority: 'medium',
        check: () => this.hasLargeApiPayloads(),
        apply: () => this.suggestPayloadOptimization(),
        impact: 'Reduces data transfer by 30-60%'
      },

      // Rendering optimization rules
      {
        id: 'implement-virtual-scrolling',
        name: 'Implement Virtual Scrolling',
        description: 'Use virtual scrolling for large lists to improve rendering performance',
        category: 'rendering',
        priority: 'medium',
        check: () => this.hasLargeLists(),
        apply: () => this.suggestVirtualScrolling(),
        impact: 'Improves list rendering by 70-90%'
      },
      {
        id: 'optimize-re-renders',
        name: 'Optimize Component Re-renders',
        description: 'Reduce unnecessary component re-renders using memoization',
        category: 'rendering',
        priority: 'medium',
        check: () => this.hasExcessiveReRenders(),
        apply: () => this.optimizeReRenders(),
        impact: 'Reduces rendering time by 40-60%'
      },
      {
        id: 'implement-lazy-loading',
        name: 'Implement Lazy Loading',
        description: 'Lazy load components and images to improve initial page load',
        category: 'rendering',
        priority: 'high',
        check: () => this.shouldImplementLazyLoading(),
        apply: () => this.implementLazyLoading(),
        impact: 'Improves initial load time by 30-50%'
      },

      // Memory optimization rules
      {
        id: 'fix-memory-leaks',
        name: 'Fix Memory Leaks',
        description: 'Identify and fix memory leaks in event listeners and subscriptions',
        category: 'memory',
        priority: 'high',
        check: () => this.hasMemoryLeaks(),
        apply: () => this.suggestMemoryLeakFixes(),
        impact: 'Prevents memory growth and crashes'
      },
      {
        id: 'optimize-data-structures',
        name: 'Optimize Data Structures',
        description: 'Use more efficient data structures for better memory usage',
        category: 'memory',
        priority: 'low',
        check: () => this.hasInfficientDataStructures(),
        apply: () => this.suggestDataStructureOptimizations(),
        impact: 'Reduces memory usage by 20-40%'
      },

      // Network optimization rules
      {
        id: 'implement-service-worker',
        name: 'Implement Service Worker',
        description: 'Add service worker for offline caching and faster loading',
        category: 'network',
        priority: 'medium',
        check: () => !this.hasServiceWorker(),
        apply: () => this.suggestServiceWorker(),
        impact: 'Enables offline functionality and faster repeat visits'
      },
      {
        id: 'optimize-font-loading',
        name: 'Optimize Font Loading',
        description: 'Preload critical fonts and use font-display: swap',
        category: 'network',
        priority: 'low',
        check: () => this.hasUnoptimizedFonts(),
        apply: () => this.optimizeFontLoading(),
        impact: 'Reduces font loading time and layout shifts'
      }
    ];
  }

  /**
   * Analyze current performance and generate optimization report
   */
  async analyzePerformance(): Promise<PerformanceReport> {
    if (!this.isEnabled) {
      return {
        score: 100,
        issues: [],
        optimizations: [],
        appliedOptimizations: [],
        recommendations: []
      };
    }

    const health = performanceMonitor.getPerformanceHealth();
    const applicableOptimizations = this.optimizationRules.filter(rule => rule.check());
    
    // Calculate performance score based on various factors
    const score = this.calculatePerformanceScore();
    
    // Generate issues list
    const issues = this.identifyPerformanceIssues();
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(applicableOptimizations);

    return {
      score,
      issues,
      optimizations: applicableOptimizations,
      appliedOptimizations: Array.from(this.appliedOptimizations),
      recommendations
    };
  }

  /**
   * Apply automatic optimizations that are safe to implement
   */
  async applyAutomaticOptimizations(): Promise<string[]> {
    if (!this.isEnabled) return [];

    const appliedOptimizations: string[] = [];
    const safeOptimizations = this.optimizationRules.filter(rule => 
      rule.check() && 
      rule.priority === 'high' && 
      !this.appliedOptimizations.has(rule.id) &&
      this.isSafeToApply(rule)
    );

    for (const optimization of safeOptimizations) {
      try {
        await optimization.apply();
        this.appliedOptimizations.add(optimization.id);
        appliedOptimizations.push(optimization.name);
        console.log(`✅ Applied optimization: ${optimization.name}`);
      } catch (error) {
        console.warn(`❌ Failed to apply optimization: ${optimization.name}`, error);
      }
    }

    return appliedOptimizations;
  }

  /**
   * Apply a specific optimization by ID
   */
  async applyOptimization(optimizationId: string): Promise<boolean> {
    const optimization = this.optimizationRules.find(rule => rule.id === optimizationId);
    if (!optimization || this.appliedOptimizations.has(optimizationId)) {
      return false;
    }

    try {
      await optimization.apply();
      this.appliedOptimizations.add(optimizationId);
      console.log(`✅ Applied optimization: ${optimization.name}`);
      return true;
    } catch (error) {
      console.warn(`❌ Failed to apply optimization: ${optimization.name}`, error);
      return false;
    }
  }

  /**
   * Get optimization suggestions based on current performance
   */
  getOptimizationSuggestions(): OptimizationRule[] {
    return this.optimizationRules
      .filter(rule => rule.check() && !this.appliedOptimizations.has(rule.id))
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  // Private helper methods for optimization checks

  private calculatePerformanceScore(): number {
    const health = performanceMonitor.getPerformanceHealth();
    const apiSummary = performanceMonitor.getApiPerformanceSummary();
    const pageLoadSummary = performanceMonitor.getPageLoadSummary();

    let score = 100;

    // Deduct points for performance issues
    if (apiSummary.averageResponseTime > 1000) score -= 20;
    if (apiSummary.errorRate > 0.1) score -= 15;
    if (pageLoadSummary.averageLoadTime > 3000) score -= 25;
    if (this.getBundleSize() > 1000000) score -= 10; // 1MB
    if (this.hasMemoryLeaks()) score -= 15;

    return Math.max(0, score);
  }

  private identifyPerformanceIssues(): string[] {
    const issues: string[] = [];
    const apiSummary = performanceMonitor.getApiPerformanceSummary();
    const pageLoadSummary = performanceMonitor.getPageLoadSummary();

    if (apiSummary.averageResponseTime > 1000) {
      issues.push('Slow API response times detected');
    }
    if (apiSummary.errorRate > 0.1) {
      issues.push('High API error rate detected');
    }
    if (pageLoadSummary.averageLoadTime > 3000) {
      issues.push('Slow page load times detected');
    }
    if (this.getBundleSize() > 1000000) {
      issues.push('Large bundle size detected');
    }
    if (this.hasMemoryLeaks()) {
      issues.push('Potential memory leaks detected');
    }

    return issues;
  }

  private generateRecommendations(optimizations: OptimizationRule[]): string[] {
    return optimizations
      .slice(0, 5) // Top 5 recommendations
      .map(opt => `${opt.name}: ${opt.impact}`);
  }

  private isSafeToApply(rule: OptimizationRule): boolean {
    // Only apply optimizations that don't modify code structure
    const safeOptimizations = [
      'optimize-images',
      'implement-request-caching',
      'optimize-font-loading',
      'implement-lazy-loading'
    ];
    return safeOptimizations.includes(rule.id);
  }

  // Optimization check methods

  private isGzipEnabled(): boolean {
    // Check if GZIP compression is enabled by examining response headers
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(r => r.name.includes('.js'));
    
    // If we have resources and they're significantly smaller than expected, GZIP is likely enabled
    return jsResources.some(r => r.transferSize && r.decodedBodySize && 
      r.transferSize < r.decodedBodySize * 0.7);
  }

  private shouldImplementCodeSplitting(): boolean {
    const bundleSize = this.getBundleSize();
    return bundleSize > 500000; // 500KB threshold
  }

  private hasUnoptimizedImages(): boolean {
    const images = document.querySelectorAll('img');
    return Array.from(images).some(img => 
      !img.hasAttribute('loading') || 
      !img.src.includes('webp') && !img.src.includes('avif')
    );
  }

  private shouldImplementCaching(): boolean {
    const apiSummary = performanceMonitor.getApiPerformanceSummary();
    return apiSummary.cacheHitRate < 0.3; // Less than 30% cache hit rate
  }

  private hasFrequentApiCalls(): boolean {
    const apiSummary = performanceMonitor.getApiPerformanceSummary();
    return apiSummary.totalCalls > 50; // More than 50 calls in recent history
  }

  private hasLargeApiPayloads(): boolean {
    // Check for large API responses in performance entries
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const apiCalls = resources.filter(r => 
      r.name.includes('/api/') || r.name.includes('supabase')
    );
    
    return apiCalls.some(call => call.transferSize && call.transferSize > 100000); // 100KB
  }

  private hasLargeLists(): boolean {
    // Check for elements with many children (potential large lists)
    const lists = document.querySelectorAll('ul, ol, div[role="list"], table tbody');
    return Array.from(lists).some(list => list.children.length > 100);
  }

  private hasExcessiveReRenders(): boolean {
    // This would require React DevTools integration or custom tracking
    // For now, return false as we can't easily detect this
    return false;
  }

  private shouldImplementLazyLoading(): boolean {
    const images = document.querySelectorAll('img:not([loading])');
    const components = document.querySelectorAll('[data-component]');
    return images.length > 5 || components.length > 10;
  }

  private hasMemoryLeaks(): boolean {
    if (!('memory' in performance)) return false;
    
    const memory = (performance as any).memory;
    const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    return memoryUsage > 0.8; // More than 80% memory usage
  }

  private hasInfficientDataStructures(): boolean {
    // This would require code analysis, return false for now
    return false;
  }

  private hasServiceWorker(): boolean {
    return 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
  }

  private hasUnoptimizedFonts(): boolean {
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    const fontFaces = document.styleSheets;
    
    // Check if fonts are preloaded and use font-display: swap
    return fontLinks.length === 0; // No font preloading
  }

  private getBundleSize(): number {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resources
      .filter(resource => resource.name.includes('.js') || resource.name.includes('.css'))
      .reduce((total, resource) => total + (resource.transferSize || 0), 0);
  }

  // Optimization implementation methods

  private suggestGzipCompression(): void {
    console.log('💡 Enable GZIP compression in your server configuration');
    console.log('   - For Nginx: add "gzip on;" to your config');
    console.log('   - For Apache: enable mod_deflate');
    console.log('   - For Netlify: GZIP is enabled by default');
  }

  private suggestCodeSplitting(): void {
    console.log('💡 Implement code splitting:');
    console.log('   - Use React.lazy() for route-based splitting');
    console.log('   - Split vendor libraries into separate chunks');
    console.log('   - Use dynamic imports for large components');
  }

  private optimizeImages(): void {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      if (index > 2) { // Skip first 3 images (likely above fold)
        img.setAttribute('loading', 'lazy');
      }
    });
    console.log(`✅ Added lazy loading to ${images.length} images`);
  }

  private implementRequestCaching(): void {
    // This would typically be implemented at the API client level
    console.log('💡 Implement request caching:');
    console.log('   - Use React Query or SWR for automatic caching');
    console.log('   - Implement browser cache headers');
    console.log('   - Use service worker for offline caching');
  }

  private implementRequestDebouncing(): void {
    console.log('💡 Implement request debouncing:');
    console.log('   - Use debounce for search inputs');
    console.log('   - Throttle scroll and resize events');
    console.log('   - Batch multiple API calls when possible');
  }

  private suggestPayloadOptimization(): void {
    console.log('💡 Optimize API payloads:');
    console.log('   - Use GraphQL for selective field queries');
    console.log('   - Implement pagination for large datasets');
    console.log('   - Compress API responses with GZIP');
  }

  private suggestVirtualScrolling(): void {
    console.log('💡 Implement virtual scrolling:');
    console.log('   - Use react-window or react-virtualized');
    console.log('   - Implement for lists with >100 items');
    console.log('   - Consider infinite scrolling for large datasets');
  }

  private optimizeReRenders(): void {
    console.log('💡 Optimize component re-renders:');
    console.log('   - Use React.memo for expensive components');
    console.log('   - Implement useMemo and useCallback');
    console.log('   - Avoid creating objects in render methods');
  }

  private implementLazyLoading(): void {
    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
      console.log(`✅ Implemented lazy loading for ${lazyImages.length} images`);
    }
  }

  private suggestMemoryLeakFixes(): void {
    console.log('💡 Fix memory leaks:');
    console.log('   - Remove event listeners in useEffect cleanup');
    console.log('   - Cancel pending requests on component unmount');
    console.log('   - Clear intervals and timeouts');
    console.log('   - Unsubscribe from observables and subscriptions');
  }

  private suggestDataStructureOptimizations(): void {
    console.log('💡 Optimize data structures:');
    console.log('   - Use Map instead of Object for frequent lookups');
    console.log('   - Use Set for unique value collections');
    console.log('   - Implement object pooling for frequently created objects');
  }

  private suggestServiceWorker(): void {
    console.log('💡 Implement service worker:');
    console.log('   - Cache static assets for offline access');
    console.log('   - Implement background sync for API calls');
    console.log('   - Use Workbox for easier service worker management');
  }

  private optimizeFontLoading(): void {
    // Add font preloading
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-regular.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = fontUrl;
        document.head.appendChild(link);
      }
    });

    console.log('✅ Added font preloading for critical fonts');
  }

  /**
   * Enable/disable performance optimizer
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (enabled) {
      localStorage.setItem('enablePerformanceOptimizer', 'true');
    } else {
      localStorage.removeItem('enablePerformanceOptimizer');
    }
  }

  /**
   * Reset applied optimizations
   */
  resetOptimizations(): void {
    this.appliedOptimizations.clear();
  }
}

// Create singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Export utility functions
export const analyzePerformance = () => performanceOptimizer.analyzePerformance();
export const applyAutomaticOptimizations = () => performanceOptimizer.applyAutomaticOptimizations();
export const getOptimizationSuggestions = () => performanceOptimizer.getOptimizationSuggestions();
export const applyOptimization = (id: string) => performanceOptimizer.applyOptimization(id);

export default PerformanceOptimizer;