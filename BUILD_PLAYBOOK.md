# Build Playbook — InterviewAce

A reproducible outline of how InterviewAce was built and shipped.

## 1. Idea
AI interview coach: turn any job title or job description into a tailored prep pack (questions,
model answers, points to hit, follow-ups, research areas). Chosen to be distinct from prior products
and to resonate with a developer/career audience.

## 2. Scaffold
React + Vite + Tailwind. Component-based, mobile-first, premium dark UI (indigo → violet gradient).
Route-level `React.lazy` + `Suspense`; Vite `manualChunks` splitting `react` and `firebase` vendors;
instant boot spinner in `index.html`.

## 3. Auth + data
Firebase Auth (Email/Password + Google) via the `firebase` npm package, wrapped in `AuthProvider`.
Per-user doc in `interviewace_users` (`{ email, plan, credits, createdAt }`) with decrease-only
Firestore rules. `firebaseReady` guard lets marketing pages render before config exists.

## 4. AI backend
`/api/generate` serverless function: verifies the Firebase ID token against Google JWKS
(issuer `securetoken.google.com/<projectId>`, audience `<projectId>`), rate-limits per instance,
validates/clamps input, then proxies to keyless Pollinations with a strict-JSON system prompt.
A tolerant extractor strips fences and parses the outermost JSON object.

## 5. Payments
Stripe Payment Links (live) for Pro and Team, monthly and yearly, wired into the pricing page via
env vars with public fallbacks and `?prefilled_email=`.

## 6. Deploy
Import the GitHub repo into Vercel (Git-linked), Production Branch `main`, Vite auto-detected,
env vars added before first build. Pushes to `main` auto-deploy to production.

## 7. Launch
Live testing (auth → generate → credit decrement), then a LinkedIn launch post and a portfolio card.

## Permanent rules
No secrets in source. All config via `VITE_*` env vars. `.env` git-ignored; `.env.example` ships empty.
Honest copy only; practice-guidance disclaimer included.
