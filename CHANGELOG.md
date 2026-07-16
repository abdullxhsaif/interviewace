# Changelog

All notable changes to InterviewAce are documented here.

## [1.0.0] — 2026-07-16

### Added
- Initial public release.
- AI prep-pack generator: tailored interview questions with model answers, key points, and follow-ups.
- Optional target-seniority selection (Entry / Mid / Senior / Lead).
- Research-areas study list per role.
- Firebase Auth (Email/Password + Google) with per-user credit tracking in the
  `interviewace_users` Firestore collection (decrease-only rules).
- Serverless `/api/generate` with Google-JWKS ID-token verification, rate limiting, and input validation.
- Stripe Payment Links for Pro and Team plans (monthly + yearly) with a pricing toggle.
- Premium dark UI: indigo/violet gradient branding, sidebar dashboard, skeleton loaders, instant boot spinner.
- SEO: unique metadata, Open Graph, Twitter Card, favicon, robots.txt, sitemap.xml.
