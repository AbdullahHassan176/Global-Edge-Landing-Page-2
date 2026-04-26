# Global Edge Landing Page - AI Assistant Guide

## Project Overview

The Global Edge is building toward VARA-aligned issuance for real-world asset tokenization in the UAE—starting with Africa–UAE FMCG trade (one live cargo lane; first tokenization in prototype). Roadmap includes containers, property, and vault programs as the stack matures.

## Architecture & Key Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel-ready
- **Database**: Integration services for asset management
- **Authentication**: OAuth and custom auth services

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [route]/           # Route-specific pages
│   │   ├── page.tsx       # Page component
│   │   └── layout.tsx     # Route layout with metadata
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility libraries and services
│   ├── services/         # Business logic services
│   ├── integration/      # External API integrations
│   └── config/           # Configuration files
└── types/                # TypeScript type definitions
```

## Key Components & Relationships

- **Asset Management**: Tokenized real-world assets (containers, property, trade tokens, vault)
- **User Authentication**: Multi-role system (investors, issuers, admins)
- **Investment Flow**: KYC → Asset Selection → Investment → Portfolio Management
- **Compliance**: Design target is VARA-aligned distribution; do not claim approvals that are not in place

## Development Guidelines & Conventions

### SEO & Metadata Management

- **CRITICAL**: All pages must use Next.js App Router Metadata API
- **NEVER** use `<Head>` from `next/head` in page components
- **ALWAYS** implement `generateMetadata()` in layout.tsx files
- **JSON-LD** structured data goes in `other` field of metadata
- **Canonical URLs** must be set for all pages

### Code Standards

- Use TypeScript for all new code
- Follow existing naming conventions (camelCase for variables, PascalCase for components)
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Use semantic HTML elements

### Component Structure

- Keep components focused and single-purpose
- Use proper TypeScript interfaces
- Implement proper accessibility (ARIA labels, semantic HTML)
- Follow responsive design principles

## Environment Configuration

- Dev: mock data; prod: integrations. Secrets in `.env`. `/login` quick demo: local dev or `NEXT_PUBLIC_ENABLE_DEMO_LOGIN=true`; creds in `userAuthService` (`DEMO_QUICK_LOGIN`).
- **Azure Static Web Apps (hybrid Next.js)**: `output: 'standalone'` plus `postbuild` → `scripts/standalone-copy.cjs` (static + `public` into `.next/standalone`). CI uses the **Next.js preset**: `output_location: ''`, `skip_app_build: false` (Oryx runs `npm run build` in the deploy action). `src/app/.swa/health.html/route.ts` implements `/.swa/health.html`; `src/middleware.ts` matcher excludes `/.swa` per Microsoft Learn. **Do not** set `NODE_ENV=production` on the SWA deploy step: Oryx runs `npm install` first, and production installs omit devDependencies (TypeScript, Tailwind, husky), which breaks `prepare` and `next build`. **Node**: SWA only accepts **18, 20, or 22** after the Oryx build; pin with `package.json` `engines.node` (e.g. `20.x`), `.node-version`, and workflow `env.NODE_VERSION: '20'` so Oryx does not pick Node 24+.

## Error Handling Approach

- Graceful degradation for external service failures
- User-friendly error messages
- Avoid presenting mock or fallback metrics as live traction on user-facing surfaces
- Comprehensive logging for debugging

## Security Considerations

- VARA compliance requirements
- KYC/KYB verification processes
- Secure API endpoints
- Input validation and sanitization
- CORS and security headers

## Global Instructions for Code Consistency

- Prefer App Router `generateMetadata()` over `next/head` in new work; keep canonicals and OG tags accurate.
- Asset metrics: `assetIntegration` is source of truth; do not reintroduce fabricated AUM, counts, or APR fallbacks in `assetMetricsService`.
- UX: loading states, responsive layout, WCAG-minded semantics; optimize images with `next/image`.
- **UI**: See `UI_UX_DESIGN_SYSTEM.md` (cream / burgundy / emerald / gold). Tokens: `src/styles/design-tokens.css`, utilities in `globals.css` (`gradient-bg`, `liquid-metal-card`, `gc-metric-panel`, etc.); legacy Tailwind names map via `tailwind.config.js`.

## Public positioning (marketing copy)

- **Truth**: Early stage—Africa–UAE FMCG trade focus, one live cargo lane, first tokenization in prototype; VARA-aligned issuance is a **target**, not a claim of existing approval.
- **Never** on the public site: invented AUM, asset counts, partner bank/carrier marks without signed/public agreements, “thousands of investors,” or platform-wide performance stats before real offerings list.
- **Partners**: `src/lib/partnersData.ts` stays empty until real partners are added; home and `/partners` explain that policy.
- **Key routes**: `/how-it-works`, `/security`, and `/assets` (pages + `layout.tsx` metadata/JSON-LD where present) follow the same pilot-honesty bar as the home page.

## Notes for AI Assistants

- Read this file first; match existing patterns; keep diffs scoped to the task. Tests: unit/integration/E2E as appropriate for the change.
