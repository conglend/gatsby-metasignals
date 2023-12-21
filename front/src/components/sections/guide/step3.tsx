import React from 'react'
import { Box, Fade, Grid, NoSsr, Slide, Typography } from '@mui/material'
import { Strapi__Component_Guide_Step_3 } from 'gatsby-graphql'
import { useIsMobile } from '@/utils/hooks'
import { liteTheme, theme } from 'src/theme/ThemeProvider'
import Button from '@/components/elements/button'
import FadeIn from '@/components/elements/fade-in'
import InView from 'react-intersection-observer'
import { SectionDivider } from '@/components/elements/section-divider'
import RichText from '@/components/elements/rich-text'

interface Step3Props extends Strapi__Component_Guide_Step_3 {
  isLite?: boolean
}

const Step3 = (props: Step3Props) => {
  const isMobile = useIsMobile()

  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ gap: '20px' }}>
      <FadeIn>
        <Grid item xs={12}>
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
              03
            </Typography>
          </Box>
        </Grid>
      </FadeIn>
      <Grid item xs={12}>
        <FadeIn>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{props?.Title1}</Typography>
        </FadeIn>
      </Grid>
      <Grid item xs={12}>
        <FadeIn>
          <Typography sx={{ fontSize: { lg: '20px', xs: '18px' } }}>
            <RichText markdown={props?.Paragraph1?.data?.Paragraph1} />
          </Typography>
        </FadeIn>
      </Grid>
      {/*@ts-ignore*/}
      <InView triggerOnce>
        {({ inView, ref }) => (
          <>
            <Grid item xs={12} ref={ref}>
              <NoSsr>
                <Slide direction="right" in={inView} mountOnEnter unmountOnExit timeout={1000}>
                  <Box
                    sx={{
                      width: '100vw',
                      backgroundColor: theme.palette.success.main,
                      marginLeft: 'calc((-100vw + 100%)/2)',
                      paddingY: { xs: '15px' },
                      marginY: { xs: '15px' },
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        maxWidth: { lg: 1140, xs: 900 },
                        margin: '0 auto',
                        paddingTop: '30px',
                        paddingBottom: { xs: '30px', md: '50px' },
                        paddingX: { lg: 'inherit', xs: '10px' },
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{props?.Title2}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography sx={{ fontSize: { lg: '20px', xs: '18px' }, paddingBottom: { xs: 0, md: '20px' } }}>
                          <RichText markdown={props?.Paragraph2?.data?.Paragraph2} />
                        </Typography>
                      </Grid>
                      {props?.TradeStep?.map((column, index) => (
                        <>
                          <Grid
                            item
                            xs={12}
                            md={12 / props?.TradeStep?.length || 4}
                            sx={{ textAlign: 'left', minWidth: '33%' }}
                          >
                            <Grid container gap="15px">
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  borderRight: { md: '1px solid transparent', xs: 'inherit' },
                                  paddingX: { md: '20px', xs: '8px' },
                                }}
                              >
                                <Fade in={inView} timeout={2000}>
                                  <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                                    {column?.Title}
                                  </Typography>
                                </Fade>
                              </Grid>

                              <Fade in={inView} timeout={2000}>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    borderRight: { md: `1px solid ${theme.palette.background.light}`, xs: 'inherit' },
                                    borderLeft:
                                      index == 0
                                        ? { md: `1px solid ${theme.palette.background.light}`, xs: 'inherit' }
                                        : 'inherit', //only on first element
                                    paddingX: { md: '20px', xs: '8px' },
                                    height: { lg: '300px', md: '450px', xs: 'inherit' },
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: 20,
                                      '& p': {
                                        margin: 0,
                                      },
                                    }}
                                  >
                                    <RichText markdown={column?.Paragraph1?.data?.Paragraph1} />{' '}
                                  </Typography>
                                  {
                                    //paragraph 2 is not required
                                    column?.Paragraph2?.data?.Paragraph2 && (
                                      <Typography
                                        sx={{
                                          paddingTop: '20px',
                                          fontSize: 20,
                                          '& p': {
                                            margin: 0,
                                          },
                                        }}
                                      >
                                        <RichText markdown={column?.Paragraph2?.data?.Paragraph2} />
                                      </Typography>
                                    )
                                  }
                                </Grid>
                              </Fade>
                            </Grid>
                          </Grid>
                          {index != props?.TradeStep?.length - 1 && isMobile && (
                            <Grid item xs={12}>
                              <SectionDivider />
                            </Grid>
                          )}
                        </>
                      ))}
                    </Grid>
                  </Box>
                </Slide>
              </NoSsr>
            </Grid>
          </>
        )}
      </InView>

      <Grid item sx={{ paddingTop: '26px', width: '100%' }}>
        <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
          <Button
            button={props?.FreeTrialButton}
            style={{
              backgroundColor: props?.isLite ? liteTheme.palette.secondary.main : theme.palette.secondary.main,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
export default Step3
