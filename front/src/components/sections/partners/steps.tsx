import React from 'react'
import { StepLabel } from '@/components/elements/step-label'
import { useIsDesktopLarge, useIsMobile } from '@/utils/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Partners_Step } from 'gatsby-graphql'
import PartnersCurve from '../../../assets/partners-curve.svg'
import RichText from '@/components/elements/rich-text'

interface IPointsSection {
  steps: Array<Strapi__Component_Partners_Step>
}

const StepsSection = (props: IPointsSection) => {
  const isMobile = useIsMobile()
  const isDekstopLarge = useIsDesktopLarge()
  return (
    <Grid
      container
      sx={{
        marginY: '60px',
        display: 'flex',
      }}
    >
      {!isMobile && (
        <Grid item xs={12} sx={{ position: 'relative' }}>
          <PartnersCurve
            style={{
              position: 'absolute',
              left: isDekstopLarge ? '12.5%' : '15%',
              width: '75%',
              top: isDekstopLarge ? '40px' : '30px',
            }}
          />
        </Grid>
      )}
      {props?.steps?.map((step, index) => (
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            marginTop: { lg: index % 2 == 1 ? '80px' : 0, md: index % 2 == 1 ? '66px' : 0, xs: '0' },
            paddingBottom: { xs: '50px', md: 'inherit' },
          }}
        >
          <Grid
            container
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Box sx={{ width: '100%', paddingBottom: '20px' }}>
              <StepLabel style={{ margin: 'auto' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
                    {step?.Number?.toString().padStart(2, '0')}
                  </Typography>
                </Box>
              </StepLabel>
            </Box>
            <Box sx={{ width: '100%', paddingTop: { xs: '20px', md: 'inherit' } }}>
              <Typography sx={{ marginX: 'auto', fontSize: '20px', fontWeight: 'bold', width: '75%' }}>
                <RichText markdown={step?.Text?.data?.Text} />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
export default StepsSection
