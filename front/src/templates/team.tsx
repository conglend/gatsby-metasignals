import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  AboutPageQuery,
  Strapi__Component_Links_Button,
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  Strapi__Media,
} from 'gatsby-graphql'
import { Box, Grid, Typography } from '@mui/material'
import { useLocalizePage } from '@/utils/hooks'
import Image from '@/components/image'
import Button from '@/components/elements/button'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'

const About: React.FC<PageProps<AboutPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiAbout?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobal as Strapi_Global
  const about = data?.strapiAbout?.About

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100vw',
            height: '550px',
            marginLeft: 'calc((-100vw + 100%)/2)',
            overflowX: 'hidden',
          }}
        >
          <Image media={about?.Image as Strapi__Media} style={{ height: '90%' }} />
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Image
            media={about?.Image as Strapi__Media}
            style={{ width: '100vw', maxHeight: '722px', marginLeft: 'calc((-100vw + 100%)/2)' }}
          />
        </Box>

        <Grid container sx={{ marginTop: { xs: '10px', md: '60px' }, marginBottom: '60px' }}>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', fontSize: { xs: 30, md: 40 }, fontWeight: 'bold' }}>
              {about?.Title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', fontSize: { xs: 18, md: 20 }, paddingX: '5px' }}>
              <RichText markdown={about?.Paragraph?.data?.Paragraph} />
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '36px', marginTop: '36px' }}>
            <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
              <Button button={about?.FreeTrialButton as Strapi__Component_Links_Button} />
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default About

export const query = graphql`
  query AboutPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiAbout(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      About {
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        Title
        Paragraph {
          data {
            Paragraph
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
  }
`
