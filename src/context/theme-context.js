'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext('light')

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark')
      setDarkTheme()
    } else {
      setTheme('light')
      setLightTheme()
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setDarkTheme()
    } else {
      setTheme('light')
      setLightTheme()
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function setLightTheme() {
  document.documentElement.setAttribute('data-color-scheme', 'light')
  localStorage.setItem('color-theme', 'light')
  document.documentElement.classList.remove('dark')
}

function setDarkTheme() {
  document.documentElement.setAttribute('data-color-scheme', 'dark')
  localStorage.setItem('color-theme', 'dark')
  document.documentElement.classList.add('dark')
}

/**
 * @typedef {Object} ThemeContext
 * @property {string} theme
 * @property {() => void} toggleTheme
 *
 * @returns {ThemeContext}
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    )
  }
  return context
}
