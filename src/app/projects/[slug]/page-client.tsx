'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { ArrowLeft } from 'lucide-react'

export default function ProjectDetailClient({ slug }: { slug: string }) {
	const project = projects.find(p => p.slug === slug)

	if (!project) {
		return (
			<div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'>
				<div className='text-center'>
				<h1 className='mb-4 text-2xl font-bold text-primary'>项目未找到</h1>
				<Link href='/projects' className='text-brand hover:underline'>
						← 返回项目列表
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='mx-auto min-h-screen max-w-4xl px-6 py-24'>
			<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
			<Link href='/projects' className='mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-brand'>
					<ArrowLeft className='size-4' />
					<span>返回项目列表</span>
				</Link>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
				<div className='mb-2 flex items-center gap-3'>
				<span className='rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-brand dark:bg-orange-900/30'>{project.number}</span>
				<span className='text-sm text-muted'>{project.role}</span>
			</div>
			<h1 className='mb-4 text-3xl font-bold text-primary'>{project.title}</h1>
			<div className='mb-8 flex flex-wrap gap-2'>
				{project.tags.map(tag => (
					<span key={tag} className='rounded-full bg-gray-100 px-3 py-1 text-xs text-secondary dark:bg-white/10'>
							{tag}
						</span>
					))}
				</div>
				<p className='mb-12 text-lg leading-relaxed text-secondary'>{project.summary}</p>
			{project.gallery && project.gallery.length > 0 && (
				<div className='mb-12 flex flex-col items-center gap-6'>
					{project.gallery.map((img, i) => (
						<div key={i} className='w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={img.src}
								alt={img.alt}
								className='w-full object-contain'
							/>
							{img.caption && (
								<p className='border-t border-border px-3 py-2 text-center text-xs text-muted'>
									{img.caption}
								</p>
							)}
						</div>
					))}
				</div>
			)}
			{project.cover && (
				<div className='mb-12 overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={project.cover}
						alt={`${project.title} document cover`}
						className='w-full object-cover'
					/>
				</div>
			)}
		</motion.div>

			<div className='space-y-16'>
				{project.chapters.map((chapter, index) => (
					<motion.div
						key={chapter.number}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
					>
					<div className='mb-2 text-sm text-brand'>{chapter.number}</div>
					<h2 className='mb-4 text-2xl font-semibold text-primary'>{chapter.title}</h2>
					<div className='space-y-3'>
						{chapter.content.map((paragraph, i) => {
								const isHtml = /^<(\w+)[^>]*>/.test(paragraph.trim())
								if (isHtml) {
									return (
										<div
											key={i}
											className='prose prose-sm max-w-none leading-relaxed text-secondary [&_strong]:!text-primary [&_strong]:m-0 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:dark:bg-white/5 [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm'
											dangerouslySetInnerHTML={{ __html: paragraph }}
										/>
									)
								}
								return (
									<p key={i} className='leading-relaxed text-secondary'>
										{paragraph}
									</p>
								)
							})}
						</div>
						{chapter.images && chapter.images.length > 0 && (
							<div className='mt-6 grid gap-4'>
								{chapter.images.map((img, i) => (
								<div key={i} className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={img.src}
										alt={img.alt}
										className='w-full object-cover'
									/>
									{img.caption && (
										<p className='border-t border-border px-3 py-2 text-center text-xs text-muted'>
												{img.caption}
											</p>
										)}
									</div>
								))}
							</div>
						)}
					</motion.div>
				))}
			</div>
		</div>
	)
}
