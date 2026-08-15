'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InterestGalleryProps {
	images: string[]
	alt: string
}

const slideVariants = {
	enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.96 }),
	center: { opacity: 1, x: 0, scale: 1 },
	exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.96 }),
}

function useImageNavigation(length: number) {
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	const goTo = useCallback(
		(next: number) => {
			if (length <= 1) return
			const clamped = ((next % length) + length) % length
			setDirection(next > index ? 1 : -1)
			setIndex(clamped)
		},
		[index, length]
	)

	const next = useCallback(() => goTo(index + 1), [goTo, index])
	const prev = useCallback(() => goTo(index - 1), [goTo, index])

	return { index, direction, setDirection, goTo, next, prev }
}

export function InterestGallery({ images, alt }: InterestGalleryProps) {
	const { index, direction, setDirection, goTo, next, prev } = useImageNavigation(images.length)
	const [lightbox, setLightbox] = useState(false)

	// 键盘导航（仅当图片数量大于 1 时生效）
	useEffect(() => {
		if (images.length <= 1) return
		const handler = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') next()
			if (event.key === 'ArrowLeft') prev()
		}
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [next, prev, images.length])

	// 打开灯箱时锁定滚动
	useEffect(() => {
		if (!lightbox) return
		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previous
		}
	}, [lightbox])

	return (
		<div className='flex flex-col gap-3'>
			{/* 主图展示区 */}
			<div className='group relative overflow-hidden rounded-xl border border-border/60 bg-gray-100/60 dark:bg-white/5'>
				<div className='flex h-64 items-center justify-center sm:h-80'>
					<AnimatePresence custom={direction} mode='popLayout' initial={false}>
						<motion.img
							key={images[index]}
							src={images[index]}
							alt={`${alt} ${index + 1}`}
							custom={direction}
							variants={slideVariants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							draggable={false}
							onClick={() => images.length > 1 && setLightbox(true)}
							className={cn(
								'max-h-full max-w-full cursor-pointer select-none object-contain drop-shadow-sm',
								images.length <= 1 && 'cursor-default'
							)}
						/>
					</AnimatePresence>
				</div>

				{/* 左右翻页按钮 */}
				{images.length > 1 && (
					<>
						<button
							type='button'
							aria-label='上一张'
							onClick={prev}
							className='absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/40 text-gray-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/80 hover:text-gray-900 focus-visible:opacity-100 dark:border-white/10 dark:bg-black/40 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-white md:left-3 md:opacity-0 md:group-hover:opacity-100'>
							<ChevronLeft className='size-4' />
						</button>
						<button
							type='button'
							aria-label='下一张'
							onClick={next}
							className='absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/40 text-gray-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/80 hover:text-gray-900 focus-visible:opacity-100 dark:border-white/10 dark:bg-black/40 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-white md:right-3 md:opacity-0 md:group-hover:opacity-100'>
							<ChevronRight className='size-4' />
						</button>

						{/* 页码指示 */}
						<span className='absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur'>
							{index + 1} / {images.length}
						</span>
					</>
				)}
			</div>

			{/* 缩略图导航 */}
			{images.length > 1 && (
				<div className='flex flex-wrap gap-2'>
					{images.map((src, i) => (
						<button
							key={src}
							type='button'
							aria-label={`查看第 ${i + 1} 张`}
							onClick={() => {
								setDirection(i > index ? 1 : -1)
								goTo(i)
							}}
							className={cn(
								'relative h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300',
								i === index
									? 'border-brand opacity-100 shadow-md'
									: 'border-transparent opacity-60 hover:opacity-90'
							)}>
							<img src={src} alt={`${alt} 缩略图 ${i + 1}`} loading='lazy' className='h-full w-full object-cover' />
						</button>
					))}
				</div>
			)}

			{/* 全屏灯箱 */}
			<AnimatePresence>
				{lightbox && images.length > 1 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md'
						onClick={() => setLightbox(false)}>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 12 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: 12 }}
							transition={{ duration: 0.25 }}
							className='relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center px-4 sm:px-16'
							onClick={e => e.stopPropagation()}>
							<AnimatePresence custom={direction} mode='popLayout' initial={false}>
								<motion.img
									key={images[index]}
									src={images[index]}
									alt={`${alt} ${index + 1}`}
									custom={direction}
									variants={slideVariants}
									initial='enter'
									animate='center'
									exit='exit'
									transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									draggable={false}
									className='max-h-[85vh] max-w-full select-none rounded-lg object-contain shadow-2xl'
								/>
							</AnimatePresence>

							<button
								type='button'
								aria-label='上一张'
								onClick={prev}
								className='absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 sm:left-4'>
								<ChevronLeft className='size-5' />
							</button>
							<button
								type='button'
								aria-label='下一张'
								onClick={next}
								className='absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 sm:right-4'>
								<ChevronRight className='size-5' />
							</button>
							<button
								type='button'
								aria-label='关闭'
								onClick={() => setLightbox(false)}
								className='absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:rotate-90 hover:bg-white/25'>
								<X className='size-5' />
							</button>
							<span className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur'>
								{index + 1} / {images.length}
							</span>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
