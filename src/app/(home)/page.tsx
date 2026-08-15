'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { site } from '@/data/site'
import { profile } from '@/data/profile'
import { social } from '@/data/social'
import { projects } from '@/data/projects'
import { awards, personalHonors } from '@/data/honors'
import {
	ArrowRight, Github, Mail, Search, Moon as MoonIcon, Sun as SunIcon, Music, Play,
	ExternalLink, Tag, Calendar, Clock, Sun, CloudSun, Navigation, Award,
	ChevronRight, BookOpen, Briefcase, GraduationCap, Users, Code,
	Pause, Shuffle, SkipBack, SkipForward, ListMusic
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dayjs from 'dayjs'
import { useTheme } from '@/components/theme-provider'

type BlogItem = {
	slug: string
	title: string
	tags: string[]
	date: string
	summary?: string
	cover?: string
	externalUrl?: string
}

function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()
	return (
		<button
			onClick={toggleTheme}
			className='rounded-full p-2 text-muted transition-colors hover:bg-gray-200 hover:text-primary dark:hover:bg-white/10'
			aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
		>
			{theme === 'dark' ? <SunIcon className='size-5' /> : <MoonIcon className='size-5' />}
		</button>
	)
}

const navItems = [
	{ label: '首页', href: '#hero' },
	{ label: '项目', href: '#projects' },
	{ label: '文章', href: '#blog' },
	{ label: '关于', href: '#about' },
	{ label: '联系', href: '#contact' }
]

function DigitalClock() {
	const [time, setTime] = useState(new Date())
	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])
	return (
		<div className='font-mono text-2xl font-bold tracking-widest text-primary'>
			{dayjs(time).format('HH : mm : ss')}
		</div>
	)
}

function MiniCalendar() {
	const today = dayjs()
	const startOfMonth = today.startOf('month')
	const startDay = startOfMonth.day()
	const daysInMonth = today.daysInMonth()
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

	return (
		<div>
			<p className='mb-2 text-center text-xs font-medium text-muted'>{today.format('YYYY年M月')}</p>
			<div className='grid grid-cols-7 gap-0.5 text-center text-xs'>
				{['日', '一', '二', '三', '四', '五', '六'].map(d => (
					<span key={d} className='py-0.5 text-muted'>{d}</span>
				))}
				{Array.from({ length: startDay }).map((_, i) => (
					<span key={`empty-${i}`} />
				))}
				{days.map(d => (
					<span
						key={d}
						className={`rounded py-0.5 ${d === today.date() ? 'bg-brand font-bold text-white' : 'text-secondary'}`}
					>
						{d}
					</span>
				))}
			</div>
		</div>
	)
}

function formatTime(seconds: number): string {
	if (isNaN(seconds) || !isFinite(seconds)) return '0:00'
	const m = Math.floor(seconds / 60)
	const s = Math.floor(seconds % 60)
	return `${m}:${s.toString().padStart(2, '0')}`
}

const PLAYLIST = [
	{ name: '晚晴', artist: '邓翊群', src: '/music/wanqing.mp3' },
]

function MusicPlayer() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const progressRef = useRef<HTMLDivElement | null>(null)
	const wasPlayingRef = useRef(false)
	const initialPosRef = useRef(true)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isShuffle, setIsShuffle] = useState(false)
	const [showList, setShowList] = useState(false)

	const currentSong = PLAYLIST[currentIndex] ?? PLAYLIST[0]

	useEffect(() => {
		const audio = new Audio(currentSong.src)
		audioRef.current = audio

		const onTimeUpdate = () => setCurrentTime(audio.currentTime)
		const onLoadedMetadata = () => {
			setDuration(audio.duration)
			if (initialPosRef.current) {
				initialPosRef.current = false
				audio.currentTime = 219 // 3:39
				setCurrentTime(219)
			}
		}
		const onEnded = () => { next() }

		audio.addEventListener('timeupdate', onTimeUpdate)
		audio.addEventListener('loadedmetadata', onLoadedMetadata)
		audio.addEventListener('ended', onEnded)

		// 切歌时如果之前在播放，自动继续播放
		if (wasPlayingRef.current) {
			audio.play().then(() => setIsPlaying(true)).catch(() => {})
		} else {
			setIsPlaying(false)
		}

		return () => {
			wasPlayingRef.current = !audio.paused
			audio.pause()
			audio.removeEventListener('timeupdate', onTimeUpdate)
			audio.removeEventListener('loadedmetadata', onLoadedMetadata)
			audio.removeEventListener('ended', onEnded)
		}
	}, [currentIndex])

	const togglePlay = useCallback(() => {
		const audio = audioRef.current
		if (!audio) return
		if (audio.paused) {
			audio.play().then(() => { setIsPlaying(true); wasPlayingRef.current = true }).catch(() => {})
		} else {
			audio.pause()
			setIsPlaying(false)
			wasPlayingRef.current = false
		}
	}, [])

	const prev = useCallback(() => {
		if (PLAYLIST.length <= 1) return
		setCurrentIndex(prev => {
			if (isShuffle) {
				let next: number
				do { next = Math.floor(Math.random() * PLAYLIST.length) } while (next === prev && PLAYLIST.length > 1)
				return next
			}
			return prev === 0 ? PLAYLIST.length - 1 : prev - 1
		})
	}, [isShuffle])

	const next = useCallback(() => {
		if (PLAYLIST.length <= 1) return
		setCurrentIndex(prev => {
			if (isShuffle) {
				let next: number
				do { next = Math.floor(Math.random() * PLAYLIST.length) } while (next === prev && PLAYLIST.length > 1)
				return next
			}
			return prev === PLAYLIST.length - 1 ? 0 : prev + 1
		})
	}, [isShuffle])

	const isDraggingRef = useRef(false)

	const calcSeek = useCallback((clientX: number) => {
		const audio = audioRef.current
		const el = progressRef.current
		if (!audio || !el || !duration) return
		const rect = el.getBoundingClientRect()
		const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
		audio.currentTime = ratio * duration
		setCurrentTime(ratio * duration)
	}, [duration])

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		isDraggingRef.current = true
		calcSeek(e.clientX)
	}, [calcSeek])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDraggingRef.current) return
			calcSeek(e.clientX)
		}
		const handleMouseUp = () => {
			isDraggingRef.current = false
		}
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [calcSeek])

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
			className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
			{/* 状态栏 */}
			<div className='mb-4 flex items-center gap-2'>
				<Music className='size-4 text-brand/80' />
				<h3 className='text-sm font-semibold text-primary'>CLOUD MUSIC</h3>
			</div>

			{/* 专辑封面 */}
			<div className='flex justify-center'>
				<div className='relative mb-4 overflow-hidden'
					style={{
						width: 140, height: 140,
						borderRadius: 24,
						boxShadow: '0 8px 32px rgba(249,115,22,0.35), 0 2px 8px rgba(249,115,22,0.15)',
					}}
				>
					<img
						src='/images/wanqing-cover.jpg'
						alt='晚晴'
						className='h-full w-full object-cover'
					/>
				</div>
			</div>

			{/* 歌曲信息 */}
			<p className='text-center text-base font-bold tracking-tight text-primary' style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{currentSong.name}</p>
			<p className='mt-0.5 text-center text-xs text-muted'>{currentSong.artist}</p>

			{/* 进度条 */}
			<div className='mt-3'>
				<div
					ref={progressRef}
					onMouseDown={handleMouseDown}
					className='relative h-1.5 w-full cursor-pointer rounded-full bg-gray-200 select-none dark:bg-white/15'
				>
					<div
						className='absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] duration-150'
						style={{ width: `${progress}%` }}
					/>
					<div
						className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-white shadow dark:bg-card'
						style={{ left: `${progress}%`, width: 14, height: 14 }}
					/>
				</div>
				<div className='mt-1.5 flex justify-between'>
					<span className='font-mono text-[11px] text-muted' style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(currentTime)}</span>
					<span className='font-mono text-[11px] text-muted' style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(duration)}</span>
				</div>
			</div>

			{/* 底部控制栏 */}
			<div className='mt-4 flex items-center justify-center gap-5'>
				<button
					onClick={() => setIsShuffle(s => !s)}
					className={`transition-colors ${isShuffle ? 'text-brand' : 'text-muted/60 hover:text-muted'}`}
					aria-label='随机播放'
				>
					<Shuffle className='size-4' />
				</button>
				<button onClick={prev} className='text-muted/60 transition-colors hover:text-muted' aria-label='上一首'>
					<SkipBack className='size-4' />
				</button>
				<button
					onClick={togglePlay}
					className='flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30 transition-transform hover:scale-105 active:scale-95'
					aria-label={isPlaying ? '暂停' : '播放'}
				>
					{isPlaying ? <Pause className='size-5' /> : <Play className='ml-0.5 size-5' />}
				</button>
				<button onClick={next} className='text-muted/60 transition-colors hover:text-muted' aria-label='下一首'>
					<SkipForward className='size-4' />
				</button>
				<button
					onClick={() => setShowList(s => !s)}
					className={`transition-colors ${showList ? 'text-brand' : 'text-muted/60 hover:text-muted'}`}
					aria-label='播放列表'
				>
					<ListMusic className='size-4' />
				</button>
			</div>

			{/* 播放列表下拉 */}
			{showList && (
				<div className='mt-3 max-h-32 overflow-y-auto rounded-xl border border-border/60 bg-gray-50/50 dark:bg-white/5'>
					{PLAYLIST.map((song, i) => (
						<button
							key={i}
							onClick={() => { setCurrentIndex(i); setShowList(false) }}
							className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20 ${
								i === currentIndex ? 'text-brand font-medium' : 'text-secondary'
							}`}
						>
							<span className='w-5 text-center font-mono text-xs text-muted'>{i + 1}</span>
							<span className='truncate'>{song.name}</span>
							<span className='ml-auto text-xs text-muted/60'>{song.artist}</span>
						</button>
					))}
				</div>
			)}
		</motion.div>
	)
}

export default function Home() {
	const pathname = usePathname()
	const [searchQuery, setSearchQuery] = useState('')
	const [recentArticles, setRecentArticles] = useState<BlogItem[]>([])
	const [totalArticles, setTotalArticles] = useState(0)

	useEffect(() => {
		fetch('/blogs/index.json')
			.then(res => res.json())
			.then((data: BlogItem[]) => {
				const visible = data.filter(item => !(item as any).hidden)
				setTotalArticles(visible.length)
				// 取最新 5 篇
				const sorted = [...visible]
					.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
					.slice(0, 5)
				setRecentArticles(sorted)
			})
			.catch(() => {})
	}, [])

	return (
		<div className='relative min-h-screen bg-bg text-primary'>
			{/* ===== 顶部导航栏 ===== */}
			<header className='fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md'>
				<div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
					<Link href='/' className='text-lg font-bold tracking-tight text-primary'>
						Amelia<span className='text-brand'>.</span>
					</Link>
					<nav className='hidden items-center gap-6 md:flex'>
						{navItems.map(item => {
							const isActive = pathname === '/' && item.href === '#hero'
							return (
								<Link key={item.label} href={item.href}
									className={`text-sm transition-colors hover:text-primary ${isActive ? 'text-brand' : 'text-secondary'}`}>
									{item.label}
								</Link>
							)
						})}
					</nav>
					<ThemeToggle />
				</div>
			</header>

			{/* ===== HERO 首屏 ===== */}
			<section id='hero' className='relative overflow-hidden px-6 pt-32 pb-12 md:pt-40 md:pb-16'>
				<div className='pointer-events-none absolute inset-0 overflow-hidden'>
					<div className='absolute -right-20 -top-20 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl' />
					<div className='absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl' />
				</div>
				<div className='relative mx-auto max-w-6xl'>
					<div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between'>
						<div className='max-w-xl text-center md:text-left'>
						<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
								className='mb-2 text-sm font-medium text-brand/80'>Welcome to</motion.p>
							<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
								className='mb-4 text-5xl font-bold tracking-tight md:text-7xl text-primary'>{site.name}</motion.h1>
							<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
								className='mb-6 text-lg text-muted italic'>{site.slogan}</motion.p>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
								className='flex items-center justify-center gap-4 md:justify-start'>
								<a href='#projects' className='rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 dark:bg-white dark:text-gray-900'>浏览项目</a>
								<a href='#about' className='rounded-full border border-border px-6 py-2.5 text-sm font-medium text-secondary transition-all hover:border-muted hover:text-primary'>关于我</a>
							</motion.div>
						</div>
						<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
							className='relative hidden md:block'>
							<div className='flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 shadow-lg dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20'>
								<img src='/images/blogger/avatar.jpg' alt='Amelia' className='h-full w-full object-cover' />
							</div>
						</motion.div>
					</div>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
						className='relative mx-auto mt-10 max-w-xl'>
						<div className='flex items-center rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-all focus-within:border-brand/50 focus-within:shadow-md'>
							<Search className='size-5 text-muted' />
							<input type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
								placeholder='搜寻标题、描述或标签...'
								className='ml-3 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-muted' />
						</div>
					</motion.div>
				</div>
			</section>

			{/* ===== 三栏仪表盘 ===== */}
			<section className='px-6 pb-16'>
				<div className='mx-auto grid max-w-6xl gap-5 lg:grid-cols-12'>

					{/* === 左栏：Profile + 导航 + 统计 === */}
					<div className='space-y-5 lg:col-span-3'>
						{/* Profile 卡 */}
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<div className='mb-3 flex items-center gap-3'>
								<div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-orange-100 dark:bg-orange-900/30'>
									<img src='/images/blogger/avatar.jpg' alt='Amelia' className='h-full w-full object-cover' />
								</div>
								<div>
									<p className='font-semibold text-primary'>Amelia</p>
									<p className='text-xs text-muted'>求职方向：数据分析 / 产品经理</p>
								</div>
							</div>
							<p className='text-xs leading-relaxed text-muted'>武汉大学信息管理与信息系统本科生，GPA 3.72/4.0。实习经历覆盖前端开发与专家咨询，有完整项目开发经历。</p>
							<div className='mt-3 flex items-center gap-4 text-center text-sm'>
								<div><p className='font-bold text-primary'>{projects.length}</p><p className='text-xs text-muted'>项目</p></div>
								<div><p className='font-bold text-primary'>{totalArticles}</p><p className='text-xs text-muted'>文章</p></div>
								<div><p className='font-bold text-primary'>{awards.length + personalHonors.length}</p><p className='text-xs text-muted'>荣誉</p></div>
							</div>
						</motion.div>

						{/* 导航卡 */}
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<p className='mb-3 text-xs font-semibold text-muted uppercase tracking-wider'>导航</p>
							<div className='space-y-2'>
								{[
									{ label: '文章', href: '/blog', icon: BookOpen },
									{ label: '项目', href: '/projects', icon: Code },
									{ label: '关于', href: '/about', icon: Users },
									{ label: '联系', href: '#contact', icon: Mail }
								].map(item => (
							<Link key={item.label} href={item.href}
									className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-orange-50 hover:text-brand dark:hover:bg-orange-900/20'>
										<item.icon className='size-4 text-muted' />
										<span>{item.label}</span>
										<ChevronRight className='ml-auto size-3 text-muted' />
									</Link>
								))}
							</div>
						</motion.div>

						{/* 数字时钟 */}
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
							className='rounded-2xl border border-border/80 bg-card p-4 text-center shadow-sm'>
							<DigitalClock />
						</motion.div>
					</div>

					{/* === 中栏：文章列表 === */}
					<div className='space-y-5 lg:col-span-6'>
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<div className='mb-4 flex items-center justify-between'>
								<h3 className='font-semibold text-primary'>最新文章</h3>
								<Link href='/blog' className='text-xs text-brand/80 hover:text-brand'>更多 →</Link>
							</div>
							<div className='space-y-4'>
								{recentArticles.map((article) => {
									const ArticleWrapper = article.externalUrl ? 'a' : Link
									const wrapperProps = article.externalUrl
										? { href: article.externalUrl, target: '_blank', rel: 'noopener noreferrer' } as any
										: { href: `/blog/${article.slug}` } as any
									return (
										<ArticleWrapper key={article.slug} {...wrapperProps}
											className='group flex gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-orange-100 hover:bg-orange-50/30 dark:hover:border-orange-900/30 dark:hover:bg-orange-900/10'>
											<div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 text-2xl dark:from-orange-900/30 dark:to-amber-900/30'>
												{article.cover ? (
													<img src={article.cover} alt={article.title} className='h-full w-full object-cover' />
												) : '📝'}
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-medium text-primary transition-colors group-hover:text-brand line-clamp-2'>
													{article.title}
													{article.externalUrl && <span className='ml-1 inline-block align-middle text-xs text-muted'>🔗</span>}
												</p>
												<p className='mt-1 text-xs text-muted line-clamp-1'>{article.summary}</p>
												<div className='mt-2 flex items-center gap-3 text-xs text-muted'>
													<span className='flex items-center gap-1'><Calendar className='size-3' />{article.date?.slice(0, 10)}</span>
													{article.tags?.map(t => (
														<span key={t} className='rounded-full bg-gray-100 px-2 py-0.5 text-muted dark:bg-white/10'>{t}</span>
													))}
												</div>
											</div>
										</ArticleWrapper>
									)
								})}
							</div>
							<div className='mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted'>
								<span className='flex items-center gap-1'><span className='inline-block h-2 w-2 rounded-full bg-green-400' />共 {recentArticles.length} 篇</span>
								<div className='flex gap-2'>
									<button className='rounded-lg border border-border px-3 py-1 text-muted transition-colors hover:border-brand/30 hover:text-brand'>上一页</button>
									<span className='px-2 py-1 text-muted'>1 / 1</span>
									<button className='rounded-lg border border-border px-3 py-1 text-muted transition-colors hover:border-brand/30 hover:text-brand'>下一页</button>
								</div>
							</div>
						</motion.div>
					</div>

					{/* === 右栏：音乐 + 天气 + 日历 === */}
					<div className='space-y-5 lg:col-span-3'>
						{/* 音乐播放器 */}
						<MusicPlayer />

						{/* 天气占位 */}
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<div className='mb-3 flex items-center gap-2'>
								<Sun className='size-4 text-brand/80' />
								<h3 className='text-sm font-semibold text-primary'>天气</h3>
							</div>
							<div className='flex items-center gap-4'>
								<div className='text-3xl'>⛅</div>
								<div>
									<p className='text-2xl font-bold text-primary'>29°</p>
									<p className='text-xs text-muted'>阴天 · 最高29° 最低25°</p>
								</div>
							</div>
						</motion.div>

						{/* 小日历 */}
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
							className='rounded-2xl border border-border/80 bg-card p-5 shadow-sm'>
							<div className='mb-2 flex items-center gap-2'>
								<Calendar className='size-4 text-brand/80' />
								<h3 className='text-sm font-semibold text-primary'>日历</h3>
							</div>
							<MiniCalendar />
						</motion.div>
					</div>
				</div>
			</section>

			{/* ===== ⭐ PROJECTS ===== */}
			<section id='projects' className='bg-bg/50 px-6 py-20'>
				<div className='mx-auto max-w-6xl'>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
						className='mb-10 text-center'>
						<p className='mb-2 text-sm font-medium text-brand/80'>Projects</p>
						<h2 className='text-3xl font-bold text-primary'>项目展示</h2>
					</motion.div>
					<div className='grid gap-6 md:grid-cols-3'>
						{projects.map((project, index) => (
							<motion.div key={project.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
								<Link href={`/projects/${project.slug}`}
									className='group block h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-brand/50 hover:shadow-md'>
									<div className='mb-2 flex items-center gap-2'>
										<span className='rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-brand dark:bg-orange-900/30'>{project.number}</span>
										<span className='text-xs text-muted'>{project.role}</span>
									</div>
									<h3 className='mb-2 font-semibold text-primary transition-colors group-hover:text-brand'>{project.title}</h3>
									<p className='mb-4 text-sm leading-relaxed text-muted line-clamp-3'>{project.summary}</p>
									<div className='flex flex-wrap gap-1.5'>
										{project.tags.slice(0, 3).map(tag => (
											<span key={tag} className='rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-muted dark:bg-white/10'>{tag}</span>
										))}
									</div>
								</Link>
							</motion.div>
						))}
					</div>
					<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
						className='mt-8 text-center'>
						<Link href='/projects' className='inline-flex items-center gap-1 text-sm text-brand/80 hover:text-brand'>
							<span>查看全部项目</span><ArrowRight className='size-4' />
						</Link>
					</motion.div>
				</div>
			</section>

			{/* ===== ⭐ BLOG ===== */}
			<section id='blog' className='px-6 py-20'>
				<div className='mx-auto max-w-4xl'>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
						className='mb-10 text-center'>
						<p className='mb-2 text-sm font-medium text-brand/80'>Blog</p>
						<h2 className='text-3xl font-bold text-primary'>最新文章</h2>
					</motion.div>
					<div className='space-y-4'>
						{recentArticles.map((article, index) => {
							const ArticleWrapper = article.externalUrl ? 'a' : Link
							const wrapperProps = article.externalUrl
								? { href: article.externalUrl, target: '_blank', rel: 'noopener noreferrer' } as any
								: { href: `/blog/${article.slug}` } as any
							return (
								<motion.div key={article.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
									<ArticleWrapper {...wrapperProps}
										className='group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-brand/30 hover:shadow'>
										{article.cover && (
											<div className='h-14 w-14 shrink-0 overflow-hidden rounded-lg'>
												<img src={article.cover} alt={article.title} className='h-full w-full object-cover transition-transform group-hover:scale-105' />
											</div>
										)}
										<div className='flex-1 min-w-0'>
											<h3 className='font-medium text-primary transition-colors group-hover:text-brand truncate'>
												{article.title}
												{article.externalUrl && <span className='ml-1 inline-block align-middle text-xs text-muted'>🔗</span>}
											</h3>
											<p className='mt-1 text-sm text-muted line-clamp-1'>{article.summary}</p>
										</div>
										<div className='ml-4 flex shrink-0 items-center gap-3 text-xs text-muted'>
											<span>{article.date?.slice(0, 10)}</span>
											{article.externalUrl ? (
												<ExternalLink className='size-4' />
											) : (
												<ExternalLink className='size-4 opacity-0 transition-opacity group-hover:opacity-100' />
											)}
										</div>
									</ArticleWrapper>
								</motion.div>
							)
						})}
					</div>
					<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
						className='mt-8 text-center'>
						<Link href='/blog' className='inline-flex items-center gap-1 text-sm text-brand/80 hover:text-brand'>
							<span>查看全部文章</span><ArrowRight className='size-4' />
						</Link>
					</motion.div>
				</div>
			</section>

			{/* ===== ABOUT ===== */}
			<section id='about' className='px-6 py-20'>
				<div className='mx-auto max-w-4xl'>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
						className='mb-10 text-center'>
						<p className='mb-2 text-sm font-medium text-brand/80'>About</p>
						<h2 className='text-3xl font-bold text-primary'>关于我</h2>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
						className='rounded-2xl border border-border/80 bg-card p-8 shadow-sm'>
						<div className='mb-6 flex items-center gap-4'>
							<div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-orange-100 dark:bg-orange-900/30'>
								<img src='/images/blogger/avatar.jpg' alt='Amelia' className='h-full w-full object-cover' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-primary'>{site.name}</h3>
								<p className='text-sm text-muted'>武汉大学 · 信息管理与信息系统</p>
							</div>
						</div>
						<div className='space-y-3'>
							{profile.detailedBio.map((p, i) => (
								<p key={i} className='text-sm leading-relaxed text-muted'>{p}</p>
							))}
						</div>

						{/* 荣誉摘要 */}
						<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
							className='mt-6 border-t border-border/60 pt-5'>
							<div className='mb-3 flex items-center gap-2'>
								<Award className='size-4 text-brand' />
								<h4 className='text-sm font-semibold text-primary'>获奖荣誉</h4>
							</div>
							<div className='flex flex-wrap gap-2'>
								{awards.slice(0, 4).map((award, i) => (
									<span key={i}
										className='inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs text-muted dark:bg-white/5'>
										{award.title}
										{award.year && <span className='text-[10px] text-brand/70'>{award.year}</span>}
									</span>
								))}
								{awards.length > 4 && (
									<span className='inline-flex items-center rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs text-muted/60 dark:bg-white/5'>
										+{awards.length - 4} 项
									</span>
								)}
							</div>
							<div className='mb-2 mt-4 flex items-center gap-2'>
								<Award className='size-4 text-brand' />
								<h4 className='text-sm font-semibold text-primary'>个人荣誉</h4>
							</div>
							<div className='flex flex-wrap gap-2'>
								{personalHonors.slice(0, 3).map((h, i) => (
									<span key={i}
										className='inline-flex items-center rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs text-muted dark:bg-white/5'>
										{h.title}
									</span>
								))}
								{personalHonors.length > 3 && (
									<span className='inline-flex items-center rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs text-muted/60 dark:bg-white/5'>
										+{personalHonors.length - 3} 项
									</span>
								)}
							</div>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
							className='mt-5 text-center'>
							<Link href='/about' className='inline-flex items-center gap-1 text-sm text-brand/80 hover:text-brand'>
								<span>查看全部</span><ArrowRight className='size-4' />
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* ===== CONTACT ===== */}
			<section id='contact' className='bg-bg/50 px-6 py-20'>
				<div className='mx-auto max-w-2xl text-center'>
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
						<p className='mb-2 text-sm font-medium text-brand/80'>Contact</p>
						<h2 className='mb-4 text-3xl font-bold text-primary'>联系我</h2>
						<p className='mb-8 text-sm text-muted'>如果你对我的项目或文章感兴趣，欢迎联系。</p>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
						className='flex flex-col items-center gap-3'>
						<a href={`mailto:${social.email}`}
							className='inline-flex w-72 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm text-secondary shadow-sm transition-all hover:border-brand/50 hover:text-brand'>
							<Mail className='size-4' />{social.email}</a>
						<a href={social.github} target='_blank' rel='noopener noreferrer'
							className='inline-flex w-72 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm text-secondary shadow-sm transition-all hover:border-brand/50 hover:text-brand'>
							<Github className='size-4' />GitHub</a>
					</motion.div>
				</div>
			</section>

			{/* ===== FOOTER ===== */}
			<footer className='border-t border-border bg-bg/50 px-6 py-8 text-center text-sm text-muted'>
				<p>&copy; {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
			</footer>
		</div>
	)
}
