'use client'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<ThemeProvider>
			<Toaster
				position='bottom-right'
				richColors
				icons={{
					success: <CircleCheckIcon className='size-4' />,
					info: <InfoIcon className='size-4' />,
					warning: <TriangleAlertIcon className='size-4' />,
					error: <OctagonXIcon className='size-4' />,
					loading: <Loader2Icon className='size-4 animate-spin' />
				}}
				style={
					{
						'--border-radius': '12px'
					} as React.CSSProperties
				}
			/>
			<Header />
			<main className='relative min-h-screen bg-bg'>
				{children}
			</main>
		</ThemeProvider>
	)
}
