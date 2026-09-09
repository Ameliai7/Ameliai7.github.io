import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Noto_Serif_SC } from 'next/font/google'
import Layout from '@/layout'

const notoSerifSC = Noto_Serif_SC({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-noto-serif-sc'
})

export const metadata: Metadata = {
	title: '陈鹳嫒',
	description: '陈鹳嫒 的个人空间 — 数据分析 / 产品经理方向',
	openGraph: {
		title: '陈鹳嫒',
		description: '陈鹳嫒 的个人空间'
	},
	twitter: {
		title: '陈鹳嫒',
		description: '陈鹳嫒 的个人空间'
	}
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='zh-CN' suppressHydrationWarning className={notoSerifSC.variable}>
			<head>
				{/* 防闪烁脚本：在 React 加载前同步主题 */}
				<script dangerouslySetInnerHTML={{
					__html: `
						(function() {
							try {
								var theme = localStorage.getItem('amelia-theme');
								if (theme === 'dark') {
									document.documentElement.classList.add('dark');
								} else {
									document.documentElement.classList.remove('dark');
								}
							} catch(e) {}
						})();
					`
				}} />
			</head>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
