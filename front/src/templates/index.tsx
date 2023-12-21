import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {
  HomePageQuery,
  Strapi_Global,
  Strapi__Component_Home_Example,
  Strapi__Component_Home_Explanation_Box,
  Strapi__Component_Home_Main,
  Strapi__Component_Home_Real_World_Examples,
  Strapi__Component_Home_Step_By_Step,
  Strapi__Component_Links_Scroll_Down,
  Strapi__Component_Meta_Metadata,
} from '../../gatsby-graphql'
import MainSection from '../components/sections/home/main'
import StepByStepSection from '../components/sections/home/stepByStep'
import QuestionsSection from '../components/sections/home/questions'
import { useIsMobile, useLocalizePage } from '../utils/hooks'
import { SectionDivider } from '@/components/elements/section-divider'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'

const Home: React.FC<PageProps<HomePageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')
  const largeScreen = !useIsMobile()

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiHome?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobal as Strapi_Global
  const home = data?.strapiHome

  const Main = home?.Main as Strapi__Component_Home_Main
  const ScrollDown = home?.ScrollDown as Strapi__Component_Links_Scroll_Down
  const RealWorldExamples = home?.RealWorldExamples as Strapi__Component_Home_Real_World_Examples
  const Examples = home?.Examples as Strapi__Component_Home_Example[]
  const StepByStep = home?.StepByStep as Strapi__Component_Home_Step_By_Step
  const ExplanationBox = home?.ExplanationBox as Strapi__Component_Home_Explanation_Box[]

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <MainSection
          main={{
            ...Main,
            ScrollDown,
            RealWorldExamples,
            Examples,
          }}
        />
        <SectionDivider />
        <QuestionsSection boxes={ExplanationBox} largeScreen={largeScreen} ScrollDown={ScrollDown} />
        <SectionDivider />
        <StepByStepSection {...StepByStep} />
      </Layout>
    </>
  )
}

export default Home

export const query = graphql`
  fragment GlobalData on STRAPI_GLOBAL {
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
  query HomePage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiHome(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
        ShareImage {
          localFile {
            publicURL
          }
        }
      }
      Main {
        Title
        CatchPhrase
        AddParagraph1
        TargetAudienceParagraphText
        TargetAudienceParagraphLink {
          url
          newTab
          text
        }
        ExamplesLabel
        BuyLabel
        FreeTrialButtonDesktop {
          newTab
          url
          text
          type
          icon
        }
        FreeTrialButtonMobile {
          newTab
          url
          text
          type
          icon
        }
        VideoButton {
          newTab
          text
          type
          url
          icon
        }
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        LeftPhoneScreen {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
        RightPhoneScreen {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
      }
      ExplanationBox {
        id
        Title
        Paragraph {
          Type
          Content
        }
        ImageDescription {
          data {
            ImageDescription
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
      StepByStep {
        FreeTrialOffer
        Header
        StepLabel
        FreeTrialButton {
          newTab
          url
          text
          type
          icon
        }
        Step {
          Number
          Title
          Content
        }
      }
      ScrollDown {
        Label
      }
      RealWorldExamples {
        Title
        BuyLabel
        ImagesShownAtOnce
      }
      Examples {
        Name
        Time
        Type
        Image {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, quality: 100)
            }
            publicURL
          }
        }

        Chart {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
          }
        }
      }
    }
  }
`
