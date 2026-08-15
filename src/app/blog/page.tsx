'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

type BlogIndexItem = {
	slug: string
	title: string
	tags: string[]
	date: string
	summary?: string
	cover?: string
	hidden?: boolean
	category?: string
	/** 外部链接（如微信公众号文章），有值时点击直接跳转外部 */
	externalUrl?: string
}

/** 动画配置：卡片从左侧滑入 */
const cardAnimation = {
	initial: { opacity: 0, x: -30 },
	whileInView: { opacity: 1, x: 0 },
	viewport: { once: true, margin: '-60px' },
	transition: { duration: 0.5, ease: 'easeOut' },
}

/** 动画配置：月份标题淡入 */
const monthAnimation = {
	initial: { opacity: 0, y: 10 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: '-40px' },
	transition: { duration: 0.4, ease: 'easeOut' },
}

export default function BlogPage() {
	const [items, setItems] = useState<BlogIndexItem[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/blogs/index.json')
			.then(res => res.json())
			.then(data => {
				setItems(data.filter((item: BlogIndexItem) => !item.hidden))
				setLoading(false)
			})
			.catch(() => setLoading(false))
	}, [])

	/** 按月份分组（降序） */
	const monthGroups = useMemo(() => {
		const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		const grouped: Record<string, BlogIndexItem[]> = {}
		sorted.forEach(item => {
			const key = dayjs(item.date).format('YYYY年M月')
			if (!grouped[key]) grouped[key] = []
			grouped[key].push(item)
		})
		return grouped
	}, [items])

	/** 月份键按时间降序排列 */
	const monthKeys = useMemo(() => {
		return Object.keys(monthGroups).sort((a, b) => {
			const da = dayjs(a.replace('年', '-').replace('月', ''))
			const db = dayjs(b.replace('年', '-').replace('月', ''))
			return db.valueOf() - da.valueOf()
		})
	}, [monthGroups])

	if (loading) {
		return (
			<div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'>
				<p className='text-muted'>加载中...</p>
			</div>
		)
	}

	return (
		<div className='mx-auto min-h-screen max-w-4xl px-6 py-24'>
			{/* 页头 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h1 className='mb-2 text-4xl font-bold text-primary'>Blog</h1>
				<p className='mb-12 text-muted'>文章</p>
			</motion.div>

			{monthKeys.length === 0 && (
				<div className='rounded-2xl border border-border/80 bg-card p-12 text-center shadow-sm'>
					<p className='text-muted'>还没有文章，敬请期待</p>
				</div>
			)}

			{/* 时间线容器 */}
			<div className='relative ml-2 border-l-2 border-border/60 pl-8 pb-4'>
				{monthKeys.map((month, mi) => (
					<div key={month} className='relative mb-10'>
						{/* 月份节点 */}
						<motion.div
							className='absolute -left-[calc(2rem+4px)] top-0 flex items-center gap-3'
							{...monthAnimation}
							transition={{ ...monthAnimation.transition, delay: mi * 0.08 }}
						>
							{/* 圆点 */}
							<div className='flex h-3 w-3 shrink-0 items-center justify-center'>
								<div className='h-3 w-3 rounded-full border-2 border-border bg-card ring-4 ring-bg' />
							</div>
							{/* 月份文字 */}
							<span className='text-sm font-semibold tracking-wide text-muted'>{month}</span>
						</motion.div>

						{/* 该月份下的文章卡片 */}
						<div className='space-y-4 pt-8'>
							{monthGroups[month].map((item, index) => (
								<motion.div
									key={item.slug}
									{...cardAnimation}
									transition={{ ...cardAnimation.transition, delay: index * 0.06 }}
								>
									{item.externalUrl ? (
										<a
											href={item.externalUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='group block rounded-xl border border-border/80 bg-card shadow-sm transition-all hover:border-brand/30 hover:shadow'
										>
											<div className='flex items-center gap-4 p-5'>
												{item.cover && (
													<div className='h-16 w-16 shrink-0 overflow-hidden rounded-lg'>
														<img
															src={item.cover}
															alt={item.title}
															className='h-full w-full object-cover transition-transform group-hover:scale-105'
														/>
													</div>
												)}
												<div className='flex min-w-0 flex-1 items-start justify-between gap-4'>
													<div className='min-w-0 flex-1'>
														<h3 className='font-medium text-primary group-hover:text-brand truncate'>
															{item.title}{' '}
															<span className='inline-block align-middle text-xs text-muted'>🔗</span>
														</h3>
														{item.summary && (
															<p className='mt-1 text-sm text-muted line-clamp-2'>{item.summary}</p>
														)}
														<div className='mt-2 flex flex-wrap gap-2'>
															{item.tags?.map(tag => (
																<span
																	key={tag}
																	className='rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted dark:bg-white/10'
																>
																	{tag}
																</span>
															))}
														</div>
													</div>
													<span className='shrink-0 text-xs text-muted'>{item.date?.slice(0, 10)}</span>
												</div>
											</div>
										</a>
									) : (
										<Link
											href={'/blog/' + item.slug}
											className='group block rounded-xl border border-border/80 bg-card shadow-sm transition-all hover:border-brand/30 hover:shadow'
										>
											<div className='flex items-center gap-4 p-5'>
												{item.cover && (
													<div className='h-16 w-16 shrink-0 overflow-hidden rounded-lg'>
														<img
															src={item.cover}
															alt={item.title}
															className='h-full w-full object-cover transition-transform group-hover:scale-105'
														/>
													</div>
												)}
												<div className='flex min-w-0 flex-1 items-start justify-between gap-4'>
													<div className='min-w-0 flex-1'>
														<h3 className='font-medium text-primary group-hover:text-brand truncate'>
															{item.title}
														</h3>
														{item.summary && (
															<p className='mt-1 text-sm text-muted line-clamp-2'>{item.summary}</p>
														)}
														<div className='mt-2 flex flex-wrap gap-2'>
															{item.tags?.map(tag => (
																<span
																	key={tag}
																	className='rounded-full bg-gray-100 px-2 py-0.5 text-xs text-muted dark:bg-white/10'
																>
																	{tag}
																</span>
															))}
														</div>
													</div>
													<span className='shrink-0 text-xs text-muted'>{item.date?.slice(0, 10)}</span>
												</div>
											</div>
										</Link>
									)}
								</motion.div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
