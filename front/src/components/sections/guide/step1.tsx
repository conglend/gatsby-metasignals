import CustomLink from '@/components/elements/custom-link'
import FadeIn from '@/components/elements/fade-in'
import RichText from '@/components/elements/rich-text'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Guide_Step_1, Strapi__Component_Links_Link } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const Step1 = (props: Strapi__Component_Guide_Step_1) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <FadeIn>
          <Box
            sx={{
              margin: 'auto',
              textAlign: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: theme.palette.success.main,
              marginBottom: '20px',
              position: 'relative',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography fontSize="40px" fontWeight="bold" color={'primary.light'} lineHeight="50px">
              01
            </Typography>
          </Box>
        </FadeIn>
      </Grid>
      <FadeIn>
        <Grid item xs={12} sx={{ marginBottom: { xs: '10px', md: 'inherit' } }}>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}> {props?.MainTitle} </Typography>
          <Typography sx={{ fontSize: '20px', display: 'inline' }}>{props?.SubTitle?.PreLink} </Typography>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', display: 'inline' }}>
            <CustomLink
              link={{ url: props?.SubTitle?.URL } as Strapi__Component_Links_Link}
              style={{ textDecoration: 'inherit', color: 'inherit' }}
            >
              {props?.SubTitle?.LinkLabel}
            </CustomLink>
          </Typography>
        </Grid>
      </FadeIn>
      {props?.DescParagraph?.map((paragraph) => (
        <Grid key={paragraph.id} item xs={12}>
          <Typography
            sx={{ fontSize: { md: '20px', xs: '18px' }, width: { lg: '90%', md: '80%', xs: '100%' }, margin: 'auto' }}
          >
            <RichText markdown={paragraph?.Content?.data?.Content} />
          </Typography>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: { md: '20px', xs: '18px' }, width: { lg: '90%', md: '80%', xs: '100%' }, margin: 'auto' }}
        >
          <RichText markdown={props?.LastDescParagraph?.Content?.data?.Content} />
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Step1
