import { Target, BookOpen } from 'lucide-react'
import QuestionCard from './QuestionCard.jsx'

export default function PrepResult({ data }) {
  if (!data) return null
  return (
    <div className="space-y-5">
      <div className="card p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-100 font-semibold text-lg">
            <Target className="w-5 h-5 text-brand-400" />
            {data.role || 'Your role'}
          </div>
          {data.level && (
            <span className="text-sm text-gray-400 px-2.5 py-1 rounded-full border border-white/10">
              {data.level}
            </span>
          )}
        </div>
        {data.summary && <p className="mt-3 text-gray-300 leading-relaxed">{data.summary}</p>}
      </div>

      <div className="space-y-3">
        {data.questions.map((q, i) => (
          <QuestionCard key={i} item={q} index={i} />
        ))}
      </div>

      {Array.isArray(data.researchAreas) && data.researchAreas.length > 0 && (
        <div className="card p-5">
          <p className="font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent-400" /> Brush up before the interview
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.researchAreas.map((r, i) => (
              <span key={i} className="text-sm text-gray-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
