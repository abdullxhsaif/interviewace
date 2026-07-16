import { useState } from 'react'
import { ChevronDown, Lightbulb, CornerDownRight, CircleDot } from 'lucide-react'
import CategoryBadge from './CategoryBadge.jsx'

export default function QuestionCard({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 w-7 h-7 shrink-0 rounded-lg bg-brand-500/15 text-brand-300 text-sm font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <h4 className="font-semibold text-white leading-snug">{item.question}</h4>
        </div>
        <CategoryBadge category={item.category} />
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 ml-10 inline-flex items-center gap-1.5 text-sm text-brand-300 hover:text-brand-200"
        aria-expanded={open}
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        {open ? 'Hide model answer' : 'Show model answer'}
      </button>

      {open && (
        <div className="mt-3 ml-10 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-accent-400" /> Model answer
            </p>
            <p className="text-gray-300 leading-relaxed">{item.modelAnswer}</p>
          </div>

          {Array.isArray(item.keyPoints) && item.keyPoints.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Points to hit</p>
              <ul className="space-y-1.5">
                {item.keyPoints.map((k, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CircleDot className="w-3.5 h-3.5 mt-0.5 text-brand-400 shrink-0" /> {k}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.followUp && (
            <p className="flex gap-2 text-sm text-gray-400 italic">
              <CornerDownRight className="w-4 h-4 shrink-0 mt-0.5 text-accent-400" />
              Likely follow-up: {item.followUp}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
