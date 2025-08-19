#!/usr/bin/env node

import fs from 'node:fs';

/**
 * README badge verification script for npm package standards
 * Ensures all required badges are present in README.md
 */

const readme = fs.readFileSync('README.md', 'utf8');

const required = [
  'img.shields.io/npm/v/',
  'img.shields.io/npm/dm/',
  'github/actions/workflow/status',
  'img.shields.io/codecov',
  'img.shields.io/bundlephobia/minzip/',
  'img.shields.io/packagephobia/install/',
  'badge/types-included',
  'img.shields.io/npm/l/',
];

const missing = required.filter(s => !readme.includes(s));

if (missing.length) {
  console.error('❌ README badge check failed. Missing:', missing.join(', '));
  console.error('\nRequired badges:');
  required.forEach(badge => {
    const status = readme.includes(badge) ? '✅' : '❌';
    console.error(`  ${status} ${badge}`);
  });
  process.exit(1);
}

console.log('✅ README badge check passed. All required badges are present.');
console.log('\nFound badges:');
required.forEach(badge => {
  console.log(`  ✅ ${badge}`);
});
