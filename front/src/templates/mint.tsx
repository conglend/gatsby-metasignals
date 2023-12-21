import React, { useEffect } from 'react'
import Layout from '@/components/layout'
import SEO from '@/components/seo'
import { graphql, navigate, PageProps } from 'gatsby'
import { Strapi_Global } from '../../gatsby-graphql'
import { theme } from '../theme/ThemeProvider'
import { IPageContext } from '@/types/pages'
import { localizePath } from '@/utils/localize'

const useMintCode = (pageContext: IPageContext) =>
  useEffect(() => {
    const mintCode = localStorage.getItem('mint_code')
    if (!mintCode) {
      const urlParams = new URLSearchParams(document.location.search)
      localStorage.setItem('mint_code', urlParams.get('code') || '')
    }
    const { defaultLocale } = pageContext
    const locale = (typeof localStorage !== `undefined` && localStorage.getItem('locale')) || defaultLocale

    const localizedPath = localizePath(locale, defaultLocale, '/nft')
    navigate(localizedPath)
  }, [])

const MintRoute: React.FC<PageProps<any>> = ({ data, pageContext }) => {
  const global = data?.strapiGlobal as Strapi_Global
  useMintCode(pageContext as IPageContext)
  return (
    <>
      <SEO metaData={{ MetaTitle: 'NFT Mint' }} global={global} />
      <Layout pageContext={pageContext as IPageContext} global={global} theme={theme}>
        <div style={{ height: '60vh', paddingTop: '10vh', textAlign: 'center', fontSize: 48 }}>Redirecting...</div>
      </Layout>
    </>
  )
}

export default MintRoute

export const query = graphql`
  query MintRoute {
    site {
      siteMetadata {
        languages {
          defaultLocale
        }
      }
    }
    strapiGlobal {
      ...GlobalData
    }
  }
`
