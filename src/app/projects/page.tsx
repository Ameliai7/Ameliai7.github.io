'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { ArrowRight } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className='mx-auto min-h-screen max-w-6xl px-6 py-24'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className='mb-2 text-4xl font-bold text-primary'>Projects</h1>
        <p className='mb-12 text-muted'>项目展示</p>
      </motion.div>
      <div className='space-y-8'>
        {projects.map((project, index) => (
          <motion.div key={project.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.15 }}>
            <Link href={"/projects/" + project.slug} className='group block rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-brand/50 hover:shadow-md'>
              <div className='flex items-start justify-between gap-6'>
                <div className='flex-1'>
                  <div className='mb-2 flex items-center gap-3'>
                    <span className='rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-brand dark:bg-orange-900/30'>{project.number}</span>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags.slice(0, 4).map(tag => <span key={tag} className='rounded-full bg-gray-100 px-3 py-0.5 text-xs text-muted dark:bg-white/10'>{tag}</span>)}
                    </div>
                  </div>
                  <h2 className='mb-2 text-xl font-semibold text-primary group-hover:text-brand'>{project.title}</h2>
                  <p className='text-sm leading-relaxed text-secondary'>{project.summary}</p>
                  <div className='mt-4 flex items-center gap-1 text-sm text-brand opacity-70 transition-opacity group-hover:opacity-100'>
                    <span>查看详情</span>
                    <ArrowRight className='size-4' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
