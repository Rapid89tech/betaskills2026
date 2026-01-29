/**
 * Production Webhook Setup Script
 * 
 * Configures and registers production webhooks with Ikhokha
 * Ensures proper webhook endpoints for real payment processing
 */

import { webhookRegistrationService } from '../services/WebhookRegistrationService';
import { productionWebhookService } from '../services/ProductionWebhookService';
import { validateWebhookSetup, printValidationReport } from './validateWebhookSetup';
import { checkProductionSetup } from '../config/productionCredentials';
import { enrollmentActivationService } from '../services/EnrollmentActivationService';

export interface WebhookSetupResult {
  success: boolean;
  webhookId?: string;
  endpoint: string;
  validationPassed: boolean;
  activationConfigured: boolean;
  issues: string[];
  recommendations: string[];
}

/**
 * Main webhook setup function
 */
export async function setupProductionWebhooks(): Promise<WebhookSetupResult> {
  console.log('🚀 Starting production webhook setup...');
  
  const result: WebhookSetupResult = {
    success: false,
    endpoint: '',
    validationPassed: false,
    activationConfigured: false,
    issues: [],
    recommendations: []
  };

  try {
    // 1. Validate production environment
    console.log('🔍 Step 1: Validating production environment...');
    const productionCheck = checkProductionSetup();
    
    if (!productionCheck.ready) {
      result.issues.push(...productionCheck.issues);
      result.recommendations.push(...productionCheck.recommendations);
      console.error('❌ Production environment not ready:', productionCheck.issues);
      return result;
    }
    
    console.log('✅ Production environment validated');

    // 2. Configure webhook endpoint
    console.log('🔧 Step 2: Configuring webhook endpoint...');
    const webhookConfig = productionWebhookService.configureProductionWebhook();
    result.endpoint = webhookConfig.url;
    
    console.log('✅ Webhook endpoint configured:', webhookConfig.url);

    // 3. Register webhook with Ikhokha
    console.log('📝 Step 3: Registering webhook with Ikhokha...');
    const registrationResult = await webhookRegistrationService.registerWebhook();
    
    if (!registrationResult.success) {
      result.issues.push(`Webhook registration failed: ${registrationResult.error}`);
      console.error('❌ Webhook registration failed:', registrationResult.error);
      return result;
    }
    
    result.webhookId = registrationResult.webhookId;
    console.log('✅ Webhook registered successfully:', registrationResult.webhookId);

    // 4. Configure enrollment activation
    console.log('🎓 Step 4: Configuring enrollment activation...');
    const activationConfig = productionWebhookService.configureEnrollmentActivation();
    
    if (activationConfig.enabled) {
      result.activationConfigured = true;
      console.log('✅ Enrollment activation configured:', {
        autoApprove: activationConfig.autoApprove,
        notifications: activationConfig.notificationEnabled
      });
    } else {
      result.issues.push('Enrollment activation not enabled');
    }

    // 5. Validate complete webhook setup
    console.log('🔍 Step 5: Validating complete webhook setup...');
    const validationReport = await validateWebhookSetup();
    result.validationPassed = validationReport.overall === 'PASS';
    
    if (validationReport.overall === 'FAIL') {
      result.issues.push('Webhook validation failed');
      result.issues.push(...validationReport.endpoint.error ? [validationReport.endpoint.error] : []);
      result.issues.push(...validationReport.security.issues);
      result.issues.push(...validationReport.integration.issues);
      result.issues.push(...validationReport.production.issues);
    }
    
    result.recommendations.push(...validationReport.recommendations);

    // 6. Test webhook endpoint
    console.log('🧪 Step 6: Testing webhook endpoint...');
    const endpointTest = await webhookRegistrationService.testWebhookEndpoint();
    
    if (!endpointTest.success) {
      result.issues.push(`Webhook endpoint test failed: ${endpointTest.error}`);
      console.warn('⚠️ Webhook endpoint test failed:', endpointTest.error);
    } else {
      console.log('✅ Webhook endpoint test passed:', {
        responseTime: endpointTest.responseTime,
        status: endpointTest.status
      });
    }

    // 7. Final success check
    result.success = result.issues.length === 0 && result.validationPassed;

    if (result.success) {
      console.log('🎉 Production webhook setup completed successfully!');
      console.log('📊 Setup Summary:', {
        webhookId: result.webhookId,
        endpoint: result.endpoint,
        activationEnabled: result.activationConfigured,
        validationPassed: result.validationPassed
      });
    } else {
      console.error('❌ Production webhook setup completed with issues');
      console.error('🚨 Issues found:', result.issues);
    }

    // Print detailed validation report
    printValidationReport(validationReport);

    return result;

  } catch (error) {
    console.error('❌ Production webhook setup failed:', error);
    
    result.issues.push(`Setup failed: ${error instanceof Error ? error.message : error}`);
    return result;
  }
}

/**
 * Update existing production webhook
 */
export async function updateProductionWebhook(webhookId: string): Promise<WebhookSetupResult> {
  console.log('🔄 Updating production webhook:', webhookId);
  
  const result: WebhookSetupResult = {
    success: false,
    webhookId,
    endpoint: '',
    validationPassed: false,
    activationConfigured: false,
    issues: [],
    recommendations: []
  };

  try {
    // 1. Validate production environment
    const productionCheck = checkProductionSetup();
    
    if (!productionCheck.ready) {
      result.issues.push(...productionCheck.issues);
      return result;
    }

    // 2. Update webhook configuration
    const updateResult = await webhookRegistrationService.updateWebhook(webhookId);
    
    if (!updateResult.success) {
      result.issues.push(`Webhook update failed: ${updateResult.error}`);
      return result;
    }
    
    result.endpoint = updateResult.endpoint;
    console.log('✅ Webhook updated successfully');

    // 3. Validate updated setup
    const validationReport = await validateWebhookSetup();
    result.validationPassed = validationReport.overall === 'PASS';
    
    if (validationReport.overall === 'FAIL') {
      result.issues.push('Webhook validation failed after update');
    }
    
    result.recommendations.push(...validationReport.recommendations);

    // 4. Configure activation
    const activationConfig = productionWebhookService.configureEnrollmentActivation();
    result.activationConfigured = activationConfig.enabled;

    result.success = result.issues.length === 0 && result.validationPassed;

    return result;

  } catch (error) {
    console.error('❌ Webhook update failed:', error);
    
    result.issues.push(`Update failed: ${error instanceof Error ? error.message : error}`);
    return result;
  }
}

/**
 * Remove production webhook
 */
export async function removeProductionWebhook(webhookId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  console.log('🗑️ Removing production webhook:', webhookId);
  
  try {
    const deleteResult = await webhookRegistrationService.deleteWebhook(webhookId);
    
    if (deleteResult.success) {
      console.log('✅ Webhook removed successfully');
    } else {
      console.error('❌ Webhook removal failed:', deleteResult.error);
    }
    
    return deleteResult;

  } catch (error) {
    console.error('❌ Webhook removal error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * List all registered webhooks
 */
export async function listProductionWebhooks(): Promise<{
  success: boolean;
  webhooks: Array<{
    id: string;
    url: string;
    events: string[];
    status: string;
    created_at: string;
  }>;
  error?: string;
}> {
  console.log('📋 Listing production webhooks...');
  
  try {
    const listResult = await webhookRegistrationService.listWebhooks();
    
    if (listResult.success) {
      console.log('✅ Webhooks listed successfully:', listResult.webhooks.length);
      listResult.webhooks.forEach(webhook => {
        console.log(`  - ${webhook.id}: ${webhook.url} (${webhook.status})`);
      });
    } else {
      console.error('❌ Failed to list webhooks:', listResult.error);
    }
    
    return listResult;

  } catch (error) {
    console.error('❌ Webhook listing error:', error);
    
    return {
      success: false,
      webhooks: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test webhook processing with sample data
 */
export async function testWebhookProcessing(): Promise<{
  success: boolean;
  processingTime: number;
  error?: string;
}> {
  console.log('🧪 Testing webhook processing...');
  
  const startTime = Date.now();
  
  try {
    // Create test webhook data
    const testWebhookData = {
      transaction_id: `test_${Date.now()}`,
      reference: `test_ref_${Date.now()}`,
      amount: 100,
      currency: 'ZAR',
      status: 'completed' as const,
      timestamp: new Date().toISOString(),
      signature: 'sha256=test_signature_for_processing_test',
      response_code: '00',
      response_message: 'Test Success'
    };

    // Process test webhook
    const result = await productionWebhookService.processProductionWebhook(testWebhookData);
    
    const processingTime = Date.now() - startTime;

    if (result.processed) {
      console.log('✅ Webhook processing test passed:', {
        processingTime,
        paymentUpdated: result.payment_updated,
        enrollmentUpdated: result.enrollment_updated
      });
      
      return {
        success: true,
        processingTime
      };
    } else {
      console.error('❌ Webhook processing test failed:', result.error);
      
      return {
        success: false,
        processingTime,
        error: result.error
      };
    }

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Webhook processing test error:', error);
    
    return {
      success: false,
      processingTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Run complete webhook setup validation
 */
export async function runWebhookSetupValidation(): Promise<void> {
  console.log('🔍 Running complete webhook setup validation...');
  
  try {
    const validationReport = await validateWebhookSetup();
    printValidationReport(validationReport);
    
    if (validationReport.overall === 'PASS') {
      console.log('🎉 All webhook validations passed!');
    } else if (validationReport.overall === 'WARNING') {
      console.log('⚠️ Webhook validation completed with warnings');
    } else {
      console.log('❌ Webhook validation failed');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

/**
 * Run script if executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'setup':
      setupProductionWebhooks()
        .then(result => {
          console.log('\n📊 Setup Result:', result);
          process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ Setup failed:', error);
          process.exit(1);
        });
      break;
      
    case 'validate':
      runWebhookSetupValidation();
      break;
      
    case 'test':
      testWebhookProcessing()
        .then(result => {
          console.log('\n🧪 Test Result:', result);
          process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ Test failed:', error);
          process.exit(1);
        });
      break;
      
    case 'list':
      listProductionWebhooks()
        .then(result => {
          console.log('\n📋 List Result:', result);
          process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
          console.error('❌ List failed:', error);
          process.exit(1);
        });
      break;
      
    default:
      console.log('Usage: npm run webhook:setup [setup|validate|test|list]');
      console.log('  setup    - Set up production webhooks');
      console.log('  validate - Validate webhook configuration');
      console.log('  test     - Test webhook processing');
      console.log('  list     - List registered webhooks');
      process.exit(1);
  }
}