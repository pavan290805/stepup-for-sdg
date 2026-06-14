import { ClipboardCheck, School, Users, TrendingUp } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import { Reveal } from '@/components/reveal'

const stats = [
  {
    icon: School,
    end: 1240,
    suffix: '+',
    label: 'Schools Supported',
    sub: 'Active partner institutions',
    trend: '+12% this quarter',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    icon: ClipboardCheck,
    end: 560,
    suffix: '+',
    label: 'Projects Completed',
    sub: 'In different places',
    trend: '+8% this quarter',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: Users,
    end: 380000,
    suffix: '+',
    label: 'Students Enrolled',
    sub: 'Lives impacted directly',
    trend: '+21% this year',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  },
  {
    icon: TrendingUp,
    end: 45000,
    suffix: '+',
    label: 'Volunteer Hours',
    sub: 'Mobilized support',
    trend: '+19% this year',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  },
]

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:py-0 -mt-12 relative z-20">
      <div className="grid gap-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${s.iconBg} transition-transform duration-300 group-hover:scale-105`}
              >
                <s.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{s.label}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{s.sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
