import FadeIn from '@/components/elements/fade-in'
import { Grid, Box, Theme, Typography, NoSsr } from '@mui/material'
import { Strapi__Component_Lite_Lite_Page } from 'gatsby-graphql'
import React from 'react'
// import Typist from 'react-typist'
import DumbButton from '@/components/elements/dumb-button'
import Button from '../../elements/button'
import { css } from '@emotion/css'
import { useIsMobile } from '@/utils/hooks'
import EmbeddedVideo from '@/components/elements/embedded-video'
import Model from './rotatingModel'
import { Link } from 'gatsby-theme-material-ui'

interface IMainProps {
  main: Strapi__Component_Lite_Lite_Page
  theme: Theme
}
const Main = (props: IMainProps) => {
  const isMobile = useIsMobile()
  const theme = props.theme
  return (
    <Grid container sx={{ marginBottom: '60px' }}>
      <Grid item md={6} xs={12} sx={{ marginTop: { md: '50px', xs: 0 } }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: '20px', color: theme.palette.text.disabled, textAlign: { md: 'left', xs: 'center' } }}
            >
              {props?.main?.SmallTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: '30px',
                lineHeight: '28px',
                fontWeight: 'bold',
                width: { xs: '100%', md: '80%', lg: '75%' },
                paddingY: '10px',
                paddingRight: '10px',
                textAlign: { md: 'left', xs: 'center' },
              }}
            >
              {props?.main?.Title}
            </Typography>
          </Grid>
          {isMobile && (
            <Grid item xs={12} sx={{ marginY: '30px' }}>
              <NoSsr>
                <Model src="lite-3d-card.glb" height="580px" isMobile={isMobile} />
              </NoSsr>
            </Grid>
          )}
          <Grid item xs={12} sx={{ minHeight: '280px', paddingY: '50px' }}>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { lg: '20px', xs: '16px' },
                lineHeight: { lg: '30px', xs: '26px' },
                position: 'relative',
                '&::before': {
                  content: '"“"',
                  position: 'absolute',
                  left: { md: 0, xs: '50%' },
                  top: { lg: '-20px', xs: '-15px' },
                  fontSize: '72px',
                  width: '20px',
                },
                '&::after': {
                  content: '"“"',
                  position: 'absolute',
                  left: { md: 0, xs: '50%' },
                  bottom: { lg: '-50px', xs: '-45px' },
                  fontSize: '72px',
                  width: '20px',
                },
              }}
            >
              {/* <Typist avgTypingDelay={10} cursor={{ show: false }}> */}
              {props?.main?.ParagraphPreLink}{' '}
              <Link
                to={props?.main?.ParagraphLink?.url}
                style={{ textDecoration: 'none', fontWeight: 'bold', color: theme.palette.text.primary }}
              >
                {props?.main?.ParagraphLink?.text}
              </Link>
              {/* </Typist> */}
            </Typography>
          </Grid>
          <Grid item md={5} xs={12} sx={{ paddingX: '1%', paddingBottom: '20px' }} order={{ xs: 1, md: 0 }}>
            <FadeIn>
              <Box>
                <Button
                  button={props?.main?.FreeTrialButton}
                  color="secondary"
                  className={css`
                    p {
                      padding-right: 8px;
                    }
                  `}
                  centered={isMobile}
                />
              </Box>
            </FadeIn>
          </Grid>
          <Grid item md={5} xs={12} sx={{ paddingX: '1%', paddingBottom: '20px' }} order={{ xs: 0, md: 1 }}>
            <FadeIn>
              <Box>
                <noscript>
                  <Button
                    button={{ ...props?.main?.VideoButton, url: props?.main?.VideoButton?.url }}
                    color="success"
                    className={css`
                      p {
                        padding-right: 8px;
                      }
                    `}
                  />
                </noscript>
                <NoSsr>
                  <EmbeddedVideo URL={props?.main?.VideoButton?.url}>
                    <DumbButton
                      button={props?.main?.VideoButton}
                      color="success"
                      className={css`
                        p {
                          padding-right: 8px;
                        }
                      `}
                      centered={isMobile}
                    />
                  </EmbeddedVideo>
                </NoSsr>
              </Box>
            </FadeIn>
          </Grid>
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid item xs={6}>
          <NoSsr>
            <Model src="lite-3d-card.glb" height="660px" />
          </NoSsr>
        </Grid>
      )}
    </Grid>
  )
}

export default Main
