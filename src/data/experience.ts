/**
 * 经历数据
 *
 * 按 教育经历 / 学生工作 / 实习经历 / 项目经历 四个维度组织
 */
export interface ExperienceItem {
	type: 'education' | 'student-work' | 'internship' | 'project'
	title: string
	subtitle: string
	period?: string
	details: string[]
	tags?: string[]
}

export const experiences: ExperienceItem[] = [
	// 🎓 教育经历
	{
		type: 'education',
		title: '武汉大学',
		subtitle: '信息管理与信息系统 本科生 · GPA 3.72/4.0',
		details: [
			'信息管理类：信息组织、信息检索、数据库原理、数据结构、智能信息系统',
			'数据分析类：数据挖掘、大数据分析、信息分析',
			'产品/管理类：用户体验设计（UX设计）、人机交互、信息服务与用户',
			'编程与工具：Python | Java | SQL | SPSS'
		],
		tags: ['信息管理', '数据分析', '产品设计']
	},

	// 🏢 学生工作
	{
		type: 'student-work',
		title: '武汉大学自强网络文化工作室',
		subtitle: '品牌推广中心总监',
		details: [
			'对接产品需求，进行产品策划，产出「珞珈攻略」「专交遇见你」等线上小程序+线下活动的品牌产品',
			'运营掌上武大、吃乎、淘课啦三大校园新媒体，进行品牌活动策划',
			'掌上武大是 10W+ 用户基础的武汉大学校园新媒体'
		],
		tags: ['产品策划', '新媒体运营', '品牌推广']
	},

	// 💼 实习经历
	{
		type: 'internship',
		title: '中国科学院武汉文献情报中心',
		subtitle: '前端开发实习生',
		period: '2026.6~2026.8',
		details: [
			'独立负责科技资讯聚合平台前端完整开发，实现多来源科研资讯的一站式聚合阅读与智能分析',
			'使用 Vite 8 搭建项目脚手架，配置 TypeScript 6 类型系统与 ESLint 代码规范，通过路由级 React.lazy 代码分割优化首屏加载性能',
			'基于 Ant Design 6 设计并开发 20+ 功能组件，采用三栏响应式布局（3 断点适配桌面/平板/移动端），实现骨架屏、空状态、加载态等完整 UX 覆盖',
			'使用 React Context + useReducer 管理认证态（JWT+OAuth2）、交互态（点赞/收藏/评论）、主题态（深色/浅色），数据持久化至 sessionStorage/localStorage',
			'设计并实现 RBAC 三级权限体系（访客/用户/管理员），配合路由守卫 AuthGuard 实现页面级与组件级细粒度权限校验',
			'封装统一 HTTP 客户端（axios 风格），内置 JWT 自动刷新 + 401 重放队列，对接 10+ RESTful API 端点',
			'使用 Vitest + @testing-library/react 编写组件与集成测试，覆盖核心交互流程'
		],
		tags: ['React', 'TypeScript', 'Vite', 'Ant Design', 'RBAC']
	},
	{
		type: 'internship',
		title: '武汉海仕德企业管理咨询有限公司',
		subtitle: '专家咨询实习生',
		period: '2025.12~2026.2',
		details: [
			'围绕 AI、数字化转型、医疗健康等垂直领域，识别并联系各领域专家，建立并维护 100+ 专家资源库',
			'参与需求拆解与专家匹配，协调专家与企业客户的一对一电话/线上咨询，累计支持 30+ 个咨询项目落地',
			'对专家访谈内容进行结构化整理，产出行业洞察简报与竞品分析报告，辅助客户战略决策',
			'梳理专家筛选与匹配 SOP，参与团队知识库搭建，提升项目交付效率'
		],
		tags: ['专家网络', '需求分析', '信息整理', '项目管理']
	},

	// 📋 项目经历
	{
		type: 'project',
		title: '全球政策智能观测与服务平台',
		subtitle: '国家级大创项目 · 项目负责人',
		details: [
			'面向全球政策信息分散、检索效率低和更新滞后的问题，构建集政策知识库、混合检索、RAG 问答、多场景服务和接口展示于一体的智能政策平台',
			'采用 Python + FastAPI + Streamlit 技术栈，结合向量数据库实现语义检索',
			'基于 RAG 架构将检索到的政策片段输入大语言模型生成精准答案'
		],
		tags: ['Python', 'RAG', 'FastAPI', 'Streamlit']
	}
]
