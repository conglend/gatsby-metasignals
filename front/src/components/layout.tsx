import React, { useEffect, useState } from 'react'
import Navbar from './elements/navbar'
import Footer from './elements/footer'
import { Strapi_Global, Strapi_Global_Lite } from 'gatsby-graphql'
import { Box, styled, Theme, ThemeProvider } from '@mui/material'
import MobileNavMenu from './elements/mobile-nav-menu'
import { useIsMobile } from '@/utils/hooks'
import DesktopBackground from './elements/desktop-background'
import { CookieBanner } from './elements/cookie-banner'
import { NoscriptBanner } from './elements/noscript_banner'
import { theme as defaultTheme } from 'src/theme/ThemeProvider'
import { IPageContext } from '@/types/pages'
import { Web3Provider } from '@/utils/web3'
import FinancialAdvicePopup from './sections/FinancialAdvicePopup'

const drawerWidth = 300 //  TODO make responsive?

interface ILayoutProps {
  global: Strapi_Global | Strapi_Global_Lite
  pageContext: IPageContext
  theme: Theme
}

interface IContentProps {
  open?: boolean
}

const Content = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<IContentProps>(({ theme, open }) => ({
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: 0,
  ...(open && {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: `translateX(-${drawerWidth}px)`,
  }),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  marginBottom: 0,
}))

const Layout: React.FC<ILayoutProps> = ({ children, global, pageContext, theme }) => {
  const navbar = global?.Navbar
  const footer = global?.Footer
  const cookies = global?.Cookies

  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMobileMenuIsShown(false)
  }, [isMobile])

  const cookieValidityPeriodInDays = 30

  const [cookieBannerIsShown, setcookieBannerIsShown] = useState(false)
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const cookiesAcceptedAt = localStorage.getItem('cookieConsentAcceptedAt')
      const oldestAcceptedCookieDate = new Date(Date.now() - cookieValidityPeriodInDays * 24 * 60 * 60 * 1000)

      setcookieBannerIsShown(
        !!!cookiesAcceptedAt || parseInt(cookiesAcceptedAt, 10) < oldestAcceptedCookieDate.getTime(),
      )
    }
  }, [setcookieBannerIsShown])

  const hideCookieBanner = () => {
    if (typeof localStorage !== `undefined`)
      localStorage.setItem('cookieConsentAcceptedAt', new Date(Date.now()).getTime().toString())
    setcookieBannerIsShown(false)
  }

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <Web3Provider>
        {/*@ts-ignore*/}
        <Content open={mobileMenuIsShown}>
          {cookieBannerIsShown && (
            <CookieBanner data={cookies} handleClick={hideCookieBanner} privacyPolicy={footer?.PrivacyPolicy} />
          )}
          {!isMobile && <DesktopBackground />}
          <Navbar
            mobileMenuIsShown={mobileMenuIsShown}
            setMobileMenuIsShown={setMobileMenuIsShown}
            navbar={navbar}
            pageContext={pageContext}
            theme={theme}
          />
          <noscript>
            <NoscriptBanner />
          </noscript>
          <FinancialAdvicePopup {...global.FinancialAdvicePopup} />
          <Box
            component="main"
            sx={{
              maxWidth: { lg: 1140, xs: 900 },
              margin: '0 auto',
              padding: { xs: 2, md: 0 },
              marginTop: '64px',
            }}
          >
            {children}
          </Box>
          <Footer footer={footer} />
        </Content>
        {/*@ts-ignore*/}
        {isMobile && (
          <MobileNavMenu
            drawerWidth={drawerWidth}
            navbar={navbar}
            mobileMenuIsShown={mobileMenuIsShown}
            setMobileMenuIsShown={setMobileMenuIsShown}
            pageContext={pageContext}
          />
        )}
      </Web3Provider>
    </ThemeProvider>
  )
}

export default Layout
