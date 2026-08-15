/**
 * 荣誉数据
 */
export interface Honor {
	title: string
	year?: string
	category: string
	level: string
}

export const awards: Honor[] = [
	{ title: '全国大学生电工数学建模竞赛 国家级二等奖', year: '2026', category: '竞赛获奖', level: '国家级' },
	{ title: '美国大学生数学建模大赛 H奖（MCM）', year: '2026', category: '竞赛获奖', level: '国际级' },
	{ title: '全国大学生市场调查与分析大赛 省三等奖', year: '2026', category: '竞赛获奖', level: '省级' },
	{ title: '"挑战杯"中国大学生创业计划竞赛 校银奖', year: '2026', category: '竞赛获奖', level: '校级' },
	{ title: '全国大学生电子商务"创新、创意及创业"挑战赛 校二等奖', year: '2026', category: '竞赛获奖', level: '校级' },
	{ title: '中国国际大学生创新大赛 校铜奖', year: '2025', category: '竞赛获奖', level: '校级' },
	{ title: '"珞珈之春"科技节3D建模大赛 校三等奖', year: '2024', category: '竞赛获奖', level: '校级' }
]

export const personalHonors: Honor[] = [
	{ title: '武汉大学社会实践一等奖及优秀个人', year: '2024', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学乙等奖学金（连续两年）', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学优秀学生', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学优秀学生干部（连续两年）', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学三好学生', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学社会活动积极分子', category: '个人荣誉', level: '校级' },
	{ title: '社会实践先进个人', category: '个人荣誉', level: '校级' },
	{ title: '武汉大学优秀共青团员', category: '个人荣誉', level: '校级' }
]
