
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  effectiveTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const [effectiveTheme, setEffectiveTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setEffectiveTheme(systemTheme)
      root.classList.toggle('dark', systemTheme === 'dark')
    } else {
      setEffectiveTheme(theme)
      root.classList.toggle('dark', theme === 'dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const value = {
    theme,
    setTheme,
    effectiveTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
