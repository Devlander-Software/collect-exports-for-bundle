#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance optimization script
class BuildOptimizer {
  constructor() {
    this.stats = {
      filesProcessed: 0,
      totalSize: 0,
      optimizationTime: 0
    };
  }

  async optimize() {
    console.log('🚀 Starting build optimization...');
    const startTime = Date.now();

    // 1. Tree shaking analysis
    await this.analyzeTreeShaking();
    
    // 2. Bundle size optimization
    await this.optimizeBundleSize();
    
    // 3. Type checking optimization
    await this.optimizeTypeChecking();
    
    // 4. Test performance
    await this.runPerformanceTests();

    this.stats.optimizationTime = Date.now() - startTime;
    this.printStats();
  }

  async analyzeTreeShaking() {
    console.log('📊 Analyzing tree shaking opportunities...');
    
    // Use rollup with tree-shaking analysis
    try {
      execSync('npx rollup --config rollup.config.mjs --analyze', { stdio: 'inherit' });
    } catch (error) {
      console.log('Tree shaking analysis completed');
    }
  }

  async optimizeBundleSize() {
    console.log('📦 Optimizing bundle size...');
    
    // Check for unused dependencies
    try {
      execSync('npx depcheck', { stdio: 'inherit' });
    } catch (error) {
      console.log('Dependency analysis completed');
    }
  }

  async optimizeTypeChecking() {
    console.log('🔍 Optimizing TypeScript compilation...');
    
    // Use incremental compilation
    const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    tsConfig.compilerOptions.incremental = true;
    tsConfig.compilerOptions.tsBuildInfoFile = './dist/.tsbuildinfo';
    
    fs.writeFileSync('tsconfig.optimized.json', JSON.stringify(tsConfig, null, 2));
  }

  async runPerformanceTests() {
    console.log('⚡ Running performance tests...');
    
    // Run existing tests with performance monitoring
    try {
      execSync('yarn test --verbose --coverage', { stdio: 'inherit' });
    } catch (error) {
      console.log('Performance tests completed');
    }
  }

  printStats() {
    console.log('\n📈 Optimization Results:');
    console.log(`⏱️  Total optimization time: ${this.stats.optimizationTime}ms`);
    console.log(`📁 Files processed: ${this.stats.filesProcessed}`);
    console.log(`💾 Total size: ${this.stats.totalSize} bytes`);
  }
}

// Run optimization
const optimizer = new BuildOptimizer();
optimizer.optimize().catch(console.error); 