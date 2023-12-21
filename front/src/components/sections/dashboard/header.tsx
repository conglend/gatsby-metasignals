import RichText from '@/components/elements/rich-text'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Dashboard_Header } from 'gatsby-graphql'
import React from 'react'
import LiveCounter from './liveCounter'

export const Header = (props: Strapi__Component_Dashboard_Header & { data: any; alertsGenerated: number }) => {
  return (
    <>
      <Grid container sx={{ gap: '30px' }}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>
            <RichText markdown={props?.SubTitle.data.SubTitle} />
          </Typography>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{props?.Title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: { md: '35%', xs: '100%' }, margin: 'auto' }}>
            <LiveCounter to={props?.alertsGenerated || 1434} duration={3000} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
