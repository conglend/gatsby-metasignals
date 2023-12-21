import React, { useContext, useState } from 'react'
import Image from '../image'
import CustomLink from './custom-link'
import { Link as MuiLink } from '@mui/material'
import { Strapi__Component_Layout_Navbar } from 'gatsby-graphql'
import {
  AppBar,
  List,
  Toolbar,
  ListItem,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Theme,
} from '@mui/material'
import { BsDiscord } from 'react-icons/bs'
import { TiThMenu } from 'react-icons/ti'
import { Icon } from './icon'
import { IconButton } from 'gatsby-theme-material-ui'
import { navigate } from 'gatsby'
import { IPageContext } from '@/types/pages'
import { localizePath } from '@/utils/localize'
import ThemeTypeContext from '../themeTypeContext'

interface IMobileNavMenuProps {
  navbar: Strapi__Component_Layout_Navbar
  setMobileMenuIsShown: React.Dispatch<React.SetStateAction<boolean>>
  mobileMenuIsShown: boolean
  pageContext: IPageContext
  theme: Theme
}

const Navbar: React.FC<IMobileNavMenuProps> = ({
  navbar,
  setMobileMenuIsShown,
  mobileMenuIsShown,
  pageContext,
  theme,
}) => {
  const locales = pageContext?.locales
  const defaultLocale = pageContext?.defaultLocale
  const slug = pageContext?.slug || ''

  const { theme: themeType } = useContext(ThemeTypeContext)

  const [selectedLanguage, setSelectedLanguage] = useState(
    (typeof localStorage !== `undefined` && localStorage.getItem('locale')) || defaultLocale,
  )

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const locale = event.target.value
    if (typeof localStorage !== `undefined`) localStorage.setItem('locale', locale)
    setSelectedLanguage(locale)
    navigate(localizePath(locale, defaultLocale, slug))
  }


  return (
    <>
      <AppBar position="static" sx={{ display: { xs: 'block', md: 'none' }, boxShadow: 'none' }} color="transparent">
        <Toolbar sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" to={navbar?.HomePageUrl || '/'}>
            <Image style={{ height: 40, maxWidth: 120 }} media={navbar?.Logo} />
          </IconButton>
          {!mobileMenuIsShown && (
            <IconButton onClick={() => setMobileMenuIsShown(true)} edge="start" color="inherit" aria-label="menu">
              <TiThMenu size={40} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <AppBar
        position="static"
        sx={{ display: { xs: 'none', md: 'block' }, boxShadow: 'none', minHeight: 'none' }}
        color="transparent"
      >
        <Toolbar
          sx={{
            width: { lg: 1140, xs: 900 },
            maxWidth: 1140,
            margin: 'auto',
            justifyContent: 'space-between',
            position: 'relative',
            '&::before': {
              height: '1px',
              backgroundColor: 'rgb(0,0,0,.2)',
              content: '""',
              position: 'absolute',
              bottom: '0',
              left: 'calc((100% - 100vw)/2)',
              width: '100vw',
            },
          }}
          disableGutters
        >
          <IconButton sx={{ width: 'auto' }} edge="start" disableRipple to={navbar?.HomePageUrl || '/'}>
            <Image style={{ minHeight: 40, maxHeight: 60, minWidth: 120, maxWidth: 160 }} media={navbar?.LogoDesktop} />
          </IconButton>
          <List
            sx={{
              paddingY: 0,
              display: 'flex',
            }}
          >
            {navbar?.Links?.map((navLink) => (
              <ListItem key={navLink.id} sx={{ width: 'auto', padding: 0, paddingX: { md: 1, lg: 2 } }}>
                <CustomLink
                  link={navLink}
                  sx={{ paddingY: 4, textDecoration: 'none', color: 'text.primary' }}
                  activeStyle={{
                    fontWeight: 'bold',
                    borderBottom: `3px ${theme.palette.primary.main} solid`,
                    marginTop: '3px',
                  }}
                >
                  {navLink.text}
                </CustomLink>
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              paddingY: 0,
              display: 'flex',
              // alignItems:'center'
            }}
          >
            <ListItem sx={{ padding: 0 }} key={selectedLanguage}>
              <Select
                value={selectedLanguage}
                sx={{ '& fieldset': { border: 'none' } }}
                onChange={handleLanguageChange}
                MenuProps={{
                  sx: {
                    '& ul': {
                      width: '150px',
                    },
                    '& li': {
                      width: '80%',
                      margin: 'auto',
                      textAlign: 'center',
                      borderRadius: '4px',
                      alignItems: 'center',
                    },
                    '& li.Mui-selected': {
                      background:
                        themeType === 'lite'
                          ? `${theme.palette.secondary.main} !important`
                          : theme.palette.background.default,
                    },
                  },
                }}
              >
                {locales?.map((lang: string) => (
                  <MenuItem value={lang} key={lang}>
                    <Typography sx={{ margin: 'auto' }}>{lang}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  padding: 0,
                  borderColor: themeType === 'lite' ? theme.palette.text.disabled : theme.palette.divider,
                }}
              />
            </ListItem>
            <ListItem sx={{ display: 'flex', gap: '16px' }}>
              <CustomLink
                link={navbar?.TwitterLink}
                style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
              >
                <Icon icon="twitter" />
              </CustomLink>
              <CustomLink
                link={navbar?.DiscordLink}
                style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
              >
                <BsDiscord style={{ color: 'white', width: '24px', height: '24px' }} />
              </CustomLink>
            </ListItem>
          </List>
        </Toolbar>
        <Divider
          sx={{
            width: '100vw',
            background: theme.palette.common.white,
            opacity: '25%',
            height: '1px',
          }}
        />
      </AppBar>
    </>
  )
}

export default Navbar
