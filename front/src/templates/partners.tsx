import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import {
  PartnersPageQuery,
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  Strapi__Component_Partners_Advantage,
  Strapi__Component_Partners_Step,
  Strapi__Component_Links_Button,
} from 'gatsby-graphql'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Box, Typography } from '@mui/material'
import { useLocalizePage } from '@/utils/hooks'
import { SectionDivider } from '@/components/elements/section-divider'
import StepsSection from '@/components/sections/partners/steps'
import Button from '@/components/elements/button'
import AdvantagesSection from '@/components/sections/partners/advantages'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'

const Partners: React.FC<PageProps<PartnersPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const strapiPartners = data?.strapiPartners
  const metaData = strapiPartners?.MetaData as Strapi__Component_Meta_Metadata
  const advantages = strapiPartners?.Advantage as Strapi__Component_Partners_Advantage[]
  const steps = strapiPartners?.Step as Strapi__Component_Partners_Step[]
  const partnerButton = strapiPartners?.PartnerButton as Strapi__Component_Links_Button

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
          <Typography sx={{ fontSize: '20px', width: { xs: '100%', md: '66%' }, margin: 'auto' }}>
            {strapiPartners?.Subtitle}
          </Typography>

          <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 'bold' }}>
            {strapiPartners?.Title}
          </Typography>
          <StepsSection steps={steps} />
          <SectionDivider />
          <AdvantagesSection title={strapiPartners?.AdvantagesTitle} advantages={advantages} />
          <Typography sx={{ fontSize: '40px', textAlign: 'center', fontWeight: 'bold', padding: '20px' }}>
            {strapiPartners?.SummaryTitle}
          </Typography>
          <Box sx={{ width: { xs: '100%', md: '336px' }, margin: 'auto' }}>
            <Button button={partnerButton} centered />
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Partners

export const query = graphql`
  query PartnersPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiPartners(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      Subtitle
      Title
      Step {
        Number
        Text {
          data {
            Text
          }
        }
      }
      AdvantagesTitle
      Advantage {
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
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
      }
      SummaryTitle
      PartnerButton {
        newTab
        text
        type
        url
        icon
      }
    }
  }
`
