import React, { useContext, useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  TradersPageQuery,
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  Strapi__Component_Traders_New_Traders,
  Strapi__Component_Traders_Experienced_Traders,
  Strapi__Component_Links_Button,
} from 'gatsby-graphql'
import { Box, Grid, Typography } from '@mui/material'
import { theme } from 'src/theme/ThemeProvider'
import NewTraders from '@/components/sections/traders/NewTraders'
import ExperiencedTraders from '@/components/sections/traders/ExperiencedTraders'
import Button from '@/components/elements/button'
import ThemeTypeContext from '@/components/themeTypeContext'
import { useIsMobile, useLocalizePage } from '@/utils/hooks'
import { IPageContext } from '@/types/pages'

const Traders: React.FC<PageProps<TradersPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  const isMobile = useIsMobile()
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiTradersPage?.MetaData as Strapi__Component_Meta_Metadata
  const newTraders = data?.strapiTradersPage?.NewTraders as Strapi__Component_Traders_New_Traders
  const experiencedTraders = data?.strapiTradersPage
    ?.ExperiencedTraders as Strapi__Component_Traders_Experienced_Traders
  const global = data?.strapiGlobal as Strapi_Global

  const tabsBorderRadius = '25px'
  const selectedTabBorderWidth = '3px'
  const [selectedTab, setSelectedTab] = useState<number>(0)

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ paddingBottom: '30px' }}>
          <Grid item xs={12}>
            <Grid
              container
              sx={{ minWidth: '300px', maxWidth: '50%', margin: 'auto', cursor: 'pointer', marginBottom: '64px' }}
            >
              <Grid
                item
                xs={6}
                sx={{
                  paddingY: '8px',
                  background: selectedTab == 0 ? theme.palette.background.paper : theme.palette.background.light,
                  color: selectedTab == 0 ? theme.palette.secondary.main : 'inherit',
                  backgroundClip: 'padding-box',
                  borderRight: selectedTab == 0 ? 'inherit' : `0px !important`,
                  border:
                    selectedTab == 0
                      ? `${selectedTabBorderWidth} solid ${theme.palette.grey[200]}`
                      : `${selectedTabBorderWidth} solid transparent`,
                  borderTopLeftRadius: tabsBorderRadius,
                  borderBottomLeftRadius: tabsBorderRadius,
                }}
                onClick={() => setSelectedTab(0)}
              >
                <Typography sx={{ fontSize: { md: '20px', xs: '16px' }, textAlign: 'center', fontWeight: 'bold' }}>
                  {newTraders?.Title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  paddingY: '8px',
                  background: selectedTab == 1 ? theme.palette.background.paper : theme.palette.background.light,
                  color: selectedTab == 1 ? theme.palette.secondary.main : 'inherit',
                  backgroundClip: 'padding-box',
                  borderLeft: selectedTab == 1 ? 'inherit' : `0px !important`,
                  border:
                    selectedTab == 1
                      ? `${selectedTabBorderWidth} solid ${theme.palette.grey[200]}`
                      : `${selectedTabBorderWidth} solid transparent`,
                  borderTopRightRadius: tabsBorderRadius,
                  borderBottomRightRadius: tabsBorderRadius,
                }}
                onClick={() => setSelectedTab(1)}
              >
                <Typography sx={{ fontSize: { md: '20px', xs: '16px' }, textAlign: 'center', fontWeight: 'bold' }}>
                  {experiencedTraders?.Title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {selectedTab == 0 ? <NewTraders data={newTraders} /> : <ExperiencedTraders data={experiencedTraders} />}
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: '36px', marginTop: '36px' }}>
            <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
              <Button
                button={data?.strapiTradersPage?.FreeTrialButton as Strapi__Component_Links_Button}
                centered={isMobile}
              />
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Traders

export const query = graphql`
  query TradersPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiTradersPage(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      NewTraders {
        Title
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        HeaderParagraph {
          Content {
            data {
              Content
            }
          }
        }
        PointsTitle
        Point {
          Title
          Content {
            data {
              Content
            }
          }
        }
        VideoButton {
          url
          type
          icon
          text
        }
      }
      ExperiencedTraders {
        Title
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        HeaderParagraph {
          Content {
            data {
              Content
            }
          }
        }
        PointsTitle
        SimplePoint {
          Number
          Content {
            data {
              Content
            }
          }
        }
      }
      FreeTrialButton {
        newTab
        url
        type
        icon
        text
      }
    }
  }
`
