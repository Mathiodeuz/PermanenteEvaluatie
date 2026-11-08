import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  colorScheme: Theme
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function readTheme(): Theme {
  const savedTheme = localStorage.getItem('mtg-theme')
  return savedTheme === 'dark' ? 'dark' : 'light'
}

/** Provides the app theme and synchronizes it with Mantine and local storage. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<Theme>(readTheme)
  const value = useMemo(
    () => ({
      colorScheme,
      toggleTheme: () => {
        setColorScheme((current) => {
          const next = current === 'light' ? 'dark' : 'light'
          localStorage.setItem('mtg-theme', next)
          return next
        })
      },
    }),
    [colorScheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <MantineProvider forceColorScheme={colorScheme}>{children}</MantineProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
