import { jwtVerify, createRemoteJWKSet } from 'jose'

// Verify Firebase ID tokens against Google's public JWKS — no service account needed.
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID

// simple in-memory rate limiter (per warm instance)
const hits = new Map()
function rateLimited(uid) {
  const now = Date.now()
  const windowMs = 60_000
  const max = 12
  const arr = (hits.get(uid) || []).filter((t) => now - t < windowMs)
  arr.push(now)
  hits.set(uid, arr)
  return arr.length > max
}

const SYSTEM_PROMPT = `You are InterviewAce, an expert interview coach and hiring manager.
Given a job title or full job description (and optional seniority) the user provides, produce a tailored interview-prep pack.
Return ONLY valid JSON (no markdown fences) with this exact shape:
{
  "role": "normalized job title",
  "level": "inferred seniority (e.g. 'Entry-level', 'Mid-level', 'Senior')",
  "summary": "2-3 sentence overview of what this interview will likely focus on",
  "questions": [
    {
      "category": "behavioral" | "technical" | "role-specific" | "culture",
      "question": "a realistic interview question for this role",
      "modelAnswer": "a strong, concrete sample answer; use the STAR structure for behavioral questions",
      "keyPoints": ["short bullet the candidate should hit", "another"],
      "followUp": "a likely follow-up question the interviewer may ask"
    }
  ],
  "researchAreas": ["specific topic or skill to review before the interview", "another"]
}
Generate 6-9 questions with a realistic mix of categories for this role. Be specific to the role and level, practical, and encouraging. If the input is not a job/role, set role to "General" and still return useful general interview questions.`

async function callPollinations(userPrompt, apiKey) {
  const body = {
    model: 'openai',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  }
  const headers = { 'Content-Type': 'application/json' }
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`
  const res = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (res.ok) {
    const data = await res.json()
    return data?.choices?.[0]?.message?.content || ''
  }
  // fallback to GET endpoint
  const enc = encodeURIComponent(`${SYSTEM_PROMPT}\n\nROLE / JOB DESCRIPTION:\n${userPrompt}`)
  const res2 = await fetch(`https://text.pollinations.ai/${enc}?model=openai`)
  return res2.ok ? await res2.text() : ''
}

function extractJson(text) {
  if (!text) return null
  let t = text.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim()
  const start = t.indexOf('{')
  const end = t.lastIndexOf('}')
  if (start === -1 || end === -1) return null
  try {
    return JSON.parse(t.slice(start, end + 1))
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const auth = req.headers['authorization'] || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
    if (!token) {
      res.status(401).json({ error: 'Missing auth token' })
      return
    }
    let uid
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: `https://securetoken.google.com/${PROJECT_ID}`,
        audience: PROJECT_ID,
      })
      uid = payload.sub
    } catch {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
    if (rateLimited(uid)) {
      res.status(429).json({ error: 'Too many requests. Slow down a moment.' })
      return
    }

    const { text } = req.body || {}
    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      res.status(400).json({ error: 'Please enter a job title or paste a job description.' })
      return
    }
    const clipped = text.slice(0, 16000)
    const userKey = req.headers['x-user-ai-key'] || undefined

    const raw = await callPollinations(clipped, userKey)
    const parsed = extractJson(raw)
    if (!parsed || !Array.isArray(parsed.questions)) {
      res.status(502).json({ error: 'The coach returned an unexpected response. Please try again.' })
      return
    }
    res.status(200).json(parsed)
  } catch (e) {
    res.status(500).json({ error: 'Server error generating your prep pack.' })
  }
}
