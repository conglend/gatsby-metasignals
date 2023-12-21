import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { GuidePageQuery, Strapi__Component_Meta_Metadata, Strapi_Global, Strapi_Guide } from '../../gatsby-graphql'
import { useLocalizePage } from '../utils/hooks'
import { Grid, Typography } from '@mui/material'
import Step1 from '@/components/sections/guide/step1'
import Step2 from '@/components/sections/guide/step2'
import Step3 from '@/components/sections/guide/step3'
import FadeIn from '@/components/elements/fade-in'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'
import HowToReadAnAlert from '@/components/sections/guide/howToReadAnAlert'

const Guide: React.FC<PageProps<GuidePageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiGuide?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobal as Strapi_Global
  const guide = data?.strapiGuide as Strapi_Guide
  const intro = guide?.Intro
  const howToReadAnAlert = guide?.HowToReadAnAlert
  const step1 = guide?.Step1
  const step2 = guide?.Step2
  const step3 = guide?.Step3

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ textAlign: 'center', marginBottom: '60px' }}>
          <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
            <FadeIn>
              <Typography sx={{ fontSize: 20 }}>{intro?.SmallTitle}</Typography>
            </FadeIn>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '40px' }}>
            <FadeIn>
              <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 'bold' }}>{intro?.LargeTitle}</Typography>
            </FadeIn>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
            <FadeIn>
              <Typography sx={{ width: { lg: '75%', md: '87.5%' }, margin: 'auto', fontSize: 20 }}>
                <RichText markdown={intro?.Paragraph?.data?.Paragraph} />
              </Typography>
            </FadeIn>
          </Grid>

          <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
            <Typography sx={{ fontSize: 20 }}>
              <RichText markdown={intro?.Paragraph?.data?.Paragraph} />
            </Typography>
            <br />
          </Grid>

          <Grid item xs={12} paddingTop="60px">
            <HowToReadAnAlert {...howToReadAnAlert} />
          </Grid>
          <Grid item xs={12} paddingTop="60px">
            <Step1 {...step1} />
          </Grid>
          <Grid item xs={12} paddingTop="60px">
            <Step2 {...step2} />
          </Grid>
          <Grid item xs={12} paddingTop="60px">
            <Step3 {...step3} />
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Guide

export const query = graphql`
  query GuidePage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiGuide(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      Intro {
        SmallTitle
        LargeTitle
        Paragraph {
          data {
            Paragraph
          }
        }
      }
      HowToReadAnAlert {
        Title
        AlertCard {
          localFile {
            publicURL
          }
        }
        HowToReadAnAlertRows {
          Label
          Description {
            data {
              Description
            }
          }
        }
      }
      Step1 {
        MainTitle
        SubTitle {
          PreLink
          URL
          LinkLabel
        }
        DescParagraph {
          Content {
            data {
              Content
            }
          }
        }
        LastDescParagraph {
          Content {
            data {
              Content
            }
          }
        }
      }
      Step2 {
        Title
        Paragraph {
          data {
            Paragraph
          }
        }
      }
      Step3 {
        Title1
        Paragraph1 {
          data {
            Paragraph1
          }
        }
        Title2
        Paragraph2 {
          data {
            Paragraph2
          }
        }
        TradeStep {
          Title
          Paragraph1 {
            data {
              Paragraph1
            }
          }
          Paragraph2 {
            data {
              Paragraph2
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
  }
`
