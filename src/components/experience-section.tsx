'use client'
import { motion } from 'motion/react'
import { experiences } from '@/data/experience'
import { GraduationCap, Users, Briefcase, Calendar, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const typeConfig = {
	'education': {
		icon: GraduationCap,
		label: '教育经历',
		color: 'text-blue-500',
		bg: 'bg-blue-50 dark:bg-blue-900/20',
		border: 'border-blue-200 dark:border-blue-800',
		bar: 'bg-blue-400',
	},
	'student-work': {
		icon: Users,
		label: '学生工作',
		color: 'text-purple-500',
		bg: 'bg-purple-50 dark:bg-purple-900/20',
		border: 'border-purple-200 dark:border-purple-800',
		bar: 'bg-purple-400',
	},
	'internship': {
		icon: Briefcase,
		label: '实习经历',
		color: 'text-orange-500',
		bg: 'bg-orange-50 dark:bg-orange-900/20',
		border: 'border-orange-200 dark:border-orange-800',
		bar: 'bg-orange-400',
	},
}

const filteredExperiences = experiences.filter(e => e.type !== 'project')

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
	const colors = ['#f97316', '#fb923c', '#a855f7', '#3b82f6', '#22c55e']
	const hash = [...title].reduce((acc, c) => acc + c.charCodeAt(0), 0)
	const barColor = colors[hash % colors.length]
	return (
		<div className='mb-6 flex items-center justify-between border-b border-border/40 pb-3'>
			<div className='flex items-center gap-3'>
				<span className='block h-8 w-1 shrink-0 rounded-full' style={{ backgroundColor: barColor }} />
				<div>
					<h3 className='text-xl font-bold text-primary'>{title}</h3>
					<p className='text-sm text-muted'>{subtitle}</p>
				</div>
			</div>
		</div>
	)
}

export default function ExperienceSection() {

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.35 }}
			className='mb-16'>
			<SectionHeader title='经历' subtitle='Experience' />

			{/* 第一行：教育经历 + 学生工作 */}
			<div className='grid gap-6 md:grid-cols-2'>
				{(['education', 'student-work'] as const).map((typeKey, sectionIdx) => {
					const config = typeConfig[typeKey]
					const items = filteredExperiences.filter(e => e.type === typeKey)
					const Icon = config.icon

					return (
						<motion.div
							key={typeKey}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.35 + sectionIdx * 0.08 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<div className='mb-4 flex items-center gap-2'>
								<div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg}`}>
									<Icon className={`size-4 ${config.color}`} />
								</div>
								<h4 className='font-semibold text-primary'>{config.label}</h4>
								<span className='ml-auto text-xs text-muted'>{items.length} 项</span>
							</div>
							<div className='space-y-3'>
								{items.map((exp, i) => (
									<ExperienceCard key={i} exp={exp} index={i} />
								))}
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* 第二行：实习经历（全宽） */}
			{(() => {
				const typeKey = 'internship' as const
				const config = typeConfig[typeKey]
				const items = filteredExperiences.filter(e => e.type === typeKey)
				const Icon = config.icon

				return (
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.35 + 2 * 0.08 }}
						className='mt-6 rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
						<div className='mb-4 flex items-center gap-2'>
							<div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg}`}>
								<Icon className={`size-4 ${config.color}`} />
							</div>
							<h4 className='font-semibold text-primary'>{config.label}</h4>
							<span className='ml-auto text-xs text-muted'>{items.length} 项</span>
						</div>
						<div className='grid gap-4 md:grid-cols-2'>
							{items.map((exp, i) => (
								<ExperienceCard key={i} exp={exp} index={i} />
							))}
						</div>
					</motion.div>
				)
			})()}
		</motion.div>
	)
}

function ExperienceCard({ exp, index }: { exp: typeof filteredExperiences[number]; index: number }) {
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<div className='rounded-xl border border-border/60 bg-white/50 shadow-sm overflow-hidden dark:bg-white/5'>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className='flex w-full items-center justify-between gap-2 p-3 text-left transition-colors hover:bg-gray-100/50 dark:hover:bg-white/5'>
				<div className='flex-1 min-w-0'>
					<p className='text-sm font-medium text-primary'>{exp.title}</p>
					<p className='text-xs text-muted'>{exp.subtitle}</p>
				</div>
				<ChevronDown className={`size-4 shrink-0 text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
			</button>
			{isExpanded && (
				<div className='border-t border-border/60 px-3 pb-3 pt-2'>
					{exp.period && (
						<div className='mb-2 flex items-center gap-1 text-xs text-muted'>
							<Calendar className='size-3' />
							<span>{exp.period}</span>
						</div>
					)}
					<ul className='space-y-1.5'>
						{exp.details.map((d, j) => (
							<li key={j} className='text-xs leading-relaxed text-secondary before:mr-1.5 before:text-muted before:content-["•"]'>
								{d}
							</li>
						))}
					</ul>
					{exp.tags && exp.tags.length > 0 && (
						<div className='mt-2 flex flex-wrap gap-1'>
							{exp.tags.map(t => (
								<span
									key={t}
									className='rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted dark:bg-white/10'>
									{t}
								</span>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
