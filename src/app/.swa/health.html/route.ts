import { NextResponse } from 'next/server';

/**
 * Azure Static Web Apps deployment validation fetches `/.swa/health.html`.
 * @see https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid
 */
export function GET() {
  return new NextResponse('<!doctype html><html><body>ok</body></html>', {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
