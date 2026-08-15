'use client'

import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { BlogPreview } from '@/components/blog-preview'
import { loadBlog, type BlogConfig } from '@/lib/load-blog'

export default function BlogDetailClient({ slug }: { slug: string }) {
	const [blog, setBlog] = useState<{ config: BlogConfig; markdown: string; cover?: string } | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		let cancelled = false
		async function run() {
			if (!slug) return
			try {
				setLoading(true)
				const blogData = await loadBlog(slug)
				if (!cancelled) {
					setBlog(blogData)
					setError(null)
				}
			} catch (e: any) {
				if (!cancelled) setError(e?.message || '加载失败')
			} finally {
				if (!cancelled) setLoading(false)
			}
		}
		run()
		return () => { cancelled = true }
	}, [slug])

	const title = useMemo(() => (blog?.config.title ? blog.config.title : slug), [blog?.config.title, slug])
	const date = useMemo(() => dayjs(blog?.config.date).format('YYYY年 M月 D日'), [blog?.config.date])
	const tags = blog?.config.tags || []

	if (!slug) {
		return <div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'><p className='text-gray-500'>无效的链接</p></div>
	}
	if (loading) {
		return <div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'><p className='text-gray-500'>加载中...</p></div>
	}
	if (error) {
		return <div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'><p className='text-red-500'>{error}</p></div>
	}
	if (!blog) {
		return <div className='mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-24'><p className='text-gray-500'>文章不存在</p></div>
	}

	return (
		<BlogPreview
			markdown={blog.markdown}
			title={title}
			tags={tags}
			date={date}
			summary={blog.config.summary}
			cover={blog.cover || undefined}
			slug={slug}
		/>
	)
}
