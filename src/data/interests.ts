/**
 * 兴趣爱好
 */
export interface Interest {
	title: string
	titleCn: string
	description: string
	tags: string[]
	images: string[]
}

export const interests: Interest[] = [
	{
		title: 'Photography',
		titleCn: '摄影',
		description: '喜欢用镜头记录光影与瞬间，在取景与构图之间捕捉那些容易被忽略的细节。',
		tags: ['光影', '构图', '生活记录'],
		images: ['/images/interests/photography/photography-1.jpg']
	},
	{
		title: 'Music',
		titleCn: '音乐',
		description: '音乐是日常生活的底色，练琴、听现场、收藏歌单，让节奏与旋律融入每一天。',
		tags: ['钢琴', '现场演出', '古典与流行'],
		images: [
			'/images/interests/music/music-1.jpg',
			'/images/interests/music/music-2.jpg',
			'/images/interests/music/music-3.jpg'
		]
	},
	{
		title: 'Dance',
		titleCn: '舞蹈',
		description: '在舞动中释放情绪、表达自我，用身体的语言讲述那些无法言说的故事。',
		tags: ['现代舞', '舞台表演', '排练日常'],
		images: [
			'/images/interests/dance/dance-1.jpg',
			'/images/interests/dance/dance-2.jpg',
			'/images/interests/dance/dance-3.jpg',
			'/images/interests/dance/dance-4.jpg'
		]
	}
]
