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

// Extract metadata from Head block
function extractMetadata(content) {
  const headMatch = content.match(/<Head>([\s\S]*?)<\/Head>/);
  if (!headMatch) return null;

  const headContent = headMatch[1];
  const metadata = {};

  // Extract title
  const titleMatch = headContent.match(/<title>(.*?)<\/title>/);
  if (titleMatch) metadata.title = titleMatch[1];

  // Extract description
  const descMatch = headContent.match(
    /<meta name="description" content="(.*?)" \/>/
  );
  if (descMatch) metadata.description = descMatch[1];

  // Extract keywords
  const keywordsMatch = headContent.match(
    /<meta name="keywords" content="(.*?)" \/>/
  );
  if (keywordsMatch) metadata.keywords = keywordsMatch[1];

  // Extract canonical
  const canonicalMatch = headContent.match(
    /<link rel="canonical" href="(.*?)" \/>/
  );
  if (canonicalMatch) metadata.canonical = canonicalMatch[1];

  // Extract Open Graph
  const ogTitleMatch = headContent.match(
    /<meta property="og:title" content="(.*?)" \/>/
  );
  const ogDescMatch = headContent.match(
    /<meta property="og:description" content="(.*?)" \/>/
  );
  const ogUrlMatch = headContent.match(
    /<meta property="og:url" content="(.*?)" \/>/
  );
  const ogImageMatch = headContent.match(
    /<meta property="og:image" content="(.*?)" \/>/
  );

  if (ogTitleMatch || ogDescMatch || ogUrlMatch || ogImageMatch) {
    metadata.openGraph = {};
    if (ogTitleMatch) metadata.openGraph.title = ogTitleMatch[1];
    if (ogDescMatch) metadata.openGraph.description = ogDescMatch[1];
    if (ogUrlMatch) metadata.openGraph.url = ogUrlMatch[1];
    if (ogImageMatch) metadata.openGraph.image = ogImageMatch[1];
    metadata.openGraph.type = 'website';
  }

  // Extract Twitter
  const twitterTitleMatch = headContent.match(
    /<meta name="twitter:title" content="(.*?)" \/>/
  );
  const twitterDescMatch = headContent.match(
    /<meta name="twitter:description" content="(.*?)" \/>/
  );
  const twitterImageMatch = headContent.match(
    /<meta name="twitter:image" content="(.*?)" \/>/
  );

  if (twitterTitleMatch || twitterDescMatch || twitterImageMatch) {
    metadata.twitter = {};
    if (twitterTitleMatch) metadata.twitter.title = twitterTitleMatch[1];
    if (twitterDescMatch) metadata.twitter.description = twitterDescMatch[1];
    if (twitterImageMatch) metadata.twitter.image = twitterImageMatch[1];
    metadata.twitter.card = 'summary_large_image';
  }

  // Extract JSON-LD
  const jsonLdMatch = headContent.match(
    /<script[\s\S]*?type="application\/ld\+json"[\s\S]*?dangerouslySetInnerHTML={{\s*__html: JSON\.stringify\(([\s\S]*?)\)\s*}}[\s\S]*?\/>/
  );
  if (jsonLdMatch) {
    try {
      metadata.jsonLd = JSON.parse(jsonLdMatch[1]);
    } catch (e) {
      console.warn('Failed to parse JSON-LD:', e.message);
    }
  }

  return metadata;
}

// Generate layout.tsx content
function generateLayoutContent(metadata, route) {
  const routeName = route.split('/').pop() || 'page';
  const capitalizedRoute =
    routeName.charAt(0).toUpperCase() + routeName.slice(1);

  let layoutContent = `import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/lib/dynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = await generateDynamicMetadata({ path: '${route}' });
  
  return {
    ...baseMeta,`;

  if (metadata.title) {
    layoutContent += `
    title: '${metadata.title}',`;
  }

  if (metadata.description) {
    layoutContent += `
    description: '${metadata.description}',`;
  }

  if (metadata.keywords) {
    layoutContent += `
    keywords: '${metadata.keywords}',`;
  }

  layoutContent += `
    robots: 'index, follow',`;

  if (metadata.canonical) {
    layoutContent += `
    alternates: {
      canonical: '${metadata.canonical}'
    },`;
  }

  if (metadata.openGraph) {
    layoutContent += `
    openGraph: {
      ...baseMeta.openGraph,`;
    if (metadata.openGraph.title)
      layoutContent += `
      title: '${metadata.openGraph.title}',`;
    if (metadata.openGraph.description)
      layoutContent += `
      description: '${metadata.openGraph.description}',`;
    if (metadata.openGraph.url)
      layoutContent += `
      url: '${metadata.openGraph.url}',`;
    if (metadata.openGraph.type)
      layoutContent += `
      type: '${metadata.openGraph.type}'`;
    layoutContent += `
    },`;
  }

  if (metadata.twitter) {
    layoutContent += `
    twitter: {
      ...baseMeta.twitter,`;
    if (metadata.twitter.title)
      layoutContent += `
      title: '${metadata.twitter.title}',`;
    if (metadata.twitter.description)
      layoutContent += `
      description: '${metadata.twitter.description}',`;
    if (metadata.twitter.card)
      layoutContent += `
      card: '${metadata.twitter.card}'`;
    layoutContent += `
    },`;
  }

  if (metadata.jsonLd) {
    layoutContent += `
    other: {
      ...baseMeta.other,
      'script:type:application/ld+json': JSON.stringify(${JSON.stringify(metadata.jsonLd, null, 6)})
    }`;
  }

  layoutContent += `
  };
}

export default function ${capitalizedRoute}Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;

  return layoutContent;
}

// Remove Head block from page.tsx
function removeHeadFromPage(content) {
  // Remove Head import
  content = content.replace(/import Head from 'next\/head';\n?/g, '');

  // Remove Head block
  content = content.replace(/<Head>[\s\S]*?<\/Head>\s*/g, '');

  return content;
}

// Main migration function
function migratePage(pagePath) {
  console.log(`Migrating ${pagePath}...`);

  const content = fs.readFileSync(pagePath, 'utf8');
  const metadata = extractMetadata(content);

  if (!metadata) {
    console.log(`No Head block found in ${pagePath}`);
    return;
  }

  // Determine route from file path
  const route = pagePath.replace('src/app/', '').replace('/page.tsx', '');

  // Create or update layout.tsx
  const layoutPath = path.join(path.dirname(pagePath), 'layout.tsx');
  const layoutContent = generateLayoutContent(metadata, route);
  fs.writeFileSync(layoutPath, layoutContent);
  console.log(`Created/updated ${layoutPath}`);

  // Remove Head from page.tsx
  const updatedPageContent = removeHeadFromPage(content);
  fs.writeFileSync(pagePath, updatedPageContent);
  console.log(`Updated ${pagePath}`);
}

// Run migration
function main() {
  const pages = getPagesWithHead();

  if (pages.length === 0) {
    console.log('No pages with Head imports found. Migration complete!');
    return;
  }

  console.log(`Found ${pages.length} pages to migrate:`);
  pages.forEach(page => console.log(`  - ${page}`));

  pages.forEach(migratePage);

  console.log('\nMigration complete!');
  console.log('Remaining pages with Head imports:');
  const remaining = getPagesWithHead();
  if (remaining.length > 0) {
    remaining.forEach(page => console.log(`  - ${page}`));
  } else {
    console.log('  None!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { migratePage, extractMetadata, generateLayoutContent };
