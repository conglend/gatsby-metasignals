import { createContext } from 'react'

const ThemeTypeContext = createContext({
  theme: 'core',
  setTheme: (theme: 'core' | 'lite') => {
    return theme
  },
})

export default ThemeTypeContext
