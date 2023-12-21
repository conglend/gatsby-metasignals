import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  PricingPageQuery,
  Strapi__Component_Meta_Metadata,
  Strapi__Component_Pricing_Green_Strip,
  Strapi__Component_Pricing_Pricing_Header,
  Strapi__Component_Pricing_Tiers,
  Strapi_Global,
} from 'gatsby-graphql'
import { Grid } from '@mui/material'
import PricingHeader from '@/components/sections/pricing/pricingHeader'
import GreenStrip from '@/components/sections/pricing/greenStrip'
import Tiers from '@/components/sections/pricing/tiers'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { useLocalizePage } from '@/utils/hooks'
import { theme } from 'src/theme/ThemeProvider'

const Pricing: React.FC<PageProps<PricingPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const strapiPricing = data?.strapiPricing
  const header = strapiPricing?.PricingHeader as Strapi__Component_Pricing_Pricing_Header
  const greenStrip = strapiPricing?.GreenStrip as Strapi__Component_Pricing_Green_Strip
  const tiers = strapiPricing?.Tiers as Array<Strapi__Component_Pricing_Tiers>
  const metaData = strapiPricing?.MetaData as Strapi__Component_Meta_Metadata
  const RsiDivAlertsLegend = strapiPricing?.RsiDivAlertsLegend

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ textAlign: 'center', marginBottom: '60px' }}>
          <Grid item xs={12}>
            <PricingHeader {...header} />
          </Grid>
          <Grid item xs={12}>
            <GreenStrip {...greenStrip} />
          </Grid>
          <Grid item xs={12}>
            <Tiers tiers={tiers} RsiDivAlertsLegend={RsiDivAlertsLegend} />
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Pricing

export const query = graphql`
  query PricingPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiPricing(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      PricingHeader {
        Paragraph1 {
          data {
            Paragraph1
          }
        }
        Title
        Paragraph2 {
          data {
            Paragraph2
          }
        }
      }
      GreenStrip {
        GreenStripTitle
        GreenStripParagraph {
          data {
            GreenStripParagraph
          }
        }
        GreenStripButton {
          type
          icon
          text
          url
        }
      }
      Tiers {
        Avatar {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        Title
        PairsLabel
        PairsList
        TimeframesLabel
        TimeframesList
        Lifetime
        IsMostPopular
        Buttons {
          type
          icon
          text
          url
          newTab
        }
        TradeAlerts {
          Label
          Value
        }
        VolumeAlerts {
          Label
          Value
        }
        RsiDivAlerts {
          Label
          Value
        }
      }
      RsiDivAlertsLegend
    }
  }
`
