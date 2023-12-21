import { Strapi__Component_Meta_Metadata, Strapi_Global } from 'gatsby-graphql'
import React from 'react'
import { Helmet } from 'react-helmet'

interface ISEOProps {
  metaData: Partial<Strapi__Component_Meta_Metadata>
  global: Partial<Strapi_Global>
}

const SEO: React.FC<ISEOProps> = ({ metaData, global }) => {
  // Merge default and page-specific SEO values
  const fullSeo = {
    ...global,
    ...metaData,
  }

  const getMetaTags = () => {
    const tags = []

    if (fullSeo.MetaTitle) {
      tags.push(
        {
          property: 'og:title',
          content: fullSeo.MetaTitle,
        },
        {
          name: 'twitter:title',
          content: fullSeo.MetaTitle,
        },
      )
    }
    if (fullSeo.MetaDescription) {
      tags.push(
        {
          name: 'description',
          content: fullSeo.MetaDescription,
        },
        {
          property: 'og:description',
          content: fullSeo.MetaDescription,
        },
        {
          name: 'twitter:description',
          content: fullSeo.MetaDescription,
        },
      )
    }
    // if (fullSeo.ShareImage) {
    //   const imageUrl = process.env.GATSBY_STRAPI_URL
    //     ? fullSeo.ShareImage.url
    //     : `http://localhost:8000${fullSeo.ShareImage.url}`

    //   tags.push(
    //     {
    //       name: 'image',
    //       content: imageUrl,
    //     },
    //     {
    //       property: 'og:image',
    //       content: imageUrl,
    //     },
    //     {
    //       name: 'twitter:image',
    //       content: imageUrl,
    //     },
    //   )
    // }

    tags.push({ name: 'twitter:card', content: 'summary_large_image' })

    return tags
  }

  const metaTags = getMetaTags()

  return (
    <Helmet
      title={fullSeo?.MetaTitle}
      titleTemplate={`%s | ${fullSeo?.MetaTitleSuffix}`}
      meta={metaTags}
      htmlAttributes={{ lang: fullSeo?.locale }}
      link={[
        {
          rel: 'icon',
          // href: fullSeo.Favicon?.localFile?.publicURL,
        },
      ]}
    />
  )
}

export default SEO
