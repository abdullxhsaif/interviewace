# InterviewAce — AI Interview Prep

**Live:** https://interviewace-lyart.vercel.app

InterviewAce is your AI interview coach. Paste a job title or a full job description and it
generates a tailored prep pack: realistic interview questions, strong model answers (STAR-structured
for behavioral rounds), the key points to hit, likely follow-ups, and the topics to review before
you walk in.

## Features

- **Role-tailored questions** — matched to the exact title and seniority you give it.
- **Model answers** — a strong sample answer for every question.
- **Points to hit + follow-ups** — bullet talking points and the follow-up the interviewer is likely to ask.
- **Research areas** — a short study list to brush up before the interview.
- **Free to start** — 5 prep packs, no card required. Email/password + Google sign-in.

## Stack

React + Vite + Tailwind CSS · Firebase (Auth + Firestore) · Vercel serverless (`/api/generate`)
· keyless AI via Pollinations · Stripe Payment Links.

## Architecture

```
React SPA (Vite): Landing / Pricing / Login / Dashboard, AuthContext
  |  Firebase Auth + Firestore  (interviewace_users/{uid}: {plan, credits})
  |  fetch /api/generate with Bearer ID token
  v
Vercel serverless fn: 1) verify ID token via Google JWKS  2) call Pollinations  3) return prep JSON
  v
Pollinations AI (keyless)
```

The serverless function verifies each Firebase ID token against Google's public JWKS (no service
account needed), applies per-instance rate limiting, validates input, then proxies to Pollinations
with a system prompt that forces strict JSON output.

## Environment variables

All config is read from environment variables — no secrets are committed. Copy `.env.example` to
`.env` and fill in values (Firebase web config is public but still kept out of source).

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase web API key (public) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project id (also used server-side for token audience/issuer) |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id |
| `VITE_FIREBASE_APP_ID` | Firebase app id |
| `VITE_STRIPE_PRICE_PRO_MONTHLY` | Stripe Payment Link — Pro monthly |
| `VITE_STRIPE_PRICE_PRO_YEARLY` | Stripe Payment Link — Pro yearly |
| `VITE_STRIPE_PRICE_TEAM_MONTHLY` | Stripe Payment Link — Team monthly |
| `VITE_STRIPE_PRICE_TEAM_YEARLY` | Stripe Payment Link — Team yearly |

## Run locally

```bash
npm install
cp .env.example .env   # fill in your Firebase + Stripe values
npm run dev
```

Build for production with `npm run build` (output in `dist/`).

## Plans

| Plan | Price | Prep packs |
| --- | --- | --- |
| Free | $0 | 5 (one-time) |
| Pro | $15/mo or $144/yr | 150 / month |
| Team | $49/mo or $468/yr | 600 / month |

## Roadmap

- Saved prep-pack history with re-generation
- Voice practice mode with spoken answers
- Company-specific research from a pasted company profile
- Exportable PDF study sheet

## Disclaimer

InterviewAce provides interview practice guidance only. It does not guarantee any hiring outcome and
is not professional career or recruitment advice.
