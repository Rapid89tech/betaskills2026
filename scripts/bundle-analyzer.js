#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes JavaScript bundle sizes and provides optimization recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(path.dirname(__dirname), 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Size thresholds in KB
const THRESHOLDS = {
  CHUNK_WARNING: 500, // Warn if chunk is larger than 500KB
  CHUNK_ERROR: 1000,  // Error if chunk is larger than 1MB
  TOTAL_WARNING: 2000, // Warn if total bundle is larger than 2MB
  TOTAL_ERROR: 3000    // Error if total bundle is larger than 3MB
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function analyzeBundle() {
  console.log('🔍 Analyzing JavaScript bundle sizes...\n');

  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('❌ Assets directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));

  if (jsFiles.length === 0) {
    console.error('❌ No JavaScript files found in assets directory.');
    process.exit(1);
  }

  let totalJSSize = 0;
  let totalCSSSize = 0;
  const chunks = [];

  // Analyze JavaScript files
  console.log('📊 JavaScript Chunks:');
  console.log('─'.repeat(80));
  
  jsFiles.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const size = getFileSize(filePath);
    const sizeKB = size / 1024;
    
    totalJSSize += size;
    
    let status = '✅';
    if (sizeKB > THRESHOLDS.CHUNK_ERROR) {
      status = '❌';
    } else if (sizeKB > THRESHOLDS.CHUNK_WARNING) {
      status = '⚠️ ';
    }

    chunks.push({
      name: file,
      size: size,
      sizeKB: sizeKB,
      status: status
    });

    console.log(`${status} ${file.padEnd(40)} ${formatBytes(size).padStart(10)}`);
  });

  // Analyze CSS files
  if (cssFiles.length > 0) {
    console.log('\n🎨 CSS Files:');
    console.log('─'.repeat(80));
    
    cssFiles.forEach(file => {
      const filePath = path.join(ASSETS_DIR, file);
      const size = getFileSize(filePath);
      totalCSSSize += size;
      console.log(`✅ ${file.padEnd(40)} ${formatBytes(size).padStart(10)}`);
    });
  }

  // Summary
  const totalSize = totalJSSize + totalCSSSize;
  const totalSizeKB = totalSize / 1024;
  
  console.log('\n📈 Bundle Summary:');
  console.log('─'.repeat(80));
  console.log(`JavaScript Total: ${formatBytes(totalJSSize)}`);
  console.log(`CSS Total:        ${formatBytes(totalCSSSize)}`);
  console.log(`Total Bundle:     ${formatBytes(totalSize)}`);

  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('─'.repeat(80));

  const largeChunks = chunks.filter(chunk => chunk.sizeKB > THRESHOLDS.CHUNK_WARNING);
  if (largeChunks.length > 0) {
    console.log('⚠️  Large chunks detected:');
    largeChunks.forEach(chunk => {
      console.log(`   • ${chunk.name} (${formatBytes(chunk.size)})`);
    });
    console.log('   Consider splitting these chunks further or lazy loading components.');
  }

  if (totalSizeKB > THRESHOLDS.TOTAL_WARNING) {
    console.log('⚠️  Total bundle size is large. Consider:');
    console.log('   • Implementing more aggressive code splitting');
    console.log('   • Removing unused dependencies');
    console.log('   • Using dynamic imports for heavy components');
  }

  // Check for potential optimizations
  const vendorChunk = chunks.find(chunk => chunk.name.includes('vendor'));
  if (vendorChunk && vendorChunk.sizeKB > 800) {
    console.log('⚠️  Large vendor chunk detected. Consider:');
    console.log('   • Splitting vendor dependencies');
    console.log('   • Using CDN for large libraries');
    console.log('   • Tree shaking unused code');
  }

  if (chunks.length < 3) {
    console.log('💡 Consider implementing more code splitting:');
    console.log('   • Route-based splitting');
    console.log('   • Component-based splitting');
    console.log('   • Feature-based splitting');
  }

  // Performance score
  let score = 100;
  if (totalSizeKB > THRESHOLDS.TOTAL_ERROR) score -= 40;
  else if (totalSizeKB > THRESHOLDS.TOTAL_WARNING) score -= 20;
  
  largeChunks.forEach(chunk => {
    if (chunk.sizeKB > THRESHOLDS.CHUNK_ERROR) score -= 20;
    else if (chunk.sizeKB > THRESHOLDS.CHUNK_WARNING) score -= 10;
  });

  console.log(`\n🎯 Performance Score: ${Math.max(0, score)}/100`);
  
  if (score >= 80) {
    console.log('✅ Excellent bundle optimization!');
  } else if (score >= 60) {
    console.log('⚠️  Good, but room for improvement.');
  } else {
    console.log('❌ Bundle needs optimization.');
  }

  console.log('\n📝 To improve your score:');
  console.log('   • Keep individual chunks under 500KB');
  console.log('   • Keep total bundle under 2MB');
  console.log('   • Use lazy loading for heavy components');
  console.log('   • Implement proper code splitting strategies');

  // Exit with error code if bundle is too large
  if (totalSizeKB > THRESHOLDS.TOTAL_ERROR) {
    console.log('\n❌ Bundle size exceeds maximum threshold!');
    process.exit(1);
  }
}

// Run the analysis
analyzeBundle();