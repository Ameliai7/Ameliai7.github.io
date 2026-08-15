# Amelia 的个人网站

[![Deploy to GitHub Pages](https://github.com/Ameliai7/Ameliai7.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ameliai7/Ameliai7.github.io/actions/workflows/deploy.yml)

Amelia 的个人空间 — 数据分析 / 产品经理方向。基于 Next.js 构建，静态导出后部署到 GitHub Pages。

## 在线访问

- 网站：<https://ameliai7.github.io>
- 仓库：<https://github.com/Ameliai7/Ameliai7.github.io>

## 技术栈

- **Next.js 16**（`output: 'export'` 静态导出）
- **Tailwind CSS 4**（深色 / 浅色模式自动切换）
- **Motion** 页面动效
- **Shiki** 代码高亮、**KaTeX** 数学公式
- **GitHub Pages** 自动部署

## 本地开发

```bash
pnpm install
pnpm dev      # 开发服务器 http://localhost:2025
pnpm build    # 静态导出到 out/
pnpm start    # 本地预览 out/ 产物
```

## 内容维护

- 博客文章数据：`public/blogs/index.json`
- 站内文章：`public/blogs/{slug}/index.md` + `config.json`
- 微信公众号文章：配置 `externalUrl`，点击卡片直接跳转原文
- 站点配置：`src/data/site.ts`、`src/config/site-content.json`
- 个人信息：`src/data/profile.ts`、`src/data/experience.ts`、`src/data/honors.ts`

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages（需在仓库 Settings → Pages 中将 Source 设为 **GitHub Actions**）。

> 本站由 [2025 Blog](https://github.com/YYsuni/2025-blog-public) 项目改造而来，在此致谢。
