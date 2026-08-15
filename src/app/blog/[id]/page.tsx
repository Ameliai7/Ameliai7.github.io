// Server component wrapper that provides generateStaticParams for static export
import fs from 'fs'
import path from 'path'
import BlogDetailClient from './page-client'

export function generateStaticParams() {
	try {
		const indexPath = path.join(process.cwd(), 'public', 'blogs', 'index.json')
		const content = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
		// 排除纯外部链接文章（它们不需要静态页面）
		return content
			.filter((item: any) => !item.externalUrl)
			.map((item: any) => ({ id: item.slug }))
	} catch {
		return []
	}
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	return <BlogDetailClient slug={id} />
}
