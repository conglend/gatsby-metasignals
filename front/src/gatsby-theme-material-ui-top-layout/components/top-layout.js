import React, { useState } from 'react'
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout'
import ThemeTypeContext from '../../components/themeTypeContext'

//theme comes from ../theme.js
export default function TopLayout({ children, theme: themes }) {
  const [theme, setTheme] = useState('core')

  return (
    <ThemeTypeContext.Provider value={{ theme, setTheme }}>
      <ThemeTopLayout theme={theme == 'lite' ? themes.liteTheme : themes.theme}>{children}</ThemeTopLayout>
    </ThemeTypeContext.Provider>
  )
}
