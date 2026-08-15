'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

const navItems = [
	{ label: '首页', href: '/' },
	{ label: '项目', href: '/projects/' },
	{ label: '文章', href: '/blog/' },
	{ label: '关于', href: '/about/' },
	{ label: '联系', href: '/#contact' },
]

export default function Header() {
	const pathname = usePathname()
	const { theme, toggleTheme } = useTheme()
	const isHome = pathname === '/'

	// 首页已有自己的 header（含锚点导航），不重复渲染
	if (isHome) return null

	return (
		<header className='fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md'>
			<div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
				<Link href='/' className='text-lg font-bold tracking-tight text-primary'>
					Amelia<span className='text-brand'>.</span>
				</Link>
				<nav className='hidden items-center gap-6 md:flex'>
					{navItems.map(item => {
						const isActive = pathname.startsWith(item.href) && item.href !== '/'
						return (
							<Link
								key={item.label}
								href={item.href}
								className={`text-sm transition-colors hover:text-primary ${
									isActive ? 'text-brand' : 'text-secondary'
								}`}
							>
								{item.label}
							</Link>
						)
					})}
				</nav>
				<button
					onClick={toggleTheme}
					className='rounded-full p-2 text-muted transition-colors hover:bg-gray-200 hover:text-primary dark:hover:bg-white/10'
					aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
				>
					{theme === 'dark' ? <Sun className='size-5' /> : <Moon className='size-5' />}
				</button>
			</div>
		</header>
	)
}
