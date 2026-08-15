// Server component wrapper that provides generateStaticParams for static export
import { projects } from '@/data/projects'
import ProjectDetailClient from './page-client'

export function generateStaticParams() {
	return projects.map(project => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	return <ProjectDetailClient slug={slug} />
}
