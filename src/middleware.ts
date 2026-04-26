import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Azure Static Web Apps probes `/.swa/health.html` during deploy.
 * Exclude `.swa` so future middleware logic never blocks that path.
 * @see https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!\\.swa).*)'],
};
