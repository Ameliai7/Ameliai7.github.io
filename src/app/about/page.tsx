'use client'
import { motion } from 'motion/react'
import { profile } from '@/data/profile'
import { site } from '@/data/site'
import { awards, personalHonors } from '@/data/honors'
import { interests } from '@/data/interests'
import ExperienceSection from '@/components/experience-section'
import { InterestGallery } from '@/components/interest-gallery'

/** 等级小圆点配色（唯一的有色元素，保持克制） */
const levelConfig: Record<string, { dot: string }> = {
	'国际级': { dot: 'bg-amber-400' },
	'国家级': { dot: 'bg-amber-500' },
	'省级': { dot: 'bg-slate-400' },
	'校级': { dot: 'bg-amber-600' },
}

function LevelBadge({ level, size = 'sm' }: { level: string; size?: 'sm' | 'md' }) {
	const sizeClass = size === 'md' ? 'px-2.5 py-0.5 text-sm' : 'px-2 py-0.5 text-xs'
	return (
		<span className={`inline-flex shrink-0 items-center rounded-full bg-gray-100 font-medium text-muted dark:bg-white/10 ${sizeClass}`}>
			{level}
		</span>
	)
}

function HonorCard({ honor, index, size = 'sm' }: { honor: { title: string; year?: string; level: string }; index: number; size?: 'sm' | 'md' }) {
	const config = levelConfig[honor.level] ?? levelConfig['校级']
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.06 }}
			className='group flex items-center gap-3 rounded-xl border border-border/60 bg-white/50 px-4 py-3 shadow-sm transition-all hover:border-brand/30 hover:shadow-md dark:bg-white/5'>
			{/* 等级小圆点：唯一的有色元素 */}
			<span className={`size-2 shrink-0 rounded-full ${config.dot}`} />
			<p className={`min-w-0 flex-1 font-medium text-primary ${size === 'md' ? 'text-base' : 'text-sm'}`}>{honor.title}</p>
			{honor.year && <span className='shrink-0 text-xs text-muted'>{honor.year}</span>}
			<LevelBadge level={honor.level} size={size} />
		</motion.div>
	)
}

function SectionHeader({ title, subtitle, count }: { title: string; subtitle: string; count?: number }) {
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
			{count !== undefined && (
				<span className='hidden shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-muted sm:inline dark:bg-white/10'>
					共 {count} 项
				</span>
			)}
		</div>
	)
}

export default function AboutPage() {
	return (
		<div className='mx-auto min-h-screen max-w-4xl px-6 py-24'>
			{/* Header */}
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
				<h1 className='mb-2 text-4xl font-bold text-primary'>关于我</h1>
				<p className='mb-12 text-muted'>About</p>
			</motion.div>

			{/* Profile */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className='mb-16 rounded-2xl border border-border/80 bg-card p-8 shadow-sm'>
				<div className='mb-6 flex items-center gap-5'>
					<div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-md'>
						<img src='/images/blogger/avatar.jpg' alt={profile.name} className='h-full w-full object-cover' />
					</div>
					<div>
						<h2 className='text-2xl font-bold text-primary'>{site.name}</h2>
						<p className='text-sm text-muted'>{profile.title}</p>
						<p className='mt-1 text-xs text-secondary/70'>{profile.bio}</p>
					</div>
				</div>
				<div className='space-y-3'>
					{profile.detailedBio.map((paragraph, index) => (
						<p key={index} className='leading-relaxed text-secondary'>
							{paragraph}
						</p>
					))}
				</div>
			</motion.div>

			{/* 关于这个博客 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='mb-16'>
				<SectionHeader title='关于这个博客' subtitle='About This Blog' />
				<div className='rounded-2xl border border-border/80 bg-card p-8 shadow-sm'>
					<p className='leading-relaxed text-secondary'>
						这个博客里会记录我对数据分析、产品经理与信息管理领域的思考与实践，包括技术笔记、项目复盘、阅读心得，以及一些跨学科的灵感碰撞。
					</p>
					<p className='mt-3 leading-relaxed text-secondary'>
						内容涵盖 AI 与人文反思、产品设计方法论、数据分析实战，以及我在武汉大学求学过程中的成长与探索。希望能在这里与志同道合的朋友交流与分享。
					</p>
				</div>
			</motion.div>

			{/* 研究兴趣 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
				className='mb-16'>
				<SectionHeader title='研究兴趣' subtitle='Research Interests' />
				<div className='grid gap-4 md:grid-cols-2'>
					{[
						{ title: '数据分析', desc: '数据驱动决策、数据挖掘、用户行为分析' },
						{ title: '产品设计', desc: '用户体验设计、人机交互、产品策略与需求分析' },
						{ title: '信息管理', desc: '信息检索、知识组织、智能信息系统' },
						{ title: 'AI 与人文', desc: 'AI 伦理、认知外包、人机协作' },
					].map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
							className='rounded-xl border border-border/60 bg-white/50 px-5 py-4 shadow-sm dark:bg-white/5'>
							<h4 className='mb-1 font-semibold text-primary'>{item.title}</h4>
							<p className='text-sm text-muted'>{item.desc}</p>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* 荣誉 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.35 }}
				className='mb-16'>
				<SectionHeader title='荣誉' subtitle='Honors' />
				<div className='grid gap-6 md:grid-cols-2'>
					{/* 竞赛获奖 */}
					<div>
						<div className='mb-3 flex items-center gap-2'>
							<span className='block h-4 w-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-500' />
							<h4 className='font-semibold text-primary'>竞赛获奖</h4>
							<span className='ml-auto text-xs text-muted'>{awards.length} 项</span>
						</div>
						<div className='space-y-2.5'>
							{awards.map((honor, index) => (
								<HonorCard key={index} honor={honor} index={index} />
							))}
						</div>
					</div>
					{/* 个人荣誉 */}
					<div>
						<div className='mb-3 flex items-center gap-2'>
							<span className='block h-4 w-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-600' />
							<h4 className='font-semibold text-primary'>个人荣誉</h4>
							<span className='ml-auto text-xs text-muted'>{personalHonors.length} 项</span>
						</div>
						<div className='space-y-2.5'>
							{personalHonors.map((honor, index) => (
								<HonorCard key={index} honor={honor} index={index} />
							))}
						</div>
					</div>
				</div>
			</motion.div>

			{/* 经历 */}
			<ExperienceSection />

			{/* 兴趣爱好 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				className='mb-16'>
				<SectionHeader title='兴趣爱好' subtitle='Interests' count={interests.length} />
				<div className='space-y-6'>
					{interests.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
							className='flex flex-col gap-6 rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:flex-row md:items-center md:p-7'>
							<div className='md:w-56 md:shrink-0'>
								<h4 className='text-lg font-bold text-primary'>{item.titleCn}</h4>
								<p className='mt-0.5 text-xs uppercase tracking-wide text-muted'>{item.title}</p>
								<p className='mt-3 text-sm leading-relaxed text-secondary'>{item.description}</p>
								{item.tags.length > 0 && (
									<div className='mt-4 flex flex-wrap gap-1.5'>
										{item.tags.map(tag => (
												<span
													key={tag}
													className='rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-muted dark:bg-white/10'>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
								<div className='min-w-0 flex-1'>
									<InterestGallery images={item.images} alt={item.titleCn} />
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

		</div>
	)
}
