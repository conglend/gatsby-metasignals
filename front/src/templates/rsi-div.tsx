import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Strapi_Global, RsiDivPageQuery, Strapi_Rsi_Div_Page } from 'gatsby-graphql'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { useLocalizePage } from '@/utils/hooks'
import { theme } from 'src/theme/ThemeProvider'
import Main from '@/components/sections/rsi-div/Main'
import WarningSection from '@/components/sections/rsi-div/WarningSection'
import DetailsSection from '@/components/sections/rsi-div/DetailsSection'
import ExplanationSection from '@/components/sections/rsi-div/ExplanationSection'

const RsiDivPage: React.FC<PageProps<RsiDivPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const strapiRsiDivPage = data?.strapiRsiDivPage as Strapi_Rsi_Div_Page
  const metaData = strapiRsiDivPage?.MetaData

  const main = strapiRsiDivPage?.Main
  const warning = strapiRsiDivPage?.WarningParagraph
  const details = strapiRsiDivPage?.DetailsParagraph
  const explanation = strapiRsiDivPage?.ExplanationParagraph

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Main {...main} />
        <WarningSection {...warning} />
        <DetailsSection {...details} />
        <ExplanationSection {...explanation} />
      </Layout>
    </>
  )
}

export default RsiDivPage

export const query = graphql`
  query RsiDivPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiRsiDivPage {
      DetailsParagraph {
        DetailsRows {
          Label
          Value
        }
        Label
        Title
        FreeTrialButton {
          newTab
          type
          icon
          text
          url
        }
      }
      ExplanationParagraph {
        MainTitle
        MainParagraph {
          data {
            MainParagraph
          }
        }
        SecondTitle
        SecondParagraph {
          data {
            SecondParagraph
          }
        }
        Charts {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        ThirdParagraph {
          data {
            ThirdParagraph
          }
        }
        FreeTrialButton {
          newTab
          type
          icon
          text
          url
        }
      }
      Main {
        Title

        SmallTitle
        AlertCards {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        WhatYouGetParagraph {
          data {
            WhatYouGetParagraph
          }
        }
        TableTitle
        Pairs
      }
      WarningParagraph {
        Title
        Paragraph {
          data {
            Paragraph
          }
        }
      }
      MetaData {
        MetaTitle
      }
    }
  }
`
