'use strict';

/**
 * After `next build` with `output: 'standalone'`, copy traced static assets
 * and `public/` into `.next/standalone` (required for Azure Static Web Apps
 * hybrid Next.js when using skip_app_build).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const standalone = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standalone)) {
  console.warn(
    '[standalone-copy] .next/standalone not found — enable output: "standalone" in next.config.js',
  );
  process.exit(0);
}

function copyRecursiveSync(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

const staticSrc = path.join(root, '.next', 'static');
const staticDest = path.join(standalone, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  copyRecursiveSync(staticSrc, staticDest);
  console.log('[standalone-copy] .next/static → .next/standalone/.next/static');
}

const publicSrc = path.join(root, 'public');
const publicDest = path.join(standalone, 'public');
if (fs.existsSync(publicSrc)) {
  copyRecursiveSync(publicSrc, publicDest);
  console.log('[standalone-copy] public → .next/standalone/public');
}
