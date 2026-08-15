import '@/styles/globals.css'

import type { Metadata } from 'next'
import Layout from '@/layout'

export const metadata: Metadata = {
	title: 'Amelia',
	description: 'Amelia 的个人空间 — 数据分析 / 产品经理方向',
	openGraph: {
		title: 'Amelia',
		description: 'Amelia 的个人空间'
	},
	twitter: {
		title: 'Amelia',
		description: 'Amelia 的个人空间'
	}
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='zh-CN' suppressHydrationWarning>
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
