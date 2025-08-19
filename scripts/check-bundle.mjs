#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * Bundle size check script for npm package standards
 * Enforces maximum bundle size limits
 */

const BUNDLE_PATHS = [
  { path: 'dist/index.js', maxKb: 120, name: 'Main CJS bundle' },
  { path: 'dist/index.esm.js', maxKb: 120, name: 'Main ESM bundle' },
  { path: 'dist/index.min.js', maxKb: 50, name: 'Minified bundle' },
  { path: 'dist/cli/index.js', maxKb: 10, name: 'CLI bundle' }
];

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkBundleSize() {
  console.log('📦 Checking bundle sizes...\n');
  
  let allPassed = true;
  
  BUNDLE_PATHS.forEach(({ path: bundlePath, maxKb, name }) => {
    if (!fs.existsSync(bundlePath)) {
      console.log(`❌ ${name}: File not found at ${bundlePath}`);
      allPassed = false;
      return;
    }
    
    const stats = fs.statSync(bundlePath);
    const sizeKb = Math.ceil(stats.size / 1024);
    const formattedSize = formatBytes(stats.size);
    
    if (sizeKb > maxKb) {
      console.log(`❌ ${name}: ${formattedSize} > ${maxKb} KB limit`);
      allPassed = false;
    } else {
      console.log(`✅ ${name}: ${formattedSize} ≤ ${maxKb} KB limit`);
    }
  });
  
  console.log('\n📊 Bundle size summary:');
  BUNDLE_PATHS.forEach(({ path: bundlePath, maxKb, name }) => {
    if (fs.existsSync(bundlePath)) {
      const stats = fs.statSync(bundlePath);
      const sizeKb = Math.ceil(stats.size / 1024);
      const percentage = ((sizeKb / maxKb) * 100).toFixed(1);
      console.log(`  ${name}: ${sizeKb} KB / ${maxKb} KB (${percentage}%)`);
    }
  });
  
  if (!allPassed) {
    console.error('\n❌ Bundle size check failed. Some bundles exceed limits.');
    process.exit(1);
  }
  
  console.log('\n✅ All bundle sizes are within limits!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkBundleSize();
}

export { checkBundleSize };
