import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Sparkles, Loader2, RotateCcw, AlertTriangle, Info } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import PrepResult from '../components/PrepResult.jsx'
import ResultSkeleton from '../components/ResultSkeleton.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { auth } from '../lib/firebase.js'

const LEVELS = ['Entry-level', 'Mid-level', 'Senior', 'Lead / Manager']

const SAMPLE = `Frontend Engineer (React) at a Series A fintech startup. We're looking for someone with 3+ years building production React apps, strong JavaScript fundamentals, experience with state management and REST APIs, an eye for UI detail, and the ability to work closely with designers and ship fast in a small team.`

export default function Dashboard() {
  const { profile, decrementCredit } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [text, setText] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const credits = profile?.credits ?? 0
  const noCredits = credits <= 0

  const generate = async () => {
    setError('')
    if (text.trim().length < 3) { setError('Please enter a job title or paste a job description.'); return }
    if (noCredits) { setError('You’re out of credits. Upgrade to keep prepping.'); return }
    const currentUser = auth?.currentUser
    if (!currentUser) { setError('Your session has expired — please sign in again.'); return }
    setLoading(true)
    setResult(null)
    try {
      const payload = level ? `Seniority: ${level}\n\nRole / Job description:\n${text}` : text
      const callApi = async (forceRefresh) => {
        const token = await currentUser.getIdToken(forceRefresh)
        return fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ text: payload }),
        })
      }
      // A cached ID token can be briefly stale; if the server rejects it,
      // force a refresh and retry once before surfacing an auth error.
      let res = await callApi(false)
      if (res.status === 401) res = await callApi(true)
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data)
      await decrementCredit()
    } catch (e) {
      setError(e.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setText(''); setLevel(''); setResult(null); setError('') }

  return (
    <div className="min-h-screen flex bg-[#0a0b1a]">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between px-5 h-16 border-b border-white/10 sticky top-0 bg-[#0a0b1a] z-30">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu className="w-6 h-6" /></button>
          <span className="font-bold">Prep Studio</span>
          <span className="text-sm text-brand-300 font-semibold">{credits} left</span>
        </div>

        <div className="max-w-3xl mx-auto px-5 py-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-brand-400" />
            <h1 className="text-2xl font-extrabold">Build a prep pack</h1>
          </div>
          <p className="text-gray-400 mb-6">Enter a job title or paste the full job description. InterviewAce does the rest.</p>

          <div className="card p-5">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Senior Product Manager — or paste the whole job description…"
              rows={7}
              className="w-full resize-y rounded-lg bg-white/5 border border-white/10 p-4 text-gray-100 placeholder-gray-500 focus:border-brand-400 outline-none leading-relaxed"
            />
            <div className="mt-3">
              <label className="block text-xs text-gray-400 mb-1.5">Target seniority (optional)</label>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(level === l ? '' : l)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition ${level === l ? 'bg-brand-500/20 border-brand-500/50 text-brand-200' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}
                  >{l}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
              <div className="flex gap-2 text-sm">
                <button onClick={() => setText(SAMPLE)} className="text-brand-300 hover:text-brand-200">Try a sample</button>
                <span className="text-gray-600">·</span>
                <button onClick={reset} className="text-gray-400 hover:text-white inline-flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> Clear</button>
              </div>
              <button
                onClick={generate}
                disabled={loading || noCredits}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Building…' : 'Generate prep pack'}
              </button>
            </div>
          </div>

          {noCredits && (
            <div className="mt-4 card p-4 flex items-start gap-3 border-amber-500/30">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">You’re out of credits. <Link to="/pricing" className="text-brand-300 font-semibold">Upgrade your plan</Link> to keep prepping.</p>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-8">
            {loading && <ResultSkeleton />}
            {!loading && result && <PrepResult data={result} />}
            {!loading && !result && !error && (
              <div className="text-center text-gray-500 py-12">
                <Info className="w-8 h-8 mx-auto mb-3 opacity-60" />
                Your tailored questions will appear here.
              </div>
            )}
          </div>

          <p className="mt-10 text-xs text-gray-600 text-center">
            InterviewAce offers practice guidance only and does not guarantee any hiring outcome.
          </p>
        </div>
      </main>
    </div>
  )
}
