# Architecture — InterviewAce

## Overview

InterviewAce is a single-page React app with a thin serverless backend. There is no persistent
server; all user state lives in Firebase, and AI runs through a stateless Vercel function.

## Diagram

```
React SPA (Vite): Landing / Pricing / Login / Dashboard, AuthContext
  |  Firebase Auth + Firestore  (interviewace_users/{uid}: {plan, credits})
  |  fetch /api/generate with Bearer ID token
  v
Vercel serverless fn: 1) verify token via Google JWKS  2) call Pollinations  3) return prep JSON
  v
Pollinations AI (keyless)
```

## Components

- **AuthContext** — exposes `user`, `profile`, and auth actions; provisions the Firestore user doc on
  first sign-in with 5 free credits; exposes `decrementCredit`.
- **Sidebar** — drives desktop sidebar and mobile drawer; AI-credits progress + upgrade CTA.
- **PrepResult / QuestionCard / CategoryBadge / ResultSkeleton** — render the structured prep pack and
  loading state. Each question card collapses its model answer, key points, and follow-up.

## Data model

`interviewace_users/{uid}`: `{ email, plan: 'free'|'pro'|'team', credits, createdAt }`

## Security

- **Token verification:** `/api/generate` verifies the Firebase ID token against Google's public JWKS
  (issuer `securetoken.google.com/<projectId>`, audience `<projectId>`). No service-account secret.
- **Firestore rules:** user reads/creates only their own doc; updates allowed only when `plan`
  unchanged and `credits` do not increase; deletes disabled.
- **Rate limiting:** per-instance sliding window on the serverless function.
- **Input validation:** min length + 16k char clamp server-side; client-side guard.

## Performance

- Route-level `React.lazy` + `Suspense`.
- `manualChunks` splitting `firebase` and `react` vendor chunks.
- Instant boot spinner in `index.html` before hydration.
