import React, { useContext } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  LitePageQuery,
  Strapi__Component_Meta_Metadata,
  Strapi_Global_Lite,
  Strapi__Component_Lite_Start_Step,
  Strapi__Component_Links_Button,
  Strapi__Component_Lite_Lite_Page,
} from 'gatsby-graphql'
import { liteTheme } from 'src/theme/ThemeProvider'
import ThemeTypeContext from '@/components/themeTypeContext'
import Main from '@/components/sections/lite/main'
import GettingStarted from '@/components/sections/lite/gettingStarted'
import { useLocalizePage } from '@/utils/hooks'
import { IPageContext } from '@/types/pages'

const Lite: React.FC<PageProps<LitePageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('lite')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiLitePage?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobalLite as Strapi_Global_Lite
  const litePage = data?.strapiLitePage
  const main = litePage?.Main as Strapi__Component_Lite_Lite_Page

  const StartStep = litePage?.StartStep as Strapi__Component_Lite_Start_Step[]
  const FreeTrialButton = litePage?.FreeTrialButton as Strapi__Component_Links_Button
  const GettingStartedTitle = litePage?.GettingStartedTitle

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={liteTheme}>
        <Main main={main} theme={liteTheme} />
        <GettingStarted
          theme={liteTheme}
          steps={StartStep}
          freeTrialButton={FreeTrialButton}
          title={GettingStartedTitle}
        />
      </Layout>
    </>
  )
}

export default Lite

export const query = graphql`
  fragment GlobalLiteData on STRAPI_GLOBAL_LITE {
    locale
    Footer {
      id
      Links {
        text
        url
        newTab
        id
      }
      ModalLinks {
        LinkText
        Subtitle
        Title
        Content {
          data {
            Content
          }
        }
      }
      Logo {
        alternativeText
        localFile {
          publicURL
          internal {
            mediaType
          }
        }
      }
      SmallText
      TwitterLink {
        url
        newTab
      }
      DiscordLink {
        url
        newTab
      }
      PrivacyPolicy {
        LinkText
        Subtitle
        Title
        Content {
          data {
            Content
          }
        }
      }
    }
    id
    Cookies {
      Consent
      TermsLink {
        label
      }
    }
    FinancialAdvicePopup {
      Title
      Paragraph {
        data {
          Paragraph
        }
      }
      Image {
        alternativeText
        localFile {
          publicURL
          internal {
            mediaType
          }
        }
      }
      IsActive
    }
    MetaTitleSuffix
    MetaData {
      MetaDescription
      MetaTitle
    }
    Navbar {
      id
      Links {
        url
        text
        newTab
        id
      }
      MobileFooterLinks {
        text
        url
        newTab
        id
      }
      MobileFooterModalLink {
        LinkText
        Subtitle
        Title
        Content {
          data {
            Content
          }
        }
      }
      Logo {
        alternativeText
        localFile {
          publicURL
          internal {
            mediaType
          }
        }
      }
      HomePageUrl
      TwitterLink {
        url
        newTab
      }
      DiscordLink {
        url
        newTab
      }
      LogoDesktop {
        alternativeText
        localFile {
          publicURL
          internal {
            mediaType
          }
        }
      }
    }
  }

  query LitePage($locale: String) {
    strapiGlobalLite(locale: { eq: $locale }) {
      ...GlobalLiteData
    }
    strapiLitePage(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      Main {
        Title
        SmallTitle
        ParagraphPreLink
        ParagraphLink {
          url
          text
        }
        FreeTrialButton {
          newTab
          text
          icon
          type
          url
        }
        VideoButton {
          newTab
          text
          type
          icon
          url
        }
        ScrollDownLabel
      }
      GettingStartedTitle
      StartStep {
        Number
        PreLink
        Link {
          url
          text
          newTab
        }
        PostLink
      }
      FreeTrialButton {
        newTab
        text
        type
        icon
        url
      }
    }
  }
`
