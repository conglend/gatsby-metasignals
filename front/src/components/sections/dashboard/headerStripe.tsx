import { Box, Grid, Typography } from '@mui/material'
import PhoneCard from '@/components/elements/phone-card'
import { theme } from '../../../theme/ThemeProvider'
import Button from '@/components/elements/button'
import React from 'react'
import { useIsDesktopLarge, useIsMobile, useWindowDimensions } from '@/utils/hooks'
import { Strapi__Component_Dashboard_Header } from '../../../../gatsby-graphql'

const HeaderStripe = (props: Strapi__Component_Dashboard_Header & { data: any; alertsGenerated: number }) => {
  const isMobile = useIsMobile()
  const isDesktopLarge = useIsDesktopLarge()

  const { width: screenWidth } = useWindowDimensions()
  return (
    <>
      {/* using isMobile somehow fixes svg gradients not working on desktop */}
      {/*  edit: now that we use PNGs instead of SVG for currency icons, we could probably remove this. TODO if there is time left*/}
      {isMobile && (
        <Grid container sx={{ gap: '30px', paddingBottom: '48px' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{props?.RecentAlertLabel}</Typography>

            <Typography sx={{ fontSize: '18px' }}>{props?.RecentAlertRemark}</Typography>
          </Grid>
          <Grid item xs={12}>
            <PhoneCard width={screenWidth - 50} data={props?.data} />
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            marginTop: { md: '200px' },
            marginBottom: { md: '200px' },
            height: { xs: 'calc(500px - 20vw)', md: '300px' },
            width: '100vw',
            backgroundColor: theme.palette.primary.main,
            marginLeft: 'calc((-100vw + 100%)/2)',
            paddingY: { md: '50px', xs: '10px' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              maxWidth: { lg: 1140, xs: 900 },
              height: { md: '200px' },
              margin: '0 auto',
              padding: { xs: 2, md: 0 },
            }}
          >
            <Grid item xs={3.5}>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'left' }}>
                {props?.RecentAlertLabel}
              </Typography>

              <Typography sx={{ fontSize: '18px', textAlign: 'left' }}>{props?.RecentAlertRemark}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ margin: 'auto' }}>
                <PhoneCard scale={isDesktopLarge ? 0.8 : 0.75} data={props?.data} />
              </Box>
            </Grid>
            <Grid
              item
              xs={3.5}
              sx={{
                '& button:hover': { color: 'text.primary' },
                marginBottom: { xs: '20px', md: 'inherit' },
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                <Button
                  button={isMobile || isDesktopLarge ? props?.FreeTrialButtonLong : props?.FreeTrialButtonShort}
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default HeaderStripe
