/**
 * 项目数据
 *
 * 每个项目包含首页卡片展示信息 + 详情页完整内容
 * 详情页内容按章节组织，支持图文混排
 */
export interface Project {
	slug: string
	title: string
	number: string
	summary: string
	tags: string[]
	cover?: string
	gallery?: { src: string; alt: string; caption?: string }[]
	role: string
	links?: {
		website?: string
		github?: string
	}
	chapters: ProjectChapter[]
}

export interface ProjectChapter {
	number: string
	title: string
	content: string[]
	images?: { src: string; alt: string; caption?: string }[]
}

export const projects: Project[] = [
	{
		slug: 'policy-qa-platform',
		title: '全球政策智能观测与服务平台',
		number: '01',
		summary: '"全球政策智能观测与服务平台"是一个面向政策信息整合、智能检索与场景化问答的项目。平台以全球政策信息为对象，结合检索增强生成技术，覆盖政府情报、民众查询、企业规范和研究信息四类场景；在工程实现上采用分层架构、混合检索、结构化输出、接口服务与前端展示，使政策查询从传统关键词搜索升级为可追踪、可解释、可复用的智能服务。',
		tags: ['Python', 'RAG', 'Hybrid Search', 'FastAPI', 'Streamlit', 'SQLite'],
		cover: '/images/project/policy-qa-home.png',
		role: '项目负责人',
		chapters: [
			{
				number: '01',
				title: '项目定位与应用场景',
				content: [
					'项目针对政策信息跨地区、跨语言、跨部门分散的问题，建立以政策知识库为核心的智能服务平台。用户不需要在大量政策原文中逐条筛选，而是可以通过自然语言问题获取结构化解读、适用建议和来源依据。',
					'平台服务对象被明确拆分为四类：政府情报场景强调政策要点、执行难点和风险提示；民众查询场景强调口语化解释、受益人群和办理建议；企业规范场景强调合规义务、风险识别和行动建议；研究信息场景强调主题归纳、证据追踪和研究线索整理。'
				]
			},
			{
				number: '02',
				title: '系统架构与接口能力',
				content: [
					'项目采用清晰的分层架构：数据层负责政策数据采集、清洗、字段抽取和知识库维护；检索层负责向量检索与关键词检索的组合召回；生成层负责基于检索证据构造提示词并生成结构化回答；服务层通过接口与前端承接用户查询。',
					'FastAPI 文档展示了接口化能力，说明项目不只停留在脚本层，而是已经具备服务化雏形。API 层可以将检索、问答、知识库状态等能力提供给前端或其它系统调用，使政策问答平台具备进一步扩展为正式产品的基础。'
				],
				images: [
					{ src: '/images/project/policy-qa-api-docs.png', alt: 'FastAPI 文档界面', caption: 'FastAPI 文档界面展示项目已经具备接口服务与模块化调试能力。' }
				]
			},
			{
				number: '03',
				title: '知识库与混合检索',
				content: [
					'项目将 RAG 技术用于政策信息服务，通过向量检索与关键词检索的结合提升召回率和精准度。向量检索负责理解语义相近的政策片段，关键词检索负责保证术语、机构名、政策类型等硬匹配信息不被遗漏。',
					'在系统实现上，HybridRetriever 承担组合逻辑：先对政策标题、正文和字段信息进行切分与向量化，再根据查询内容融合不同检索结果。配合分片索引、动态更新和检索质量控制，平台能够在政策数据不断增长时保持可检索性和响应效率。'
				],
				images: [
					{ src: '/images/project/policy-qa-structure.png', alt: '项目结构截图', caption: '项目结构截图展示了前端、接口、知识库、检索与问答模块的组织关系。' }
				]
			},
		]
	},
	{
		slug: 'smart-toilet',
		title: '智慧厕所信息系统',
		number: '02',
		summary: '基于 Spring Boot + Vue 3 的智慧公厕运维管理系统，覆盖清洁/维修任务闭环、设备实时监控、数据可视化大屏与智能排班，推动公厕管理从被动响应转向主动服务。',
		tags: ['Spring Boot', 'Vue 3', 'Element Plus', 'WebSocket', 'JWT', 'ECharts', 'MySQL'],
		role: '信息系统设计与开发',
		chapters: [
			{
				number: '01',
				title: '项目背景',
				content: [
					'随着"厕所革命"的推进和智慧城市建设的提速，传统公厕运维的痛点日益突出：人工巡检效率低、任务分配不均衡（女厕排队、男厕闲置）、设备故障响应滞后、缺乏数据沉淀来优化排班和资源配置。',
					'本项目面向市政环卫、景区、商圈等多类场景，基于 Spring Boot + Vue 3 技术栈，开发了一套覆盖清洁、维修、排班、监控全流程的智慧公厕运维管理系统。系统以运维调度员、保洁员、维修员、监管员为核心用户，打通管理端与执行端的数据壁垒，实现任务流转、设备监控与智能排班的一体化管理。'
				]
			},
			{
				number: '02',
				title: '系统功能设计',
				content: [
					'系统划分为管理员、调度员、保洁员、维修员、监管员五类角色，基于 RBAC 权限模型 + JWT 认证保障操作安全。',
					'用户管理：手机号注册登录、角色权限分配、操作日志追踪。',
					'任务管理：清洁与维修任务全生命周期流转（待分配→已接单→执行中→待审核→已完成），支持手动分配与自动推荐，执行人需上传现场照片。',
					'设备监控：接入温湿度、氨气、硫化氢等环境传感器，支持报警阈值配置与短信/站内信双重提醒，报警自动生成维修工单形成闭环。',
					'数据统计：按日/周/月统计任务完成率、人均负载、设备故障频率、使用高峰时段，ECharts 可视化呈现，支持 Excel 导出。',
					'排班建议：基于历史数据预测各时段运维需求，结合人员技能与地理位置生成排班方案，可手动调优。'
				],
				images: [
					{ src: '/images/project/1.核心看板_1.png', alt: '监管端数据看板', caption: '监管端数据可视化看板' }
				]
			},
			{
				number: '03',
				title: '技术方案',
				content: [
					'后端：Java + Spring Boot 构建 RESTful API，JWT 无状态鉴权；MySQL 存储业务数据，设计了用户、任务、设备、工单等核心数据表。任务流转采用状态机模式，用消息队列重试机制解决并发场景下的状态一致性问题。',
					'前端：Vue 3 + Element Plus 开发保洁员端、维修员端、用户端、监管员端共四个终端的响应式界面。ECharts 实现多维度数据图表，集成第三方地图 API 实现公厕地理位置检索与路线规划导航。',
					'实时通信：WebSocket 推送任务状态变更，确保多端数据同步；前端对上传图片做压缩处理，解决移动端上传慢、易失败的问题。'
				],
				images: [
					{ src: '/images/project/smart-toilet-2.png', alt: '数据库 E-R 图', caption: '核心数据表 E-R 关系设计' },
					{ src: '/images/project/2.厕所查询_1.png', alt: '地图与导航界面', caption: '基于地理位置的公厕检索与路线导航' }
				]
			},
			{
				number: '04',
				title: '项目成果',
				content: [
					'完成智慧公厕运维管理系统全功能开发，覆盖用户管理、任务管理、设备监控、数据统计、排班建议五大子系统。',
					'实现清洁/维修任务从创建、分配到审核的全流程闭环，大幅提升运维响应效率。',
					'构建监管端数据可视化大屏，支持按时间维度动态切换，直观呈现核心运营指标。',
					'集成地图 API 实现公厕定位检索、厕位占用实时展示与路线规划。'
				],
				images: [
					{ src: '/images/project/1.核心看板_2.png', alt: '监管端综合看板', caption: '监管端综合运营数据看板' },
					{ src: '/images/project/4.任务调度_1.png', alt: '任务管理界面', caption: '清洁/维修任务列表与状态流转' },
					{ src: '/images/project/6.报表与考核_1.png', alt: '数据报表界面', caption: '多维度数据统计与可视化分析' },
					{ src: '/images/project/5.决策支持_1.png', alt: '智能排班界面', caption: '基于历史数据的智能排班与决策支持' },
					{ src: '/images/project/2.资源与设施_1.png', alt: '设备与设施管理', caption: '公厕设备与设施信息管理' },
					{ src: '/images/project/3.人员管理_1.png', alt: '人员与权限管理', caption: '多角色人员管理与 RBAC 权限配置' },
					{ src: '/images/project/三-保洁员端_1.png', alt: '保洁员移动端', caption: '保洁员移动端工作界面' }
				]
			}
		]
	},
	{
		slug: 'tech-news-platform',
		title: '科技资讯聚合平台',
		number: '03',
		summary: '多来源科研资讯的一站式聚合阅读与智能分析平台，面向科研人员与科技情报分析人员，提供统一的阅读入口、高效的多维筛选工具和 AI 智能分析能力。',
		tags: ['React', 'TypeScript', 'Vite', 'Ant Design'],
		role: '前端开发（独立负责）',
		gallery: [
			{ src: '/images/project/tech-news-browse.png', alt: '全局浏览页 — 学科筛选与资讯详情', caption: '全局浏览页：左侧学科/专辑筛选，中间资讯列表，右侧详情预览' },
			{ src: '/images/project/tech-news-home.png', alt: '个人首页 — 关注内容与概览', caption: '个人首页：今日概览、关注更新与热门资讯列表' },
		],
		chapters: [
			{
				number: '01',
				title: '产品定位',
				content: [
					'科研科技资讯聚合平台是面向科研人员与科技情报分析人员的一站式聚合阅读与分析平台。平台汇聚多来源、多学科的科研动态与科技安全资讯，提供统一的阅读入口、高效的筛选工具和智能化的分析能力，帮助用户从分散的信息来源中高效获取科技情报。',
					'平台初始数据库规模达 386K+ 条记录，覆盖生物安全、基础研究、先进能源、同位素、国际科技安全观察等多个学科领域。后端采用 Spring Boot 提供 RESTful API，前端采用 React 框架实现交互展示层，前后端分离开发。',
				]
			},
			{
				number: '02',
				title: '产品目标',
				content: [
					'<table><thead><tr><th>目标</th><th>说明</th></tr></thead><tbody><tr><td><strong>信息聚合</strong></td><td>汇聚数据库已有科技资讯，提供统一的阅读入口，解决研究人员从分散来源获取情报的痛点</td></tr><tr><td><strong>高效阅读</strong></td><td>提供流畅、舒适的阅读体验，支持多维筛选（学科/专辑/日期）与排序</td></tr><tr><td><strong>智能分析</strong></td><td>接入自研 AI 智能体，辅助用户理解与分析资讯内容</td></tr><tr><td><strong>社区协作</strong></td><td>构建用户社区，支持评论、点赞、收藏、分享等互动行为</td></tr></tbody></table>',
				]
			},
			{
				number: '03',
				title: '核心功能',
				content: [
					'<strong>1. 双页面架构</strong>：个人首页（聚焦关注内容 + 全站概览）与全局浏览（完整的学科 × 专辑多选筛选），通过顶部导航快速切换。',
					'<strong>2. 三栏响应式布局</strong>：左侧专辑/学科筛选栏 + 中间新闻列表 + 右侧详情面板，适配桌面（≥1200px）、平板（768–1199px）、移动端（≤767px）三档断点。',
					'<strong>3. 多维筛选体系</strong>：支持学科分类多选、专辑 Checkbox 多选、日期范围筛选，以及按最新 / 最多点赞排序，分页每页 50 条。',
					'<strong>4. 三级权限控制</strong>：RBAC 角色体系（访客 / 普通用户 / 管理员）。访客可浏览标题与基础元数据，登录后可查看全文、AI 分析结果，参与评论与互动。',
					'<strong>5. AI 智能分析面板</strong>：接入 AI 智能体，自动提取文章关键词、涉及国家、所属机构、结构化摘要，支持折叠与缓存。',
					'<strong>6. 用户社区互动</strong>：支持评论（嵌套回复）、点赞（心跳动画）、收藏、分享，个人中心可查看收藏与评论历史。',
					'<strong>7. 双轨认证体系</strong>：科技云通行证 OAuth2 一键登录 + 本地账密登录，JWT 无状态鉴权，Access Token 2 小时 + Refresh Token 7 天，401 自动刷新与重放队列。',
					'<strong>8. 深色/浅色主题</strong>：基于 CSS 变量实现完整深浅色主题切换，localStorage 持久化，全站路由与页面自动跟随。',
				]
			},
			{
				number: '04',
				title: '技术架构',
				content: [
					'<table><thead><tr><th>层面</th><th>技术选型</th></tr></thead><tbody><tr><td><strong>前端构建</strong></td><td>Vite 8</td></tr><tr><td><strong>前端语言</strong></td><td>TypeScript 6</td></tr><tr><td><strong>UI 框架</strong></td><td>React 19 + Ant Design 5</td></tr><tr><td><strong>路由</strong></td><td>react-router-dom v7</td></tr><tr><td><strong>状态管理</strong></td><td>React Hooks + Context（认证 / 交互 / 主题）</td></tr><tr><td><strong>后端框架</strong></td><td>Spring Boot 3 + Spring Security + JWT</td></tr><tr><td><strong>数据库</strong></td><td>MariaDB 10.6（docgenerator 库）</td></tr><tr><td><strong>认证</strong></td><td>科技云通行证 OAuth2（Authorization Code）</td></tr></tbody></table>',
				]
			},
		]
	}
]
