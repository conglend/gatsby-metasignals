import React, { useState } from 'react'
import CustomLink from './custom-link'
import { Strapi__Component_Layout_Navbar } from 'gatsby-graphql'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Icon } from './icon'
import { navigate } from 'gatsby'
import { IPageContext } from '@/types/pages'
import { localizePath } from '@/utils/localize'
import TextModal from './text-modal'

interface IMobileNavMenuProps {
  navbar: Strapi__Component_Layout_Navbar
  mobileMenuIsShown: boolean
  setMobileMenuIsShown: React.Dispatch<React.SetStateAction<boolean>>
  drawerWidth: number
  pageContext: IPageContext
}

const MobileNavMenu: React.FC<IMobileNavMenuProps> = ({
  navbar,
  mobileMenuIsShown,
  setMobileMenuIsShown,
  drawerWidth,
  pageContext,
}) => {
  const locales = pageContext?.locales
  const defaultLocale = pageContext?.defaultLocale
  const slug = pageContext?.slug || ''

  const [selectedLanguage, setSelectedLanguage] = useState(
    (typeof localStorage !== `undefined` && localStorage.getItem('locale')) || defaultLocale,
  )

  const handleLanguageChange = (locale: string) => {
    if (typeof localStorage !== `undefined`) localStorage.setItem('locale', locale)
    setSelectedLanguage(locale)
    navigate(localizePath(locale, defaultLocale, slug))
  }

  return (
    <Drawer
      sx={{
        '.MuiDrawer-root': {
          backgroundColor: 'grey.500',
        },
        width: drawerWidth,
        flexShrink: 0,
        '.MuiDrawer-paper': {
          backgroundColor: 'grey.500',
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      variant="temporary"
      onClose={() => setMobileMenuIsShown(false)}
      anchor="right"
      open={mobileMenuIsShown}
    >
      <Box sx={{ backgroundColor: 'grey.500', flex: 1, overflowY: 'auto' }}>
        <Box
          sx={{
            paddingX: 2,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(53,57,65,1) 25%)',
            height: '100%',
          }}
        >
          <List
            sx={{
              paddingX: 1,
            }}
          >
            <ListItem
              key={'language_select'}
              sx={{
                flexGrow: 1,
                flexDirection: 'column',
                paddingLeft: '8px',
                alignItems: 'flex-start',
                justifyContent: 'flexStart',
              }}
            >
              <Accordion
                sx={{
                  backgroundColor: 'grey.500',
                  boxShadow: 'none',
                  background: 'transparent',
                  '& div': {
                    padding: '0',
                  },
                }}
              >
                <AccordionSummary expandIcon={<Icon icon="chevronDown" color="white" />}>
                  Language
                  <Typography sx={{ fontWeight: 'bold', marginLeft: '5px', marginRight: '5px' }}>
                    {selectedLanguage}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {locales?.map((lang) => (
                    <ListItem key={lang} onClick={() => handleLanguageChange(lang)}>
                      <Typography sx={{ fontWeight: lang == selectedLanguage ? 'bold' : 'inherit' }}>{lang}</Typography>
                    </ListItem>
                  ))}
                </AccordionDetails>
              </Accordion>
            </ListItem>
            {navbar?.Links?.map((navLink) => (
              <ListItem key={navLink.id} sx={{ flexGrow: 1, flexDirection: 'column', padding: 0 }}>
                <CustomLink
                  link={navLink}
                  sx={{ width: '100%', paddingX: 1, paddingY: 1, textDecoration: 'none', color: 'text.primary' }}
                >
                  {navLink.text}
                </CustomLink>
                <Divider sx={{ width: '100%', borderColor: 'grey.50', opacity: 0.2 }} />
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              paddingX: 1,
            }}
          >
            {navbar?.MobileFooterLinks?.map((navLink) => (
              <ListItem
                key={navLink.id}
                sx={{
                  flexGrow: 1,
                  flexDirection: 'column',
                  padding: 0,
                }}
              >
                <CustomLink
                  link={navLink}
                  sx={{
                    width: '100%',
                    paddingX: 1,
                    paddingY: 0.5,
                    textDecoration: 'none',
                    color: 'text.primary',
                    opacity: 0.6,
                  }}
                >
                  {navLink.text}
                </CustomLink>
              </ListItem>
            ))}
            {navbar?.MobileFooterModalLink?.map((link) => (
              <ListItem
                key={'modal' + link.id}
                sx={{
                  flexGrow: 1,
                  flexDirection: 'column',
                  padding: 0,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    paddingX: 1,
                    paddingY: 0.5,
                    textDecoration: 'none',
                    color: 'text.primary',
                    opacity: 0.6,
                  }}
                >
                  <TextModal modalLink={link} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MobileNavMenu
