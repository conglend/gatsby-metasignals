import FadeIn from '@/components/elements/fade-in'
import { StepLabel } from '@/components/elements/step-label'
import { useIsMobile } from '@/utils/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Home_Step_By_Step } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'
import Button from '../../../components/elements/button'

export default function StepByStepSection(props: Strapi__Component_Home_Step_By_Step) {
  const isMobile = useIsMobile()

  const { FreeTrialOffer, Header } = props
  const Steps = props.Step
  const StepLabelContent = props.StepLabel

  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '80px',
        gap: { xs: '80px', md: '30px' },
      }}
    >
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: { md: '35px', lg: '40px', xs: '30px' },
            fontWeight: 'bold',
            textAlign: { md: 'inherit', xs: 'center' },
          }}
        >
          {FreeTrialOffer}
        </Typography>
        <br />
        <Typography
          sx={{
            marginBottom: { md: '50px', xs: 'inherit' },
            fontSize: { lg: '30px', md: '22px', xs: '16px' },
            fontWeight: 'bold',
            textAlign: { md: 'inherit', xs: 'center' },
          }}
        >
          {Header}
        </Typography>
      </Grid>

      {Steps?.map((step) => (
        <Grid item xs={12} key={`step#${step.Number}`}>
          <FadeIn>
            <Grid
              container
              sx={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: '30px', md: '15px' },
              }}
            >
              <Grid item sx={{ width: '80px', height: '80px' }}>
                <StepLabel>
                  <Box sx={{ float: 'left', padding: '10px', textAlign: 'left' }}>
                    <Typography sx={{ fontSize: '16px', color: 'primary.light', lineHeight: '20px' }}>
                      {StepLabelContent}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '40px', fontWeight: 'bold', color: 'primary.light', lineHeight: '50px' }}
                    >
                      {step?.Number?.toString().padStart(2, '0')}
                    </Typography>
                  </Box>
                </StepLabel>
              </Grid>
              <Grid item sx={{ width: { md: 'calc(100% - 100px)', xs: '100%' } }}>
                {/* 100px - from step label*/}
                <Grid
                  container
                  direction="column"
                  sx={{
                    gap: { xs: '10px', md: 'inherit' },
                    justifyContent: 'center',
                    alignItems: { md: 'flex-start', xs: 'center' },
                  }}
                >
                  <Grid item sx={{ textAlign: { md: 'left', xs: 'center' } }}>
                    <Typography sx={{ fontSize: { md: '18px', lg: '20px', xs: '16px' }, fontWeight: 'bold' }}>
                      {step.Title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: { lg: '20px', md: '18px', xs: '16px' },
                        color: theme.palette.background.paper,
                        textAlign: { md: 'left', xs: 'center' },
                      }}
                    >
                      {step.Content}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FadeIn>
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        sx={{
          marginTop: { xs: 0, md: '30px' },
          display: { md: 'flex' },
          justifyContent: { md: 'start' },
          width: { md: '236px', xs: '100%' },
        }}
      >
        <FadeIn>
          <Box>
            <Button button={props?.FreeTrialButton} color="secondary" centered={isMobile} />
          </Box>
        </FadeIn>
      </Grid>
    </Grid>
  )
}
