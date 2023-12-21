import { Grid, List, ListItem, Typography, Divider, Box, Link as MuiLink } from '@mui/material'
import { Strapi__Component_Layout_Footer } from 'gatsby-graphql'
import React from 'react'
import Image from '../image'
import CustomLink from './custom-link'
import { theme } from 'src/theme/ThemeProvider'
import TextModal from './text-modal'
import { Icon } from './icon'
import { BsDiscord } from 'react-icons/bs'

interface IFooterProps {
  footer: Strapi__Component_Layout_Footer
}

const Footer: React.FC<IFooterProps> = ({ footer }) => {
  return (
    <Grid
      container
      component="footer"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 4, md: 2 }}
      sx={{ paddingBottom: '50px' }}
    >
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Divider
          sx={{
            width: '100vw',
            background: theme.palette.common.white,
            opacity: '25%',
            height: '1px',
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Image style={{ maxWidth: 64, maxHeight: 64 }} media={footer?.Logo} />
      </Grid>

      <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider
          sx={{
            margin: 2,
            borderColor: theme.palette.divider,
            borderStyle: 'dashed',
            opacity: '20%',
            border: 'none',
            height: '1px',
            background: `repeating-linear-gradient(90deg,${theme.palette.divider},${theme.palette.divider} 6px,transparent 6px,transparent 12px)`,
          }}
        />
        <Grid component={List} container justifyContent="center">
          {footer?.Links?.map((link) => (
            <Grid item xs="auto" component={ListItem} key={link.id}>
              <CustomLink
                link={link}
                sx={{ width: '100%', paddingY: 2, textDecoration: 'none', color: 'text.primary' }}
              >
                {link.text}
              </CustomLink>
            </Grid>
          ))}
          {footer?.ModalLinks?.map((link) => (
            <Grid item xs="auto" component={ListItem} key={link.id}>
              <Box sx={{ width: '100%', paddingY: 2, textDecoration: 'none', color: 'text.primary' }}>
                <TextModal modalLink={link} />
              </Box>
            </Grid>
          ))}
          <Grid item xs="auto" component={ListItem} key={footer?.PrivacyPolicy?.id}>
            <Box sx={{ width: '100%', paddingY: 2, textDecoration: 'none', color: 'text.primary' }}>
              <TextModal modalLink={footer?.PrivacyPolicy} />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center', gap: '12px' }}
      >
        <CustomLink link={footer?.TwitterLink}>
          <Icon icon="twitter" />
        </CustomLink>
        <CustomLink link={footer?.DiscordLink}>
          <BsDiscord style={{ color: 'white', width: '24px', height: '24px' }} />
        </CustomLink>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ textTransform: { xs: 'uppercase', md: 'none' } }}>{footer?.SmallText}</Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
