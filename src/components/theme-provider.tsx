'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'amelia-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>('light')
	const [mounted, setMounted] = useState(false)

	// 初始化：从 localStorage 读取，默认 light
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
		const initial = stored === 'dark' ? 'dark' : 'light'
		setThemeState(initial)
		document.documentElement.classList.toggle('dark', initial === 'dark')
		setMounted(true)
	}, [])

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
		localStorage.setItem(STORAGE_KEY, newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const ctx = useContext(ThemeContext)
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
	return ctx
}
