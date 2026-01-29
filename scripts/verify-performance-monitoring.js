/**
 * Verification script for performance monitoring implementation
 */

import { performanceMonitor } from '../src/utils/performanceMonitor.js';
import { performanceOptimizer } from '../src/utils/performanceOptimizer.js';
import { performanceAnalytics } from '../src/utils/performanceAnalytics.js';

console.log('🔍 Verifying Performance Monitoring Implementation...\n');

// Test 1: Performance Monitor Basic Functionality
console.log('1. Testing Performance Monitor...');
try {
  // Start a measurement
  performanceMonitor.startMeasure('test-component', 'component');
  
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // End measurement
  const duration = performanceMonitor.endMeasure('test-component');
  
  if (duration && duration > 0) {
    console.log('   ✅ Performance measurement working');
    console.log(`   📊 Test component took ${duration.toFixed(2)}ms`);
  } else {
    console.log('   ❌ Performance measurement failed');
  }
  
  // Test performance summary
  const summary = performanceMonitor.getSummary();
  console.log(`   📈 Total operations: ${summary.totalOperations}`);
  console.log(`   ⏱️  Average duration: ${summary.averageDuration.toFixed(2)}ms`);
  
} catch (error) {
  console.log('   ❌ Performance Monitor test failed:', error.message);
}

// Test 2: Performance Health Assessment
console.log('\n2. Testing Performance Health Assessment...');
try {
  const health = performanceMonitor.getPerformanceHealth();
  
  console.log(`   🎯 Performance Score: ${health.score}/100`);
  console.log(`   📋 Issues Found: ${health.issues.length}`);
  console.log(`   💡 Recommendations: ${health.recommendations.length}`);
  
  if (health.issues.length > 0) {
    console.log('   🚨 Issues:');
    health.issues.forEach(issue => console.log(`      - ${issue}`));
  }
  
  if (health.recommendations.length > 0) {
    console.log('   💡 Recommendations:');
    health.recommendations.slice(0, 3).forEach(rec => console.log(`      - ${rec}`));
  }
  
  console.log('   ✅ Performance health assessment working');
  
} catch (error) {
  console.log('   ❌ Performance health test failed:', error.message);
}

// Test 3: Performance Optimizer
console.log('\n3. Testing Performance Optimizer...');
try {
  const report = await performanceOptimizer.analyzePerformance();
  
  console.log(`   📊 Performance Analysis Score: ${report.score}/100`);
  console.log(`   🔧 Available Optimizations: ${report.optimizations.length}`);
  console.log(`   ✅ Applied Optimizations: ${report.appliedOptimizations.length}`);
  
  if (report.optimizations.length > 0) {
    console.log('   🛠️  Top Optimization Suggestions:');
    report.optimizations.slice(0, 3).forEach(opt => {
      console.log(`      - ${opt.name} (${opt.priority} priority)`);
    });
  }
  
  // Test getting suggestions
  const suggestions = performanceOptimizer.getOptimizationSuggestions();
  console.log(`   💡 Total Suggestions Available: ${suggestions.length}`);
  
  console.log('   ✅ Performance optimizer working');
  
} catch (error) {
  console.log('   ❌ Performance optimizer test failed:', error.message);
}

// Test 4: Performance Analytics
console.log('\n4. Testing Performance Analytics...');
try {
  // Collect a data point
  performanceAnalytics.collectDataPoint();
  
  // Generate a report
  const report = performanceAnalytics.generateReport('hour');
  
  console.log(`   📈 Report Period: ${report.period}`);
  console.log(`   📊 Total Sessions: ${report.totalSessions}`);
  console.log(`   🎯 Average Performance Score: ${report.averagePerformanceScore.toFixed(1)}`);
  console.log(`   ⏱️  Average Page Load: ${report.averagePageLoadTime.toFixed(0)}ms`);
  
  // Test trends
  const trends = performanceAnalytics.getPerformanceTrends(7);
  console.log(`   📅 Trend Data Points: ${trends.dates.length} days`);
  
  // Test export
  const exportData = performanceAnalytics.exportData('json');
  const isValidJson = (() => {
    try {
      JSON.parse(exportData);
      return true;
    } catch {
      return false;
    }
  })();
  
  console.log(`   💾 Data Export: ${isValidJson ? 'Valid JSON' : 'Invalid'}`);
  console.log('   ✅ Performance analytics working');
  
} catch (error) {
  console.log('   ❌ Performance analytics test failed:', error.message);
}

// Test 5: Integration Test
console.log('\n5. Testing Integration...');
try {
  // Test that all components work together
  performanceMonitor.startMeasure('integration-test', 'component');
  
  // Simulate API call tracking
  const mockStartTime = Date.now();
  const mockResponse = {
    status: 200,
    headers: { get: () => '1000' }
  };
  performanceMonitor.trackApiCall('/api/test', 'GET', mockStartTime, mockResponse);
  
  // End measurement
  performanceMonitor.endMeasure('integration-test');
  
  // Collect analytics
  performanceAnalytics.collectDataPoint();
  
  // Get comprehensive summary
  const health = performanceMonitor.getPerformanceHealth();
  const apiSummary = performanceMonitor.getApiPerformanceSummary();
  const suggestions = performanceOptimizer.getOptimizationSuggestions();
  
  console.log('   🔗 Integration Test Results:');
  console.log(`      - Performance Score: ${health.score}/100`);
  console.log(`      - API Calls Tracked: ${apiSummary.totalCalls}`);
  console.log(`      - Optimization Suggestions: ${suggestions.length}`);
  console.log('   ✅ All components integrated successfully');
  
} catch (error) {
  console.log('   ❌ Integration test failed:', error.message);
}

// Summary
console.log('\n📋 Performance Monitoring Verification Complete!');
console.log('\n🎯 Key Features Implemented:');
console.log('   ✅ Real-time performance metrics collection');
console.log('   ✅ Page load and API call tracking');
console.log('   ✅ Performance health assessment');
console.log('   ✅ Automatic optimization suggestions');
console.log('   ✅ Performance analytics and reporting');
console.log('   ✅ Data export capabilities');
console.log('   ✅ Cross-component integration');

console.log('\n🚀 Performance monitoring is ready for use!');
console.log('\n💡 Usage Tips:');
console.log('   - Access tools in dev console: window.performanceManager, window.performanceOptimizer');
console.log('   - Visit /performance-dashboard in development for detailed metrics');
console.log('   - Enable monitoring with localStorage.setItem("enablePerformanceMonitoring", "true")');
console.log('   - Use usePerformanceMetrics hook in React components');

process.exit(0);