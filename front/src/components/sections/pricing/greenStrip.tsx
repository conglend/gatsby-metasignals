import React from 'react'
import { useIsMobile } from '@/utils/hooks'
import { Slide, Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Pricing_Green_Strip } from 'gatsby-graphql'
import Button from '@/components/elements/button'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'

const GreenStrip = (props: Strapi__Component_Pricing_Green_Strip) => {
  const isMobile = useIsMobile()

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={1000}>
      <Box
        sx={{
          width: '100vw',
          backgroundColor: theme.palette.success.main,
          marginLeft: 'calc((-100vw + 100%)/2)',
          paddingTop: { md: '50px', xs: '20px' },
          paddingBottom: '40px',
          marginY: '50px',
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { xs: 'inherit', md: 'center' },
            alignContent: { xs: 'space-between', md: 'inherit' },
            maxWidth: { lg: 1140, xs: 900 },
            margin: '0 auto',
            padding: isMobile ? 2 : 0,
            height: '100%',
          }}
        >
          <Grid item xs={12} md={8}>
            <Box sx={{ width: { md: '80%', xs: '100%' }, marginRight: 'auto', paddingBottom: '50px' }}>
              <Grid container sx={{ alignItems: { md: 'flex-start', xs: 'stretch' }, gap: '30px' }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: '30px',
                      fontWeight: 'bold',
                      textAlign: { xs: 'center', md: 'left' },
                      width: '100%',
                    }}
                  >
                    {props?.GreenStripTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: { xs: '16px', md: '20px' },
                      fontWeight: { xs: 'bold', md: 'inherit' },
                      textAlign: { xs: 'center', md: 'left' },
                      width: { sm: '66%', md: '75%' },
                      margin: { xs: 'auto', md: 'inherit' },
                    }}
                  >
                    <RichText markdown={props?.GreenStripParagraph?.data?.GreenStripParagraph} />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              '& button:hover': {
                backgroundColor: 'rgb(255,255,255, .75 )',
                border: `4px solid transparent`,
              },
            }}
          >
            <Box sx={{ width: { md: '236px', xs: '100%' }, margin: 'auto' }}>
              <Button button={props?.GreenStripButton} variant="outlined" color="success" centered />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Slide>
  )
}
export default GreenStrip
