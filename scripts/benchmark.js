#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

class PerformanceBenchmark {
  constructor() {
    this.results = {
      fileReading: [],
      exportParsing: [],
      pathCollection: [],
      memoryUsage: []
    };
  }

  async runBenchmarks() {
    console.log('🏃‍♂️ Running performance benchmarks...\n');

    // Benchmark file reading
    await this.benchmarkFileReading();
    
    // Benchmark export parsing
    await this.benchmarkExportParsing();
    
    // Benchmark path collection
    await this.benchmarkPathCollection();
    
    // Memory usage analysis
    this.analyzeMemoryUsage();
    
    this.printResults();
  }

  async benchmarkFileReading() {
    console.log('📖 Benchmarking file reading...');
    
    const testFiles = [
      'src/features/auto-exporter.ts',
      'src/export-related/generate-exports-from-dir.ts',
      'src/features/collect-paths/collect-paths.ts'
    ];

    for (const file of testFiles) {
      if (fs.existsSync(file)) {
        const start = performance.now();
        const content = fs.readFileSync(file, 'utf8');
        const end = performance.now();
        
        this.results.fileReading.push({
          file,
          size: content.length,
          time: end - start
        });
      }
    }
  }

  async benchmarkExportParsing() {
    console.log('🔍 Benchmarking export parsing...');
    
    const testContent = `
      export function testFunction() {}
      export const testConst = 'test';
      export default class TestClass {}
      export type TestType = string;
      export interface TestInterface {}
    `;

    const iterations = 1000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      this.parseExports(testContent);
    }
    
    const end = performance.now();
    
    this.results.exportParsing.push({
      iterations,
      totalTime: end - start,
      averageTime: (end - start) / iterations
    });
  }

  async benchmarkPathCollection() {
    console.log('📁 Benchmarking path collection...');
    
    const testDir = 'src';
    const start = performance.now();
    
    const paths = this.collectPaths(testDir, ['.ts', '.tsx']);
    
    const end = performance.now();
    
    this.results.pathCollection.push({
      directory: testDir,
      filesFound: paths.length,
      time: end - start
    });
  }

  parseExports(content) {
    const exports = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.includes('export')) {
        const match = line.match(/export\s+(?:default\s+)?(?:function|const|let|var|class|interface|type|enum)\s+(\w+)/);
        if (match) {
          exports.push(match[1]);
        }
      }
    }
    
    return exports;
  }

  collectPaths(dir, extensions) {
    const paths = [];
    
    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const fullPath = path.join(currentDir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            traverse(fullPath);
          } else if (stat.isFile()) {
            const ext = path.extname(fullPath);
            if (extensions.includes(ext)) {
              paths.push(fullPath);
            }
          }
        }
      } catch (error) {
        // Ignore permission errors
      }
    }
    
    traverse(dir);
    return paths;
  }

  analyzeMemoryUsage() {
    const memUsage = process.memoryUsage();
    
    this.results.memoryUsage.push({
      rss: memUsage.rss,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external
    });
  }

  printResults() {
    console.log('\n📊 Benchmark Results:\n');
    
    // File reading results
    console.log('📖 File Reading Performance:');
    this.results.fileReading.forEach(result => {
      console.log(`  ${result.file}: ${result.time.toFixed(2)}ms (${result.size} bytes)`);
    });
    
    // Export parsing results
    console.log('\n🔍 Export Parsing Performance:');
    this.results.exportParsing.forEach(result => {
      console.log(`  ${result.iterations} iterations: ${result.totalTime.toFixed(2)}ms total, ${result.averageTime.toFixed(4)}ms average`);
    });
    
    // Path collection results
    console.log('\n📁 Path Collection Performance:');
    this.results.pathCollection.forEach(result => {
      console.log(`  ${result.directory}: ${result.time.toFixed(2)}ms (${result.filesFound} files)`);
    });
    
    // Memory usage
    console.log('\n💾 Memory Usage:');
    this.results.memoryUsage.forEach(result => {
      console.log(`  RSS: ${(result.rss / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  Heap Used: ${(result.heapUsed / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  Heap Total: ${(result.heapTotal / 1024 / 1024).toFixed(2)}MB`);
    });
  }
}

// Run benchmarks
const benchmark = new PerformanceBenchmark();
benchmark.runBenchmarks().catch(console.error); 