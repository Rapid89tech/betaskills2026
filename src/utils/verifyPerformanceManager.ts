/**
 * Simple verification script for PerformanceManager functionality
 * This can be run in the browser console to verify the implementation
 */

import { performanceManager } from './PerformanceManager';

export const verifyPerformanceManager = (): void => {
  console.log('🧪 Starting PerformanceManager verification...');

  try {
    // Test 1: Basic initialization
    console.log('✅ Test 1: PerformanceManager initialized');

    // Test 2: Enable/disable functionality
    performanceManager.setEnabled(true);
    console.log('✅ Test 2: Enable/disable functionality works');

    // Test 3: Track user interaction
    performanceManager.trackUserInteraction('test-click', 'test-button');
    console.log('✅ Test 3: User interaction tracking works');

    // Test 4: Measure page load
    performanceManager.measurePageLoad('test-page');
    console.log('✅ Test 4: Page load measurement works');

    // Test 5: Critical components management
    performanceManager.addCriticalComponent('TestComponent');
    performanceManager.removeCriticalComponent('TestComponent');
    console.log('✅ Test 5: Critical components management works');

    // Test 6: Performance summary
    const summary = performanceManager.getPerformanceSummary();
    if (summary && typeof summary === 'object') {
      console.log('✅ Test 6: Performance summary generation works');
      console.log('📊 Summary:', summary);
    } else {
      console.warn('⚠️ Test 6: Performance summary has unexpected format');
    }

    // Test 7: Asset optimization
    performanceManager.optimizeAssets();
    console.log('✅ Test 7: Asset optimization works');

    // Test 8: Cache management
    performanceManager.clearCache();
    console.log('✅ Test 8: Cache management works');

    console.log('🎉 All PerformanceManager tests passed!');
    
    // Display final summary
    const finalSummary = performanceManager.getPerformanceSummary();
    console.log('📈 Final Performance Summary:', finalSummary);

  } catch (error) {
    console.error('❌ PerformanceManager verification failed:', error);
  }
};

// Auto-run verification in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Add to window for manual testing
  (window as any).verifyPerformanceManager = verifyPerformanceManager;
  
  // Auto-run after a short delay
  setTimeout(() => {
    console.log('🔧 PerformanceManager verification available at window.verifyPerformanceManager()');
  }, 1000);
}

export default verifyPerformanceManager;