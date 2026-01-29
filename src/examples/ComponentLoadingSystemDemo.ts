/**
 * Component Loading System Demonstration
 * 
 * This file demonstrates the complete component loading system functionality
 * including registration, loading, fallbacks, and error recovery.
 */

import React from 'react';
import { ComponentLoadingManager, ComponentRegistration } from '../services/ComponentLoadingManager';
import { ComponentFallbacks } from '../components/loading/ComponentFallbacks';

// Create manager instance
const manager = ComponentLoadingManager.getInstance();

// Demo components
const SuccessfulComponent: React.FC = () =>
    React.createElement('div', { 'data-testid': 'successful-component' }, 'Component Loaded Successfully!');

const CriticalComponent: React.FC = () =>
    React.createElement('div', { 'data-testid': 'critical-component' }, 'Critical Component Loaded!');

const SlowComponent: React.FC = () =>
    React.createElement('div', { 'data-testid': 'slow-component' }, 'Slow Component Eventually Loaded!');

// Demo function to showcase the system
export async function demonstrateComponentLoadingSystem() {
    console.log('🚀 Component Loading System Demonstration');
    console.log('==========================================');

    // 1. Register components with different characteristics
    console.log('\n1. Registering components...');

    const registrations: ComponentRegistration[] = [
        {
            name: 'SuccessfulComponent',
            importFn: () => Promise.resolve({ default: SuccessfulComponent }),
            critical: false,
            fallback: ComponentFallbacks.Loading
        },
        {
            name: 'CriticalComponent',
            importFn: () => Promise.resolve({ default: CriticalComponent }),
            critical: true,
            preloadTrigger: 'immediate',
            fallback: ComponentFallbacks.Error
        },
        {
            name: 'FailingComponent',
            importFn: () => Promise.reject(new Error('Network error')),
            critical: false,
            fallback: ComponentFallbacks.Error
        },
        {
            name: 'SlowComponent',
            importFn: () => new Promise((resolve) => {
                setTimeout(() => resolve({ default: SlowComponent }), 2000);
            }),
            critical: false,
            fallback: ComponentFallbacks.Loading
        },
        {
            name: 'TimeoutComponent',
            importFn: () => new Promise((resolve) => {
                setTimeout(() => resolve({ default: SlowComponent }), 5000);
            }),
            critical: false,
            fallback: ComponentFallbacks.Error
        }
    ];

    registrations.forEach(reg => {
        manager.registerComponent(reg);
        console.log(`✅ Registered: ${reg.name} (critical: ${reg.critical})`);
    });

    // 2. Configure the system
    console.log('\n2. Configuring system...');
    manager.updateConfig({
        maxRetries: 3,
        retryDelay: 500,
        timeout: 3000,
        enableFallbacks: true,
        enablePerformanceTracking: true
    });
    console.log('✅ Configuration updated');

    // 3. Demonstrate successful loading
    console.log('\n3. Loading successful component...');
    try {
        const result = await manager.loadComponent('SuccessfulComponent');
        console.log(`✅ Success: ${result.success}, Load time: ${result.loadTime}ms, Retries: ${result.retryCount}`);
    } catch (error) {
        console.log(`❌ Error: ${error}`);
    }

    // 4. Demonstrate critical component preloading
    console.log('\n4. Checking critical component preloading...');
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for preloading
    const isPreloaded = manager.isPreloaded('CriticalComponent');
    console.log(`✅ Critical component preloaded: ${isPreloaded}`);

    // 5. Demonstrate error handling with fallback
    console.log('\n5. Loading failing component (with fallback)...');
    try {
        const result = await manager.loadComponent('FailingComponent');
        console.log(`✅ Fallback used: ${result.fallbackUsed}, Error: ${result.error?.message}`);
    } catch (error) {
        console.log(`❌ Error: ${error}`);
    }

    // 6. Demonstrate timeout handling
    console.log('\n6. Loading component with timeout...');
    try {
        const result = await manager.loadComponent('TimeoutComponent');
        console.log(`✅ Timeout handled: ${result.fallbackUsed}, Error: ${result.error?.message}`);
    } catch (error) {
        console.log(`❌ Error: ${error}`);
    }

    // 7. Show loading statistics
    console.log('\n7. Loading statistics:');
    const stats = manager.getLoadingStats();
    console.log(`📊 Total components: ${stats.totalComponents}`);
    console.log(`📊 Preloaded components: ${stats.preloadedComponents}`);
    console.log(`📊 Failed components: ${stats.failedComponents}`);
    console.log(`📊 Critical components: ${stats.criticalComponents}`);
    console.log(`📊 Average load time: ${stats.averageLoadTime.toFixed(2)}ms`);

    // 8. Demonstrate context-based preloading
    console.log('\n8. Context-based preloading...');
    await manager.preloadForContext('dashboard', ['SuccessfulComponent', 'CriticalComponent']);
    console.log('✅ Dashboard components preloaded');

    // 9. Show all loading states
    console.log('\n9. Component loading states:');
    const allStates = manager.getAllLoadingStates();
    allStates.forEach((state, name) => {
        console.log(`📋 ${name}: loading=${state.isLoading}, preloaded=${state.preloaded}, retries=${state.retryCount}`);
    });

    // 10. Demonstrate lazy component creation
    console.log('\n10. Creating lazy components...');
    try {
        const LazySuccessful = manager.createLazyComponent('SuccessfulComponent');
        const LazyCritical = manager.createLazyComponent('CriticalComponent');
        console.log('✅ Lazy components created successfully');
        console.log(`✅ LazySuccessful type: ${typeof LazySuccessful}`);
        console.log(`✅ LazyCritical type: ${typeof LazyCritical}`);
    } catch (error) {
        console.log(`❌ Error creating lazy components: ${error}`);
    }

    console.log('\n🎉 Component Loading System demonstration complete!');
    console.log('==========================================');

    return {
        manager,
        stats: manager.getLoadingStats(),
        config: manager.getConfig()
    };
}

// Export for use in other files
export { manager as componentLoadingManager };
export default demonstrateComponentLoadingSystem;