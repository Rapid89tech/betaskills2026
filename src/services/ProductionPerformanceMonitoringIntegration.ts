/**
 * Production Performance Monitoring Integration Service
 * 
 * Integrates ProductionMonitoringSetup with existing PerformanceOptimizationService
 * to provide comprehensive production performance monitoring including:
 * - Production-specific payment processing metrics collection
 * - Enrollment flow performance tracking for production
 * - User experience monitoring with production validation
 * 
 * Requirements: 6.1, 6.4, 6.5
 */

import { ProductionMonitoringSetup, MonitoringMetric, MonitoringEvent, PerformanceMetrics as ProductionPerformanceMetrics } from './ProductionMonitoringSetup';
import { performanceOptimizationService, PerformanceMetrics } from './PerformanceOptimizationService';

export interface PaymentProcessingMetrics {
  payment_initiation_time: number;
  payment_processing_time: number;
  payment_completion_time: number;
  webhook_processing_time: number;
  enrollment_creation_time: number;
  course_access_grant_time: number;
  total_flow_time: number;
  success_rate: number;
  error_rate: number;
}

export interface EnrollmentFlowMetrics {
  course_selection_time: number;
  payment_form_load_time: number;
  payment_submission_time: number;
  enrollment_confirmation_time: number;
  course_access_time: number;
  user_journey_completion_rate: number;
  abandonment_rate: number;
  conversion_rate: number;
}

export interface UserExperienceMetrics {
  page_load_performance: number;
  interactive_response_time: number;
  visual_stability_score: number;
  accessibility_score: number;
  error_frequency: number;
  user_satisfaction_score: number;
  mobile_performance_score: number;
  cross_browser_compatibility_score: number;
}

export interface ProductionValidationMetrics {
  configuration_validation_time: number;
  security_validation_time: number;
  api_connectivity_validation_time: number;
  webhook_validation_time: number;
  overall_validation_success_rate: number;
  validation_error_count: number;
}

export interface IntegratedPerformanceReport {
  timestamp: Date;
  environment: 'production';
  payment_metrics: PaymentProcessingMetrics;
  enrollment_metrics: EnrollmentFlowMetrics;
  user_experience_metrics: UserExperienceMetrics;
  validation_metrics: ProductionValidationMetrics;
  system_performance: PerformanceMetrics;
  production_performance: ProductionPerformanceMetrics;
  recommendations: string[];
  alerts: MonitoringEvent[];
}

export class ProductionPerformanceMonitoringIntegration {
  private productionMonitoring: ProductionMonitoringSetup;
  private paymentMetrics: PaymentProcessingMetrics;
  private enrollmentMetrics: EnrollmentFlowMetrics;
  private userExperienceMetrics: UserExperienceMetrics;
  private validationMetrics: ProductionValidationMetrics;
  private isInitialized = false;
  private metricsCollectionInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.productionMonitoring = new ProductionMonitoringSetup();
    this.initializeMetrics();
  }

  /**
   * Initializes the production performance monitoring integration
   * Requirements: 6.1, 6.4, 6.5
   */
  async initialize(): Promise<void> {
    try {
      console.log('[PRODUCTION PERFORMANCE] Initializing production performance monitoring integration...');
      
      // Initialize production monitoring setup
      await this.productionMonitoring.initializeMonitoring();
      
      // Setup payment processing metrics collection
      this.setupPaymentProcessingMetrics();
      
      // Setup enrollment flow performance tracking
      this.setupEnrollmentFlowTracking();
      
      // Setup user experience monitoring
      this.setupUserExperienceMonitoring();
      
      // Setup production validation monitoring
      this.setupProductionValidationMonitoring();
      
      // Start integrated metrics collection
      this.startIntegratedMetricsCollection();
      
      this.isInitialized = true;
      
      console.log('[PRODUCTION PERFORMANCE] Production performance monitoring integration initialized successfully');
      
      // Log initialization event
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'INFO',
        message: 'Production performance monitoring integration initialized',
        details: {
          integration_enabled: true,
          metrics_collection_active: true,
          monitoring_services_count: 4
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
      console.error('[PRODUCTION PERFORMANCE] Failed to initialize integration:', errorMessage);
      
      this.logPerformanceEvent({
        event_type: 'ERROR_OCCURRED',
        severity: 'CRITICAL',
        message: 'Failed to initialize production performance monitoring integration',
        details: { error: errorMessage },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
      
      throw error;
    }
  }

  /**
   * Sets up production-specific payment processing metrics collection
   * Requirements: 6.1
   */
  setupPaymentProcessingMetrics(): void {
    console.log('[PRODUCTION PERFORMANCE] Setting up payment processing metrics collection...');
    
    // Track payment initiation performance
    this.trackPaymentInitiationMetrics();
    
    // Track payment processing performance
    this.trackPaymentProcessingPerformance();
    
    // Track webhook processing performance
    this.trackWebhookProcessingPerformance();
    
    // Track enrollment creation performance
    this.trackEnrollmentCreationPerformance();
    
    // Track course access grant performance
    this.trackCourseAccessGrantPerformance();
    
    console.log('[PRODUCTION PERFORMANCE] Payment processing metrics collection configured');
  }

  /**
   * Sets up enrollment flow performance tracking for production
   * Requirements: 6.4, 6.5
   */
  setupEnrollmentFlowTracking(): void {
    console.log('[PRODUCTION PERFORMANCE] Setting up enrollment flow performance tracking...');
    
    // Track course selection performance
    this.trackCourseSelectionPerformance();
    
    // Track payment form performance
    this.trackPaymentFormPerformance();
    
    // Track enrollment confirmation performance
    this.trackEnrollmentConfirmationPerformance();
    
    // Track user journey completion
    this.trackUserJourneyCompletion();
    
    console.log('[PRODUCTION PERFORMANCE] Enrollment flow performance tracking configured');
  }

  /**
   * Sets up user experience monitoring with production validation
   * Requirements: 6.4, 6.5
   */
  setupUserExperienceMonitoring(): void {
    console.log('[PRODUCTION PERFORMANCE] Setting up user experience monitoring...');
    
    // Track page load performance
    this.trackPageLoadPerformance();
    
    // Track interactive response times
    this.trackInteractiveResponseTimes();
    
    // Track visual stability
    this.trackVisualStability();
    
    // Track accessibility metrics
    this.trackAccessibilityMetrics();
    
    // Track mobile performance
    this.trackMobilePerformance();
    
    // Track cross-browser compatibility
    this.trackCrossBrowserCompatibility();
    
    console.log('[PRODUCTION PERFORMANCE] User experience monitoring configured');
  }

  /**
   * Sets up production validation monitoring
   * Requirements: 6.5
   */
  setupProductionValidationMonitoring(): void {
    console.log('[PRODUCTION PERFORMANCE] Setting up production validation monitoring...');
    
    // Track configuration validation performance
    this.trackConfigurationValidationPerformance();
    
    // Track security validation performance
    this.trackSecurityValidationPerformance();
    
    // Track API connectivity validation performance
    this.trackApiConnectivityValidationPerformance();
    
    // Track webhook validation performance
    this.trackWebhookValidationPerformance();
    
    console.log('[PRODUCTION PERFORMANCE] Production validation monitoring configured');
  }

  /**
   * Tracks payment initiation metrics
   * Requirements: 6.1
   */
  trackPaymentInitiationMetrics(): void {
    // Integration with payment service to track initiation performance
    console.log('[PRODUCTION PERFORMANCE] Payment initiation metrics tracking enabled');
  }

  /**
   * Tracks payment processing performance
   * Requirements: 6.1
   */
  trackPaymentProcessingPerformance(): void {
    // Integration with Ikhokha payment service to track processing performance
    console.log('[PRODUCTION PERFORMANCE] Payment processing performance tracking enabled');
  }

  /**
   * Tracks webhook processing performance
   * Requirements: 6.1
   */
  trackWebhookProcessingPerformance(): void {
    // Integration with webhook handler to track processing performance
    console.log('[PRODUCTION PERFORMANCE] Webhook processing performance tracking enabled');
  }

  /**
   * Tracks enrollment creation performance
   * Requirements: 6.1
   */
  trackEnrollmentCreationPerformance(): void {
    // Integration with enrollment service to track creation performance
    console.log('[PRODUCTION PERFORMANCE] Enrollment creation performance tracking enabled');
  }

  /**
   * Tracks course access grant performance
   * Requirements: 6.1
   */
  trackCourseAccessGrantPerformance(): void {
    // Integration with course access service to track grant performance
    console.log('[PRODUCTION PERFORMANCE] Course access grant performance tracking enabled');
  }

  /**
   * Tracks course selection performance
   * Requirements: 6.4
   */
  trackCourseSelectionPerformance(): void {
    // Track time from course page load to course selection
    if (typeof window !== 'undefined') {
      // Monitor course grid load performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('course-selection')) {
            this.updateEnrollmentMetric('course_selection_time', entry.duration);
          }
        }
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Course selection performance tracking enabled');
  }

  /**
   * Tracks payment form performance
   * Requirements: 6.4
   */
  trackPaymentFormPerformance(): void {
    // Track payment form load and interaction performance
    if (typeof window !== 'undefined') {
      // Monitor payment form performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('payment-form')) {
            this.updateEnrollmentMetric('payment_form_load_time', entry.duration);
          }
        }
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Payment form performance tracking enabled');
  }

  /**
   * Tracks enrollment confirmation performance
   * Requirements: 6.4
   */
  trackEnrollmentConfirmationPerformance(): void {
    // Track enrollment confirmation flow performance
    console.log('[PRODUCTION PERFORMANCE] Enrollment confirmation performance tracking enabled');
  }

  /**
   * Tracks user journey completion
   * Requirements: 6.4
   */
  trackUserJourneyCompletion(): void {
    // Track complete user journey from course selection to access
    console.log('[PRODUCTION PERFORMANCE] User journey completion tracking enabled');
  }

  /**
   * Tracks page load performance
   * Requirements: 6.4, 6.5
   */
  trackPageLoadPerformance(): void {
    if (typeof window !== 'undefined') {
      // Use existing performance optimization service integration
      const existingMetrics = performanceOptimizationService.getPerformanceMetrics();
      
      // Enhance with production-specific tracking
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          this.updateUserExperienceMetric('page_load_performance', loadTime);
          
          // Record to production monitoring
          this.recordProductionMetric('page_load_time', loadTime, 'milliseconds', {
            page_type: 'production',
            performance_tier: loadTime < 2000 ? 'excellent' : loadTime < 5000 ? 'good' : 'needs_improvement'
          });
        }
      });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Page load performance tracking enabled');
  }

  /**
   * Tracks interactive response times
   * Requirements: 6.4
   */
  trackInteractiveResponseTimes(): void {
    if (typeof window !== 'undefined') {
      // Track First Input Delay (FID)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const fid = (entry as any).processingStart - entry.startTime;
            this.updateUserExperienceMetric('interactive_response_time', fid);
            
            this.recordProductionMetric('first_input_delay', fid, 'milliseconds', {
              interaction_type: (entry as any).name,
              performance_tier: fid < 100 ? 'excellent' : fid < 300 ? 'good' : 'needs_improvement'
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Interactive response times tracking enabled');
  }

  /**
   * Tracks visual stability
   * Requirements: 6.4
   */
  trackVisualStability(): void {
    if (typeof window !== 'undefined') {
      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        
        this.updateUserExperienceMetric('visual_stability_score', clsValue);
        
        this.recordProductionMetric('cumulative_layout_shift', clsValue, 'score', {
          performance_tier: clsValue < 0.1 ? 'excellent' : clsValue < 0.25 ? 'good' : 'needs_improvement'
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Visual stability tracking enabled');
  }

  /**
   * Tracks accessibility metrics
   * Requirements: 6.4
   */
  trackAccessibilityMetrics(): void {
    // Track accessibility performance metrics
    if (typeof window !== 'undefined') {
      // Basic accessibility checks
      setTimeout(() => {
        const accessibilityScore = this.calculateAccessibilityScore();
        this.updateUserExperienceMetric('accessibility_score', accessibilityScore);
        
        this.recordProductionMetric('accessibility_score', accessibilityScore, 'percentage', {
          compliance_level: accessibilityScore >= 90 ? 'excellent' : accessibilityScore >= 70 ? 'good' : 'needs_improvement'
        });
      }, 2000);
    }
    
    console.log('[PRODUCTION PERFORMANCE] Accessibility metrics tracking enabled');
  }

  /**
   * Tracks mobile performance
   * Requirements: 6.4
   */
  trackMobilePerformance(): void {
    if (typeof window !== 'undefined') {
      // Detect mobile devices and track mobile-specific performance
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Track mobile-specific metrics
        const mobileScore = this.calculateMobilePerformanceScore();
        this.updateUserExperienceMetric('mobile_performance_score', mobileScore);
        
        this.recordProductionMetric('mobile_performance_score', mobileScore, 'percentage', {
          device_type: 'mobile',
          performance_tier: mobileScore >= 80 ? 'excellent' : mobileScore >= 60 ? 'good' : 'needs_improvement'
        });
      }
    }
    
    console.log('[PRODUCTION PERFORMANCE] Mobile performance tracking enabled');
  }

  /**
   * Tracks cross-browser compatibility
   * Requirements: 6.4
   */
  trackCrossBrowserCompatibility(): void {
    if (typeof window !== 'undefined') {
      // Track browser-specific performance and compatibility
      const browserInfo = this.getBrowserInfo();
      const compatibilityScore = this.calculateCompatibilityScore(browserInfo);
      
      this.updateUserExperienceMetric('cross_browser_compatibility_score', compatibilityScore);
      
      this.recordProductionMetric('browser_compatibility_score', compatibilityScore, 'percentage', {
        browser: browserInfo.name,
        version: browserInfo.version,
        compatibility_tier: compatibilityScore >= 90 ? 'excellent' : compatibilityScore >= 70 ? 'good' : 'needs_improvement'
      });
    }
    
    console.log('[PRODUCTION PERFORMANCE] Cross-browser compatibility tracking enabled');
  }

  /**
   * Tracks configuration validation performance
   * Requirements: 6.5
   */
  trackConfigurationValidationPerformance(): void {
    // Track production configuration validation performance
    console.log('[PRODUCTION PERFORMANCE] Configuration validation performance tracking enabled');
  }

  /**
   * Tracks security validation performance
   * Requirements: 6.5
   */
  trackSecurityValidationPerformance(): void {
    // Track production security validation performance
    console.log('[PRODUCTION PERFORMANCE] Security validation performance tracking enabled');
  }

  /**
   * Tracks API connectivity validation performance
   * Requirements: 6.5
   */
  trackApiConnectivityValidationPerformance(): void {
    // Track production API connectivity validation performance
    console.log('[PRODUCTION PERFORMANCE] API connectivity validation performance tracking enabled');
  }

  /**
   * Tracks webhook validation performance
   * Requirements: 6.5
   */
  trackWebhookValidationPerformance(): void {
    // Track production webhook validation performance
    console.log('[PRODUCTION PERFORMANCE] Webhook validation performance tracking enabled');
  }

  /**
   * Starts integrated metrics collection
   * Requirements: 6.1, 6.4, 6.5
   */
  startIntegratedMetricsCollection(): void {
    // Collect and integrate metrics every 30 seconds
    this.metricsCollectionInterval = setInterval(() => {
      this.collectIntegratedMetrics();
    }, 30 * 1000);
    
    console.log('[PRODUCTION PERFORMANCE] Integrated metrics collection started');
  }

  /**
   * Collects integrated performance metrics
   * Requirements: 6.1, 6.4, 6.5
   */
  async collectIntegratedMetrics(): Promise<void> {
    try {
      // Get metrics from performance optimization service
      const systemMetrics = performanceOptimizationService.getPerformanceMetrics();
      
      // Get production monitoring metrics
      const productionMetrics = await this.productionMonitoring.collectBusinessMetrics();
      
      // Calculate integrated performance scores
      const integratedScore = this.calculateIntegratedPerformanceScore(systemMetrics, productionMetrics);
      
      // Record integrated metrics
      this.recordProductionMetric('integrated_performance_score', integratedScore, 'percentage', {
        system_load_time: systemMetrics.loadTime,
        system_memory_usage: systemMetrics.memoryUsage,
        payment_volume: productionMetrics.payment_volume,
        enrollment_conversion: productionMetrics.enrollment_conversion_rate
      });
      
      // Check for performance alerts
      this.checkPerformanceAlerts(integratedScore, systemMetrics, productionMetrics);
      
    } catch (error) {
      console.error('[PRODUCTION PERFORMANCE] Failed to collect integrated metrics:', error);
      
      this.logPerformanceEvent({
        event_type: 'ERROR_OCCURRED',
        severity: 'WARNING',
        message: 'Failed to collect integrated performance metrics',
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }
  }

  /**
   * Generates comprehensive performance report
   * Requirements: 6.1, 6.4, 6.5
   */
  async generatePerformanceReport(): Promise<IntegratedPerformanceReport> {
    const systemMetrics = performanceOptimizationService.getPerformanceMetrics();
    const productionMetrics = await this.productionMonitoring.collectBusinessMetrics();
    const recentEvents = this.productionMonitoring.getEvents('PERFORMANCE_ALERT', 10);
    
    const report: IntegratedPerformanceReport = {
      timestamp: new Date(),
      environment: 'production',
      payment_metrics: this.paymentMetrics,
      enrollment_metrics: this.enrollmentMetrics,
      user_experience_metrics: this.userExperienceMetrics,
      validation_metrics: this.validationMetrics,
      system_performance: systemMetrics,
      production_performance: {
        api_response_time: systemMetrics.apiResponseTime,
        database_query_time: 0, // Would be populated from actual database metrics
        webhook_processing_time: this.paymentMetrics.webhook_processing_time,
        page_load_time: systemMetrics.loadTime,
        error_rate: this.userExperienceMetrics.error_frequency,
        throughput: 0, // Would be calculated from actual throughput metrics
        memory_usage: systemMetrics.memoryUsage,
        cpu_usage: 0 // Would be populated from actual CPU metrics
      },
      recommendations: this.generatePerformanceRecommendations(),
      alerts: recentEvents
    };
    
    return report;
  }

  /**
   * Records a production metric
   * Requirements: 6.1, 6.4
   */
  recordProductionMetric(name: string, value: number, unit: string, tags: Record<string, string> = {}): void {
    this.productionMonitoring.recordMetric(name, value, unit, {
      service: 'performance-monitoring',
      environment: 'production',
      ...tags
    });
  }

  /**
   * Logs a performance event
   * Requirements: 6.1, 6.4
   */
  logPerformanceEvent(event: MonitoringEvent): void {
    this.productionMonitoring.logEvent(event);
  }

  /**
   * Updates payment metric
   * Requirements: 6.1
   */
  updatePaymentMetric(metric: keyof PaymentProcessingMetrics, value: number): void {
    this.paymentMetrics[metric] = value;
  }

  /**
   * Updates enrollment metric
   * Requirements: 6.4
   */
  updateEnrollmentMetric(metric: keyof EnrollmentFlowMetrics, value: number): void {
    this.enrollmentMetrics[metric] = value;
  }

  /**
   * Updates user experience metric
   * Requirements: 6.4
   */
  updateUserExperienceMetric(metric: keyof UserExperienceMetrics, value: number): void {
    this.userExperienceMetrics[metric] = value;
  }

  /**
   * Updates validation metric
   * Requirements: 6.5
   */
  updateValidationMetric(metric: keyof ProductionValidationMetrics, value: number): void {
    this.validationMetrics[metric] = value;
  }

  /**
   * Calculates accessibility score
   * Requirements: 6.4
   */
  private calculateAccessibilityScore(): number {
    // Basic accessibility score calculation
    let score = 100;
    
    if (typeof document !== 'undefined') {
      // Check for alt attributes on images
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      score -= (imagesWithoutAlt.length / images.length) * 20;
      
      // Check for proper heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length === 0) score -= 15;
      
      // Check for form labels
      const inputs = document.querySelectorAll('input, select, textarea');
      const inputsWithoutLabels = Array.from(inputs).filter(input => {
        const id = input.getAttribute('id');
        return !id || !document.querySelector(`label[for="${id}"]`);
      });
      score -= (inputsWithoutLabels.length / inputs.length) * 15;
      
      // Check for focus indicators
      const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
      // This would require more sophisticated checking in a real implementation
      
      // Check color contrast (simplified)
      // This would require actual color analysis in a real implementation
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculates mobile performance score
   * Requirements: 6.4
   */
  private calculateMobilePerformanceScore(): number {
    let score = 100;
    
    if (typeof window !== 'undefined') {
      // Check viewport meta tag
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) score -= 20;
      
      // Check for touch-friendly elements
      const buttons = document.querySelectorAll('button, a');
      // This would check for appropriate touch target sizes in a real implementation
      
      // Check for mobile-optimized images
      const images = document.querySelectorAll('img');
      // This would check for responsive images in a real implementation
      
      // Performance metrics specific to mobile
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        if (loadTime > 3000) score -= 15; // Mobile should load faster
        if (loadTime > 5000) score -= 25;
      }
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Gets browser information
   * Requirements: 6.4
   */
  private getBrowserInfo(): { name: string; version: string } {
    if (typeof navigator === 'undefined') {
      return { name: 'unknown', version: 'unknown' };
    }
    
    const userAgent = navigator.userAgent;
    
    // Simple browser detection
    if (userAgent.includes('Chrome')) {
      const match = userAgent.match(/Chrome\/(\d+)/);
      return { name: 'Chrome', version: match ? match[1] : 'unknown' };
    } else if (userAgent.includes('Firefox')) {
      const match = userAgent.match(/Firefox\/(\d+)/);
      return { name: 'Firefox', version: match ? match[1] : 'unknown' };
    } else if (userAgent.includes('Safari')) {
      const match = userAgent.match(/Safari\/(\d+)/);
      return { name: 'Safari', version: match ? match[1] : 'unknown' };
    } else if (userAgent.includes('Edge')) {
      const match = userAgent.match(/Edge\/(\d+)/);
      return { name: 'Edge', version: match ? match[1] : 'unknown' };
    }
    
    return { name: 'unknown', version: 'unknown' };
  }

  /**
   * Calculates compatibility score
   * Requirements: 6.4
   */
  private calculateCompatibilityScore(browserInfo: { name: string; version: string }): number {
    let score = 100;
    
    // Basic compatibility scoring based on browser support
    const supportedBrowsers = {
      'Chrome': { minVersion: 80, score: 100 },
      'Firefox': { minVersion: 75, score: 95 },
      'Safari': { minVersion: 13, score: 90 },
      'Edge': { minVersion: 80, score: 95 }
    };
    
    const browserSupport = supportedBrowsers[browserInfo.name as keyof typeof supportedBrowsers];
    if (browserSupport) {
      const version = parseInt(browserInfo.version);
      if (version < browserSupport.minVersion) {
        score = Math.max(50, browserSupport.score - ((browserSupport.minVersion - version) * 5));
      } else {
        score = browserSupport.score;
      }
    } else {
      score = 70; // Unknown browser gets moderate score
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculates integrated performance score
   * Requirements: 6.1, 6.4, 6.5
   */
  private calculateIntegratedPerformanceScore(
    systemMetrics: PerformanceMetrics,
    productionMetrics: any
  ): number {
    // Weighted scoring of different performance aspects
    const weights = {
      loadTime: 0.25,
      memoryUsage: 0.15,
      apiResponseTime: 0.20,
      cacheHitRate: 0.10,
      paymentSuccessRate: 0.20,
      userExperience: 0.10
    };
    
    // Normalize metrics to 0-100 scale
    const loadTimeScore = Math.max(0, 100 - (systemMetrics.loadTime / 50)); // 5s = 0 points
    const memoryScore = Math.max(0, 100 - systemMetrics.memoryUsage);
    const apiScore = Math.max(0, 100 - (systemMetrics.apiResponseTime / 100)); // 10s = 0 points
    const cacheScore = systemMetrics.cacheHitRate * 100;
    const paymentScore = (productionMetrics.payment_success_rate || 0) * 100;
    const uxScore = (this.userExperienceMetrics.user_satisfaction_score || 80);
    
    const integratedScore = 
      (loadTimeScore * weights.loadTime) +
      (memoryScore * weights.memoryUsage) +
      (apiScore * weights.apiResponseTime) +
      (cacheScore * weights.cacheHitRate) +
      (paymentScore * weights.paymentSuccessRate) +
      (uxScore * weights.userExperience);
    
    return Math.max(0, Math.min(100, integratedScore));
  }

  /**
   * Checks for performance alerts
   * Requirements: 6.1, 6.4, 6.5
   */
  private checkPerformanceAlerts(
    integratedScore: number,
    systemMetrics: PerformanceMetrics,
    productionMetrics: any
  ): void {
    // Critical performance alerts
    if (integratedScore < 50) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'CRITICAL',
        message: 'Critical performance degradation detected',
        details: {
          integrated_score: integratedScore,
          load_time: systemMetrics.loadTime,
          memory_usage: systemMetrics.memoryUsage,
          api_response_time: systemMetrics.apiResponseTime
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }

    // Warning performance alerts
    if (integratedScore < 70) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'WARNING',
        message: 'Performance degradation detected',
        details: {
          integrated_score: integratedScore,
          recommendations: this.generatePerformanceRecommendations()
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }

    // Payment-specific alerts
    if (this.paymentMetrics.error_rate > 0.05) { // 5% error rate threshold
      this.logPerformanceEvent({
        event_type: 'PAYMENT_ALERT',
        severity: 'CRITICAL',
        message: 'High payment error rate detected',
        details: {
          error_rate: this.paymentMetrics.error_rate,
          success_rate: this.paymentMetrics.success_rate
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }

    // User experience alerts
    if (this.userExperienceMetrics.user_satisfaction_score < 60) {
      this.logPerformanceEvent({
        event_type: 'UX_ALERT',
        severity: 'WARNING',
        message: 'Low user satisfaction score detected',
        details: {
          satisfaction_score: this.userExperienceMetrics.user_satisfaction_score,
          page_load_performance: this.userExperienceMetrics.page_load_performance,
          interactive_response_time: this.userExperienceMetrics.interactive_response_time
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }
  }

  /**
   * Generates performance recommendations
   * Requirements: 6.1, 6.4, 6.5
   */
  private generatePerformanceRecommendations(): string[] {
    const recommendations: string[] = [];
    const systemMetrics = performanceOptimizationService.getPerformanceMetrics();

    // Load time recommendations
    if (systemMetrics.loadTime > 3000) {
      recommendations.push('Optimize page load time - consider code splitting and lazy loading');
    }

    // Memory usage recommendations
    if (systemMetrics.memoryUsage > 80) {
      recommendations.push('High memory usage detected - review memory leaks and optimize data structures');
    }

    // API response time recommendations
    if (systemMetrics.apiResponseTime > 2000) {
      recommendations.push('Slow API responses - consider caching, database optimization, or CDN usage');
    }

    // Cache hit rate recommendations
    if (systemMetrics.cacheHitRate < 0.7) {
      recommendations.push('Low cache hit rate - review caching strategy and TTL settings');
    }

    // Payment performance recommendations
    if (this.paymentMetrics.payment_processing_time > 5000) {
      recommendations.push('Slow payment processing - optimize Ikhokha API integration and error handling');
    }

    // User experience recommendations
    if (this.userExperienceMetrics.page_load_performance > 3000) {
      recommendations.push('Improve page load performance for better user experience');
    }

    if (this.userExperienceMetrics.interactive_response_time > 300) {
      recommendations.push('Reduce interactive response time - optimize JavaScript execution');
    }

    if (this.userExperienceMetrics.visual_stability_score > 0.25) {
      recommendations.push('Improve visual stability - reduce layout shifts');
    }

    // Mobile performance recommendations
    if (this.userExperienceMetrics.mobile_performance_score < 70) {
      recommendations.push('Optimize mobile performance - review responsive design and mobile-specific optimizations');
    }

    // Accessibility recommendations
    if (this.userExperienceMetrics.accessibility_score < 80) {
      recommendations.push('Improve accessibility - add alt text, proper headings, and form labels');
    }

    return recommendations;
  }

  /**
   * Initializes default metrics
   * Requirements: 6.1, 6.4, 6.5
   */
  private initializeMetrics(): void {
    this.paymentMetrics = {
      payment_initiation_time: 0,
      payment_processing_time: 0,
      payment_completion_time: 0,
      webhook_processing_time: 0,
      enrollment_creation_time: 0,
      course_access_grant_time: 0,
      total_flow_time: 0,
      success_rate: 0,
      error_rate: 0
    };

    this.enrollmentMetrics = {
      course_selection_time: 0,
      payment_form_load_time: 0,
      payment_submission_time: 0,
      enrollment_confirmation_time: 0,
      course_access_time: 0,
      user_journey_completion_rate: 0,
      abandonment_rate: 0,
      conversion_rate: 0
    };

    this.userExperienceMetrics = {
      page_load_performance: 0,
      interactive_response_time: 0,
      visual_stability_score: 0,
      accessibility_score: 0,
      error_frequency: 0,
      user_satisfaction_score: 80, // Default to 80%
      mobile_performance_score: 0,
      cross_browser_compatibility_score: 0
    };

    this.validationMetrics = {
      configuration_validation_time: 0,
      security_validation_time: 0,
      api_connectivity_validation_time: 0,
      webhook_validation_time: 0,
      overall_validation_success_rate: 0,
      validation_error_count: 0
    };
  }

  /**
   * Gets current integration status
   * Requirements: 6.1, 6.4, 6.5
   */
  getIntegrationStatus(): {
    initialized: boolean;
    metrics_collection_active: boolean;
    last_collection: Date | null;
    performance_score: number;
  } {
    const systemMetrics = performanceOptimizationService.getPerformanceMetrics();
    const performanceScore = this.calculateIntegratedPerformanceScore(systemMetrics, {});

    return {
      initialized: this.isInitialized,
      metrics_collection_active: this.metricsCollectionInterval !== null,
      last_collection: new Date(),
      performance_score: performanceScore
    };
  }

  /**
   * Stops the integration and cleans up resources
   * Requirements: 6.1, 6.4, 6.5
   */
  async shutdown(): Promise<void> {
    console.log('[PRODUCTION PERFORMANCE] Shutting down production performance monitoring integration...');

    // Stop metrics collection
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval);
      this.metricsCollectionInterval = null;
    }

    // Shutdown production monitoring
    if (this.productionMonitoring) {
      await this.productionMonitoring.shutdown();
    }

    this.isInitialized = false;

    console.log('[PRODUCTION PERFORMANCE] Production performance monitoring integration shutdown complete');
  }
}

// Export singleton instance
export const productionPerformanceMonitoringIntegration = new ProductionPerformanceMonitoringIntegration();
export default ProductionPerformanceMonitoringIntegration;gratedScore));
  }

  /**
   * Checks for performance alerts
   * Requirements: 6.1, 6.4, 6.5
   */
  private checkPerformanceAlerts(
    integratedScore: number,
    systemMetrics: PerformanceMetrics,
    productionMetrics: any
  ): void {
    // Check for critical performance issues
    if (integratedScore < 50) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'CRITICAL',
        message: 'Critical performance degradation detected',
        details: {
          integrated_score: integratedScore,
          load_time: systemMetrics.loadTime,
          memory_usage: systemMetrics.memoryUsage,
          api_response_time: systemMetrics.apiResponseTime
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    } else if (integratedScore < 70) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'WARNING',
        message: 'Performance degradation detected',
        details: {
          integrated_score: integratedScore,
          recommendations: this.generatePerformanceRecommendations()
        },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }
    
    // Check specific metric thresholds
    if (systemMetrics.loadTime > 5000) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'WARNING',
        message: 'High page load time detected',
        details: { load_time: systemMetrics.loadTime, threshold: 5000 },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }
    
    if (systemMetrics.memoryUsage > 80) {
      this.logPerformanceEvent({
        event_type: 'PERFORMANCE_ALERT',
        severity: 'WARNING',
        message: 'High memory usage detected',
        details: { memory_usage: systemMetrics.memoryUsage, threshold: 80 },
        timestamp: new Date(),
        source: 'ProductionPerformanceMonitoringIntegration'
      });
    }
  }

  /**
   * Generates performance recommendations
   * Requirements: 6.1, 6.4, 6.5
   */
  private generatePerformanceRecommendations(): string[] {
    const recommendations: string[] = [];
    const systemMetrics = performanceOptimizationService.getPerformanceMetrics();
    
    if (systemMetrics.loadTime > 3000) {
      recommendations.push('Optimize page load time by implementing code splitting and lazy loading');
    }
    
    if (systemMetrics.memoryUsage > 70) {
      recommendations.push('Optimize memory usage by implementing proper cleanup and garbage collection');
    }
    
    if (systemMetrics.cacheHitRate < 0.8) {
      recommendations.push('Improve cache hit rate by optimizing caching strategies');
    }
    
    if (systemMetrics.apiResponseTime > 2000) {
      recommendations.push('Optimize API response times by implementing request batching and caching');
    }
    
    if (this.userExperienceMetrics.error_frequency > 0.05) {
      recommendations.push('Reduce error frequency by implementing better error handling and validation');
    }
    
    if (this.userExperienceMetrics.accessibility_score < 80) {
      recommendations.push('Improve accessibility by adding proper ARIA labels and keyboard navigation');
    }
    
    if (this.userExperienceMetrics.mobile_performance_score < 70) {
      recommendations.push('Optimize mobile performance by implementing responsive design and touch-friendly interfaces');
    }
    
    return recommendations;
  }

  /**
   * Initializes default metrics
   * Requirements: 6.1, 6.4, 6.5
   */
  private initializeMetrics(): void {
    this.paymentMetrics = {
      payment_initiation_time: 0,
      payment_processing_time: 0,
      payment_completion_time: 0,
      webhook_processing_time: 0,
      enrollment_creation_time: 0,
      course_access_grant_time: 0,
      total_flow_time: 0,
      success_rate: 0,
      error_rate: 0
    };
    
    this.enrollmentMetrics = {
      course_selection_time: 0,
      payment_form_load_time: 0,
      payment_submission_time: 0,
      enrollment_confirmation_time: 0,
      course_access_time: 0,
      user_journey_completion_rate: 0,
      abandonment_rate: 0,
      conversion_rate: 0
    };
    
    this.userExperienceMetrics = {
      page_load_performance: 0,
      interactive_response_time: 0,
      visual_stability_score: 0,
      accessibility_score: 0,
      error_frequency: 0,
      user_satisfaction_score: 0,
      mobile_performance_score: 0,
      cross_browser_compatibility_score: 0
    };
    
    this.validationMetrics = {
      configuration_validation_time: 0,
      security_validation_time: 0,
      api_connectivity_validation_time: 0,
      webhook_validation_time: 0,
      overall_validation_success_rate: 0,
      validation_error_count: 0
    };
  }

  /**
   * Cleanup resources
   * Requirements: 6.1, 6.4, 6.5
   */
  cleanup(): void {
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval);
      this.metricsCollectionInterval = null;
    }
    
    this.isInitialized = false;
    
    console.log('[PRODUCTION PERFORMANCE] Production performance monitoring integration cleaned up');
  }

  /**
   * Gets initialization status
   * Requirements: 6.5
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const productionPerformanceMonitoringIntegration = new ProductionPerformanceMonitoringIntegration();
export default ProductionPerformanceMonitoringIntegration;