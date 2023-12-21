import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import { Strapi__Component_Meta_Metadata, Strapi_Global, NftPageQuery } from 'gatsby-graphql'
import { useLocalizePage } from '@/utils/hooks'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'
import { Box } from '@mui/system'

const NotAvailable: React.FC<PageProps<NftPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')
  const location = props?.location

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const global = data?.strapiGlobal as Strapi_Global
  const metaData = data?.strapiNft?.MetaData as Strapi__Component_Meta_Metadata

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Box
          sx={{
            paddingX: { md: '64px', xs: '8px' },
            fontWeight: 600,
            fontSize: 24,
            height: '60vh',
            paddingBottom: '10vh',
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          {/*@ts-ignore*/}
          <RichText markdown={data.strapiNft.Geoblock.Message.data.Message} preserveNewlines />
        </Box>
      </Layout>
    </>
  )
}

export default NotAvailable

export const query = graphql`
  query GeoblockPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiNft(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      Geoblock {
        Message {
          data {
            Message
          }
        }
      }
    }
  }
`
