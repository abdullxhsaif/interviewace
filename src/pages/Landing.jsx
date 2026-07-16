import { Link } from 'react-router-dom'
import {
  Mic, Zap, Target, MessagesSquare, ClipboardCheck, Rocket, ArrowRight, Sparkles,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const features = [
  { Icon: Target, title: 'Tailored to the role', body: 'Paste a title or full job description and get questions matched to the exact role and seniority.' },
  { Icon: MessagesSquare, title: 'Model answers', body: 'Every question comes with a strong sample answer — STAR-structured for behavioral rounds.' },
  { Icon: ClipboardCheck, title: 'Points to hit', body: 'Bullet-point talking points and a likely follow-up so nothing catches you off guard.' },
  { Icon: Rocket, title: 'Prep in seconds', body: 'No sign-up friction. Generate a full prep pack and start rehearsing right away.' },
]

const steps = [
  { n: '1', title: 'Drop in the role', body: 'A job title like "Frontend Engineer" or a whole job description — both work.' },
  { n: '2', title: 'AI builds your pack', body: 'InterviewAce writes tailored questions, model answers, and follow-ups.' },
  { n: '3', title: 'Rehearse and walk in ready', body: 'Practice out loud, review the talking points, and study the research areas.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 pt-20 pb-16 text-center relative">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs text-brand-300 mb-6">
            <Zap className="w-3.5 h-3.5" /> Your AI interview coach
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            Walk into any interview <br className="hidden sm:block" />
            <span className="gradient-text">already ready</span>.
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            InterviewAce turns any job title or description into a tailored prep pack — realistic
            questions, model answers, the points to hit, and the follow-ups they'll ask.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold hover:opacity-90 transition">
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-gray-200 hover:bg-white/5 transition">
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">5 free prep packs · no card required</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ Icon, title, body }) => (
          <div key={title} className="card p-6">
            <span className="w-11 h-11 rounded-xl bg-brand-500/15 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-brand-400" />
            </span>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold flex items-center justify-center gap-2">
            <Sparkles className="w-7 h-7 text-accent-400" /> How it works
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white font-bold flex items-center justify-center mb-4">{s.n}</div>
              <h3 className="font-semibold text-white text-lg">{s.title}</h3>
              <p className="mt-2 text-gray-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-10 w-full">
        <div className="card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/10 pointer-events-none" />
          <Mic className="w-10 h-10 text-brand-400 mx-auto mb-4 relative" />
          <h2 className="text-2xl sm:text-3xl font-extrabold relative">Stop winging your interviews</h2>
          <p className="mt-3 text-gray-300 relative">Your first five prep packs are on us.</p>
          <Link to="/login" className="relative inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold hover:opacity-90 transition">
            Build my prep pack <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
