#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all page.tsx files with Head imports
function getPagesWithHead() {
  try {
    const result = execSync(
      'grep -r "import.*Head.*from.*next/head" src/app --include="page.tsx" -l',
      { encoding: 'utf8' }
    );
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.log('No more pages with Head imports found');
    return [];
  }
}

// Remove Head block from page.tsx
function removeHeadFromPage(pagePath) {
  console.log(`Removing Head from ${pagePath}...`);

  let content = fs.readFileSync(pagePath, 'utf8');

  // Remove Head import
  content = content.replace(/import Head from 'next\/head';\n?/g, '');

  // Remove Head block (including the opening and closing tags and everything in between)
  content = content.replace(/<Head>[\s\S]*?<\/Head>\s*/g, '');

  fs.writeFileSync(pagePath, content);
  console.log(`Updated ${pagePath}`);
}

// Main function
function main() {
  const pages = getPagesWithHead();

  if (pages.length === 0) {
    console.log('No pages with Head imports found. All Head blocks removed!');
    return;
  }

  console.log(`Found ${pages.length} pages with Head imports:`);
  pages.forEach(page => console.log(`  - ${page}`));

  pages.forEach(removeHeadFromPage);

  console.log('\nHead removal complete!');
  console.log('Remaining pages with Head imports:');
  const remaining = getPagesWithHead();
  if (remaining.length > 0) {
    remaining.forEach(page => console.log(`  - ${page}`));
  } else {
    console.log('  None! All Head blocks have been removed.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { removeHeadFromPage };
