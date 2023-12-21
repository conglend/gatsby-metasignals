import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Layout_Cookies, Strapi__Component_Links_Modal_Link } from 'gatsby-graphql'
import React from 'react'
import { Icon } from './icon'
import InlineTextModal from './inline-text-modal'

interface ICookieBannerProps {
  data: Strapi__Component_Layout_Cookies
  privacyPolicy: Strapi__Component_Links_Modal_Link
  handleClick: () => void
}
export const CookieBanner = ({ data, handleClick, privacyPolicy }: ICookieBannerProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: 'rgba(11, 12, 13, 0.5)',
        padding: '20px',
      }}
    >
      <Grid
        container
        sx={{
          marginLeft: {
            lg: 'calc((100vw - 1140px)/2)',
            md: 'calc((100vw - 900px)/2)',
          },
          width: {
            lg: '1140px',
            md: '900px',
          },
        }}
      >
        <Grid item xs={10}>
          <Typography sx={{ fontSize: { md: '16px', lg: '20px' } }}>
            {data?.Consent}
            <span style={{ textDecoration: 'inherit', color: '#92B2EC' }}>
              <InlineTextModal modalLink={{ ...privacyPolicy, LinkText: data?.TermsLink?.label }} />
            </span>
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ marginLeft: 'auto', paddingRight: '40px' }} onClick={handleClick}>
          <Icon icon="close" />
        </Grid>
      </Grid>
    </Box>
  )
}
