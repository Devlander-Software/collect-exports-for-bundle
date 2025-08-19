#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Optimize TypeDoc generated documentation for SEO
 */
function optimizeDocs() {
  console.log('🔍 Optimizing documentation for SEO...');
  
  const docsDir = path.join(process.cwd(), 'docs');
  
  if (!fs.existsSync(docsDir)) {
    console.error('❌ Docs directory not found. Run "npm run docs" first.');
    process.exit(1);
  }
  
  // Add SEO meta tags and structured data to HTML files
  optimizeHtmlFiles(docsDir);
  
  // Create sitemap
  createSitemap(docsDir);
  
  // Create robots.txt
  createRobotsTxt(docsDir);
  
  console.log('✅ Documentation optimization complete!');
}

function optimizeHtmlFiles(docsDir) {
  const htmlFiles = findHtmlFiles(docsDir);
  
  htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add SEO meta tags
    content = addSeoMetaTags(content, filePath);
    
    // Add structured data
    content = addStructuredData(content, filePath);
    
    // Add accessibility improvements
    content = addAccessibilityFeatures(content);
    
    fs.writeFileSync(filePath, content);
  });
  
  console.log(`📄 Optimized ${htmlFiles.length} HTML files`);
}

function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

function addSeoMetaTags(content, filePath) {
  const fileName = path.basename(filePath, '.html');
  const title = getPageTitle(fileName);
  
  const metaTags = `
    <meta name="description" content="${title} - Comprehensive TypeScript/JavaScript export generation tool with Rollup compatibility">
    <meta name="keywords" content="typescript, javascript, exports, rollup, webpack, bundler, auto-export, barrel-exports, module-exports">
    <meta name="author" content="DevLander">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="Comprehensive TypeScript/JavaScript export generation tool with Rollup compatibility">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://github.com/devlander/collect-exports-for-bundle">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="Comprehensive TypeScript/JavaScript export generation tool with Rollup compatibility">
    <meta name="canonical" href="https://github.com/devlander/collect-exports-for-bundle">
  `;
  
  // Insert meta tags after the opening head tag
  return content.replace(/<head>/i, `<head>${metaTags}`);
}

function addStructuredData(content, filePath) {
  const fileName = path.basename(filePath, '.html');
  const title = getPageTitle(fileName);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Collect Exports for Bundle",
    "description": "Generate comprehensive export files for TypeScript/JavaScript projects with Rollup compatibility",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "programmingLanguage": "TypeScript",
    "author": {
      "@type": "Organization",
      "name": "DevLander"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  
  const scriptTag = `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
  
  // Insert structured data before closing head tag
  return content.replace(/<\/head>/i, `${scriptTag}</head>`);
}

function addAccessibilityFeatures(content) {
  // Add skip to content link
  const skipLink = '<a href="#main-content" class="skip-link">Skip to main content</a>';
  
  // Add main content landmark
  content = content.replace(/<body>/i, `<body>${skipLink}`);
  content = content.replace(/<main>/i, '<main id="main-content" role="main">');
  
  // Add ARIA labels to navigation
  content = content.replace(/<nav>/g, '<nav role="navigation" aria-label="Main navigation">');
  
  return content;
}

function getPageTitle(fileName) {
  if (fileName === 'index') return 'Collect Exports for Bundle';
  if (fileName === 'modules') return 'API Modules';
  if (fileName === 'interfaces') return 'TypeScript Interfaces';
  if (fileName === 'types') return 'Type Definitions';
  if (fileName === 'functions') return 'Functions';
  
  // Convert kebab-case to Title Case
  return fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createSitemap(docsDir) {
  const htmlFiles = findHtmlFiles(docsDir);
  const baseUrl = 'https://github.com/devlander/collect-exports-for-bundle';
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  htmlFiles.forEach(filePath => {
    const relativePath = path.relative(docsDir, filePath);
    const url = `${baseUrl}/docs/${relativePath}`;
    const lastmod = new Date().toISOString().split('T')[0];
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n`;
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(docsDir, 'sitemap.xml'), sitemap);
  console.log('🗺️  Created sitemap.xml');
}

function createRobotsTxt(docsDir) {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://github.com/devlander/collect-exports-for-bundle/docs/sitemap.xml

# Allow crawling of documentation
Allow: /docs/
Allow: /docs/**/*.html

# Disallow crawling of source files
Disallow: /src/
Disallow: /node_modules/
Disallow: /__tests__/
`;
  
  fs.writeFileSync(path.join(docsDir, 'robots.txt'), robotsTxt);
  console.log('🤖 Created robots.txt');
}

// Run optimization if called directly
if (require.main === module) {
  optimizeDocs();
}

module.exports = { optimizeDocs };
