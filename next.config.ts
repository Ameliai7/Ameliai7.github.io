import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// 静态导出模式 — 适配 GitHub Pages
	output: 'export',
	// 关闭图片优化（静态导出不支持）
	images: {
		unoptimized: true
	},
	// 路径尾部添加斜杠（GitHub Pages 兼容）
	trailingSlash: true,

	devIndicators: false,
	reactStrictMode: false,
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	typescript: {
		ignoreBuildErrors: true
	},
	experimental: {
		scrollRestoration: false
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		},

		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', 'css']
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: '@svgr/webpack', options: { svgo: false } }]
		})

		return config
	}
}

export default nextConfig
