import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  Strapi__Component_Links_Button,
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  Strapi__Media,
  VolumeAlertsPageQuery,
} from 'gatsby-graphql'
import { Box, Grid, NoSsr, Typography } from '@mui/material'
import { useIsDesktopLarge, useIsMobile, useLocalizePage } from '@/utils/hooks'
import Image from '@/components/image'
import Button from '@/components/elements/button'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import { getArrayFromSpaceSeparatedString } from '@/utils/helpers'
import { css } from '@emotion/css'
import RichText from '@/components/elements/rich-text'

const VolumeAlerts: React.FC<PageProps<VolumeAlertsPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiVolumeAlertsPage?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobal as Strapi_Global
  const main = data?.strapiVolumeAlertsPage?.Main
  const stripe = data?.strapiVolumeAlertsPage?.Stripe
  const timeframes = data?.strapiVolumeAlertsPage?.TimeframesSection
  const summaryParagraphs = data?.strapiVolumeAlertsPage?.SummaryParagraphs
  const finalSection = data?.strapiVolumeAlertsPage?.FinalSection

  const isMobile = useIsMobile()
  const isDesktopLarge = useIsDesktopLarge()
  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '20px' }}>{main?.SmallHeader}</Typography>

          <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>{main?.Title}</Typography>
          <Typography
            sx={{ fontSize: '20px', maxWidth: { md: '66%', xs: '100%' }, margin: 'auto', paddingTop: '32px' }}
          >
            <RichText markdown={main?.Paragraph1?.data?.Paragraph1} />
          </Typography>
          <NoSsr>
            <Typography sx={{ fontWeight: 'bold', fontSize: '30px', paddingTop: '64px' }}>{main?.Header}</Typography>
            <Typography
              sx={{ fontSize: '20px', maxWidth: { md: '80%', xs: '100%' }, margin: 'auto', paddingTop: '8px' }}
            >
              <RichText markdown={main?.Paragraph2?.data?.Paragraph2} />
            </Typography>
          </NoSsr>
        </Box>

        <Grid container sx={{ display: { xs: 'block', md: 'none' }, paddingY: '48px', gap: '32px' }}>
          <Grid item xs={12} sx={{ margin: 'auto', display: 'flex' }}>
            <Image
              style={{ maxWidth: isDesktopLarge ? '80%' : '75%', margin: 'auto' }}
              media={stripe?.AlertCardImage as Strapi__Media}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
              <RichText markdown={stripe?.Content?.data?.Content} />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Button button={stripe?.FreeTrialButton as Strapi__Component_Links_Button} centered={isMobile} />
            </Box>
          </Grid>
        </Grid>

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
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>
                  <RichText markdown={stripe?.Content?.data?.Content} />
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ margin: 'auto', display: 'flex' }}>
                  <Image
                    style={{ maxWidth: isDesktopLarge ? '80%' : '75%', margin: 'auto' }}
                    media={stripe?.AlertCardImage as Strapi__Media}
                  />
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
                    button={stripe?.FreeTrialButton as Strapi__Component_Links_Button}
                    variant="outlined"
                    centered={isMobile}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Box
          sx={{
            paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
            position: 'relative',
          }}
        >
          <iframe
            className={css`
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              width: 100%;
              height: 100%;
            `}
            src={timeframes?.VimeoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video"
          ></iframe>
        </Box>
        <Typography sx={{ fontSize: '30px', textAlign: 'center', fontWeight: 'bold', paddingTop: '32px' }}>
          {timeframes?.Title}
        </Typography>

        <Typography
          sx={{
            fontSize: '20px',
            textAlign: 'center',
            maxWidth: { md: '75%', xs: '100%' },
            margin: 'auto',
            paddingBottom: '24px',
          }}
        >
          <RichText markdown={timeframes?.Header?.data?.Header} />
        </Typography>
        <ul
          style={
            isMobile
              ? {
                  paddingInlineStart: '0',
                  border: `solid 2px ${theme.palette.background.light}`,
                  listStyle: 'none',
                  textAlign: 'center',
                  columns: 2,
                  columnRule: `solid 2px ${theme.palette.background.light}`,
                }
              : {
                  columns: 4,
                  columnRule: `solid 2px ${theme.palette.background.light}`,
                  border: `solid 2px ${theme.palette.background.light}`,
                  listStyle: 'none',
                }
          }
        >
          {timeframes?.List &&
            getArrayFromSpaceSeparatedString(timeframes?.List).map((pair, index, arr) => (
              <li
                style={{
                  //paddings for first and last elements in each column are here to extend collumns with their divider
                  paddingTop:
                    index === arr.length * 0 ||
                    (!isMobile && index === Math.floor(arr.length * 0.25)) ||
                    index === Math.floor(arr.length * 0.5) ||
                    (!isMobile && index === Math.floor(arr.length * 0.75))
                      ? '30px'
                      : '2px',
                  paddingBottom:
                    (!isMobile && index + 1 === Math.floor(arr.length * 0.25)) ||
                    index + 1 === arr.length * 0.5 ||
                    (!isMobile && index + 1 === Math.floor(arr.length * 0.75)) ||
                    index + 1 === arr.length * 1
                      ? '30px'
                      : '2px',
                  paddingLeft: !isMobile && index >= Math.floor(arr.length * 0.25) ? '10px' : 0,
                }}
              >
                {pair}
              </li>
            ))}
        </ul>

        <Box sx={{ paddingBottom: '128px' }}>
          {summaryParagraphs?.map((paragraph) => (
            <NoSsr>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', paddingTop: '64px' }}>
                {paragraph?.Header}
              </Typography>
              <Typography sx={{ fontSize: '20px', textAlign: 'center' }}>
                <RichText markdown={paragraph?.Content?.data?.Content} />
              </Typography>
            </NoSsr>
          ))}
        </Box>
        <Box sx={{ paddingBottom: '128px', width: { xs: '100%', md: '240px' }, margin: 'auto' }}>
          <Button
            button={finalSection?.FreeTrialButton as Strapi__Component_Links_Button}
            color="primary"
            centered={isMobile}
          />
        </Box>
      </Layout>
    </>
  )
}

export default VolumeAlerts

export const query = graphql`
  query VolumeAlertsPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiVolumeAlertsPage {
      MetaData {
        MetaDescription
        MetaTitle
      }
      Main {
        SmallHeader
        Title
        Paragraph1 {
          data {
            Paragraph1
          }
        }
        Header
        Paragraph2 {
          data {
            Paragraph2
          }
        }
      }
      Stripe {
        Content {
          data {
            Content
          }
        }
        FreeTrialButton {
          newTab
          url
          type
          icon
          text
        }
        AlertCardImage {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
      }
      TimeframesSection {
        Title
        Header {
          data {
            Header
          }
        }
        List
        VimeoUrl
      }
      SummaryParagraphs {
        Header
        Content {
          data {
            Content
          }
        }
      }
      FinalSection {
        FreeTrialButton {
          newTab
          url
          type
          icon
          text
        }
      }
    }
  }
`
