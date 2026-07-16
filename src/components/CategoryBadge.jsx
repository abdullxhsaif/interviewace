import { MessageSquare, Code2, Briefcase, Users } from 'lucide-react'

const MAP = {
  behavioral: { label: 'Behavioral', cls: 'bg-accent-500/15 text-accent-400 border-accent-500/30', Icon: MessageSquare },
  technical: { label: 'Technical', cls: 'bg-brand-500/15 text-brand-300 border-brand-500/30', Icon: Code2 },
  'role-specific': { label: 'Role-specific', cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30', Icon: Briefcase },
  culture: { label: 'Culture fit', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30', Icon: Users },
}

export default function CategoryBadge({ category }) {
  const { label, cls, Icon } = MAP[category] || MAP['role-specific']
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cls}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </span>
  )
}
