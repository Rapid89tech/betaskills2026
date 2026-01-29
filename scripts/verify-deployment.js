#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * Runs comprehensive checks to verify the production payment validation system is ready for deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Card Payment System Deployment Verification\n');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function runCheck(name, fn) {
  try {
    console.log(`\n📋 ${name}...`);
    const result = fn();
    if (result.status === 'pass') {
      checks.passed.push(name);
      console.log(`✅ ${name}: PASSED`);
      if (result.message) console.log(`   ${result.message}`);
    } else if (result.status === 'warn') {
      checks.warnings.push({ name, message: result.message });
      console.log(`⚠️  ${name}: WARNING`);
      console.log(`   ${result.message}`);
    } else {
      checks.failed.push({ name, message: result.message });
      console.log(`❌ ${name}: FAILED`);
      console.log(`   ${result.message}`);
    }
  } catch (error) {
    checks.failed.push({ name, message: error.message });
    console.log(`❌ ${name}: FAILED`);
    console.log(`   ${error.message}`);
  }
}

// Check 1: Environment Configuration
runCheck('Environment Configuration', () => {
  const envFile = path.join(__dirname, '..', '.env.production.card-payment');
  if (!fs.existsSync(envFile)) {
    return { status: 'warn', message: '.env.production.card-payment file not found - using default configuration' };
  }

  const envContent = fs.readFileSync(envFile, 'utf8');
  const requiredVars = [
    'VITE_IKHOKHA_API_KEY',
    'VITE_IKHOKHA_API_SECRET',
    'VITE_IKHOKHA_WEBHOOK_SECRET'
  ];

  const missing = requiredVars.filter(varName => !envContent.includes(varName));
  
  if (missing.length > 0) {
    return { status: 'warn', message: `Missing variables: ${missing.join(', ')} - ensure they are set in production` };
  }

  return { status: 'pass', message: 'All required environment variables present' };
});

// Check 2: TypeScript Compilation
runCheck('TypeScript Compilation', () => {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    return { status: 'pass', message: 'TypeScript compilation successful' };
  } catch (error) {
    return { status: 'fail', message: 'TypeScript compilation failed' };
  }
});

// Check 3: Configuration Files
runCheck('Configuration Files', () => {
  const requiredFiles = [
    'src/utils/productionPaymentValidator.ts',
    'src/services/PaymentTransactionService.ts',
    'src/types/paymentTransaction.ts',
    'DEPLOYMENT_GUIDE.md'
  ];

  const missing = requiredFiles.filter(file => 
    !fs.existsSync(path.join(__dirname, '..', file))
  );

  if (missing.length > 0) {
    return { status: 'fail', message: `Missing files: ${missing.join(', ')}` };
  }

  return { status: 'pass', message: 'All configuration files present' };
});

// Check 4: Database Migrations
runCheck('Database Migrations', () => {
  const migrationFile = path.join(
    __dirname,
    '..',
    'supabase',
    'migrations',
    '20241009000000_create_payment_transactions_table.sql'
  );

  if (!fs.existsSync(migrationFile)) {
    return { status: 'fail', message: 'Payment transactions migration not found' };
  }

  const content = fs.readFileSync(migrationFile, 'utf8');
  const requiredTables = [
    'payment_transactions'
  ];

  const missingTables = requiredTables.filter(table => !content.includes(table));

  if (missingTables.length > 0) {
    return { status: 'fail', message: `Missing tables: ${missingTables.join(', ')}` };
  }

  return { status: 'pass', message: 'Payment transactions table migration ready' };
});

// Check 5: Netlify Configuration
runCheck('Netlify Configuration', () => {
  const netlifyToml = path.join(__dirname, '..', 'netlify.toml');
  
  if (!fs.existsSync(netlifyToml)) {
    return { status: 'fail', message: 'netlify.toml not found' };
  }

  const content = fs.readFileSync(netlifyToml, 'utf8');
  
  if (!content.includes('card-payment-health-check')) {
    return { status: 'warn', message: 'Health check endpoint not configured' };
  }

  return { status: 'pass', message: 'Netlify configuration valid' };
});

// Check 6: Health Check Function
runCheck('Health Check Function', () => {
  const healthCheckFile = path.join(
    __dirname,
    '..',
    'netlify',
    'functions',
    'card-payment-health-check.ts'
  );

  if (!fs.existsSync(healthCheckFile)) {
    return { status: 'fail', message: 'Health check function not found' };
  }

  return { status: 'pass', message: 'Health check function present' };
});

// Check 7: Test Files
runCheck('Test Files', () => {
  const testFile = path.join(
    __dirname,
    '..',
    'src',
    'test',
    'production-fallback-removal.test.ts'
  );

  if (!fs.existsSync(testFile)) {
    return { status: 'fail', message: 'Production validation tests not found' };
  }

  return { status: 'pass', message: 'Production validation tests present' };
});

// Check 8: Documentation
runCheck('Documentation', () => {
  const deploymentGuide = path.join(__dirname, '..', 'DEPLOYMENT_GUIDE.md');
  
  if (!fs.existsSync(deploymentGuide)) {
    return { status: 'fail', message: 'Deployment guide not found' };
  }

  const content = fs.readFileSync(deploymentGuide, 'utf8');
  const requiredSections = [
    'Pre-Deployment Checklist',
    'Environment Variables Required',
    'Database Migration',
    'Deployment Steps',
    'Post-Deployment Testing',
    'Monitoring and Alerts'
  ];

  const missingSections = requiredSections.filter(section => !content.includes(section));

  if (missingSections.length > 0) {
    return { status: 'warn', message: `Missing sections: ${missingSections.join(', ')}` };
  }

  return { status: 'pass', message: 'Deployment guide complete' };
});

// Check 9: Build Test
runCheck('Production Build', () => {
  try {
    console.log('   Building production bundle...');
    execSync('npm run build', { stdio: 'pipe' });
    
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
      return { status: 'fail', message: 'Build output directory not found' };
    }

    const indexHtml = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexHtml)) {
      return { status: 'fail', message: 'index.html not found in build output' };
    }

    return { status: 'pass', message: 'Production build successful' };
  } catch (error) {
    return { status: 'fail', message: 'Production build failed' };
  }
});

// Print Summary
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

console.log(`\n✅ Passed: ${checks.passed.length}`);
checks.passed.forEach(check => console.log(`   - ${check}`));

if (checks.warnings.length > 0) {
  console.log(`\n⚠️  Warnings: ${checks.warnings.length}`);
  checks.warnings.forEach(({ name, message }) => {
    console.log(`   - ${name}: ${message}`);
  });
}

if (checks.failed.length > 0) {
  console.log(`\n❌ Failed: ${checks.failed.length}`);
  checks.failed.forEach(({ name, message }) => {
    console.log(`   - ${name}: ${message}`);
  });
}

console.log('\n' + '='.repeat(60));

if (checks.failed.length === 0) {
  console.log('✅ All critical checks passed!');
  console.log('🚀 System is ready for deployment');
  
  if (checks.warnings.length > 0) {
    console.log('\n⚠️  Please review warnings before deploying');
  }
  
  console.log('\nNext steps:');
  console.log('1. Review the deployment guide: DEPLOYMENT_GUIDE.md');
  console.log('2. Configure production environment variables');
  console.log('3. Run database migrations: supabase db push');
  console.log('4. Deploy to production');
  console.log('5. Verify payment validation is working');
  
  process.exit(0);
} else {
  console.log('❌ Deployment verification failed');
  console.log('🔧 Please fix the failed checks before deploying');
  process.exit(1);
}
