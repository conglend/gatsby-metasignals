import { Strapi_Page_List } from '../gatsby-graphql'

const webpack = require('webpack')
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    externals: ['pino-pretty', 'lokijs', 'encoding'],
    resolve: {
      fallback: {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      },
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
      new NodePolyfillPlugin(),
    ],
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {
    data: {
      allStrapiGlobal: { nodes },
    },
  } = await graphql(`
    query {
      allStrapiGlobal {
        nodes {
          locale
        }
      }
    }
  `) // there is no query in the strapi plugin to fetch only locales, so we use the Global component

  const {
    data: {
      site: {
        siteMetadata: {
          languages: { defaultLocale },
        },
      },
    },
  } = await graphql(`
    query {
      site {
        siteMetadata {
          languages {
            defaultLocale
          }
        }
      }
    }
  `)
  const locales: Array<string> = nodes.map((node) => node.locale)

  const { data } = await graphql(`
    query pageList {
      strapiPageList {
        StandardPageList {
          Active
          Filename
        }
        Blog {
          Filename
          Active
          PostsPerPage
        }
        blog_posts {
          id
          Title
        }
      }
    }
  `)
  const strapiPageList: Strapi_Page_List = data?.strapiPageList
  const StandardPageList = strapiPageList?.StandardPageList
  const Blog = strapiPageList?.Blog
  let publishedPostsIds = strapiPageList?.blog_posts?.filter((post) => post.Title !== 'dummy')?.map((post) => post.id)
  if (!publishedPostsIds) {
    publishedPostsIds = []
  }

  let pages = StandardPageList?.filter((rec) => rec.Active)?.map((rec) => rec.Filename)
  if (!pages) {
    pages = []
  }

  pages.push('mint')

  locales.forEach((locale) => {
    pages.forEach(async (page) => {
      const localePrefix = locale === defaultLocale ? '' : locale

      const context = {
        slug: page !== 'index' ? page : '', // TODO: add to strapi?
        locale,
        locales,
        defaultLocale,
      }

      let pagePath: string

      if (page === 'index') {
        pagePath = localePrefix ? `/${localePrefix}/` : '/'
      } else {
        pagePath = localePrefix ? `/${localePrefix}/${page}` : `/${page}`
      }

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/${page}.tsx`),
        context,
      })
    })
  })

  //blog page

  const posts = await graphql(`
    query {
      allStrapiBlogPost {
        totalCount
        nodes {
          id
          Title
          Content {
            data {
              Content
            }
          }
        }
      }
    }
  `)

  if (Blog?.Active && pages.length != 0) {
    locales.forEach((locale) => {
      const page = 'blog'
      const localePrefix = locale === defaultLocale ? '' : locale

      const pagePath = localePrefix ? `/${localePrefix}/${page}` : `/${page}`

      const postsPerPage = Blog?.PostsPerPage
      const numPages = Math.ceil(publishedPostsIds.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? pagePath : `${pagePath}/page/${i + 1}`,
          component: path.resolve(`./src/templates-blog/blog-list.tsx`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            nextPageUrl: i + 1 == numPages ? undefined : `${pagePath}/page/${i + 2}`,
            previousPageUrl: i == 0 ? undefined : i == 1 ? pagePath : `${pagePath}/page/${i}`,
            slug: page,
            locale,
            locales,
            defaultLocale,
          },
        })
      })
    })

    //pages for each blogpost
    locales.forEach((locale) => {
      posts?.data?.allStrapiBlogPost?.nodes.forEach((post) => {
        if (!publishedPostsIds.includes(post.id)) {
          return
        }
        const page = `blog/post/${post.id}`
        const localePrefix = locale === defaultLocale ? '' : locale

        const pagePath = localePrefix ? `/${localePrefix}/${page}` : `/${page}`

        const context = {
          locale,
          locales,
          id: post.id,
          defaultLocale,
        }

        createPage({
          path: pagePath,
          context,
          component: path.resolve(`./src/templates-blog/blog-post.tsx`),
        })
      })
    })
  }
}
