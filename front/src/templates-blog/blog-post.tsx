import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, Link, PageProps } from 'gatsby'
import { Strapi_Global, Strapi_Blog_Post } from 'gatsby-graphql'
import { Grid, Typography } from '@mui/material'
import Image from '@/components/image'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'
import { useIsMobile } from '@/utils/hooks'
interface IBlogPostPageData {
  strapiGlobal: Strapi_Global
  strapiBlogPost: Strapi_Blog_Post
}

type IBlogPostContext = IPageContext & {
  limit: number
  skip: number
  numPages: number
  currentPage: number
  nextPageUrl: string | undefined
}
const Blog: React.FC<PageProps<IBlogPostPageData>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const isMobile = useIsMobile()

  const data = props?.data
  const pageContext = props?.pageContext as IBlogPostContext

  const metaData = {
    MetaTitle: data?.strapiBlogPost?.Title,
    MetaDescription: data?.strapiBlogPost?.Summary?.data?.Summary,
  }
  const global = data?.strapiGlobal as unknown as Strapi_Global

  // const location = props?.location
  // useLocalizePage(pageContext, location) //todo: i18-ze page without it redirecting to /undefined

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: { md: '40px', xs: '30px' },
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: { md: '40px', xs: '20px' },
              }}
            >
              {data?.strapiBlogPost?.Title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Image
              media={data?.strapiBlogPost?.Image}
              imageStyle={{ objectFit: `contain`, aspectRatio: 'auto', width: '100%' }}
              style={{ width: isMobile ? '100%' : '50%' }}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', fontSize: '20px' }}>
            <RichText markdown={data?.strapiBlogPost?.Content?.data?.Content} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: { md: '40px', xs: '30px' },
                fontWeight: 'bold',
                textAlign: 'center',
                paddingY: { md: '32px', xs: '20px' },
              }}
            >
              You may also like
            </Typography>
          </Grid>

          {data?.strapiBlogPost?.sugestions?.map((post) => (
            <Grid item xs={12} md={6}>
              <Grid container sx={{ padding: '22px' }}>
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: 'left', fontSize: '30px', fontWeight: 'bold', paddingY: '20px' }}>
                    {post?.Title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Image
                    media={post?.Image}
                    imageStyle={{ objectFit: `contain`, aspectRatio: 'auto', width: '100%' }}
                    style={{ width: '100%' }}
                  />
                </Grid>
                {post.Summary && (
                  <Grid item xs={12} sx={{ fontSize: '20px', textAlign: { md: 'left', xs: 'center' } }}>
                    <RichText markdown={post.Summary?.data?.Summary} />
                  </Grid>
                )}
                <Grid item xs={12} sx={{ fontSize: 20, fontWeight: 'bold', textAlign: { md: 'right', xs: 'center' } }}>
                  {/*@ts-ignore*/}
                  <Link to={`/blog/post/${post.id}`} style={{ color: theme.palette.text.primary }}>
                    Read more
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  )
}

export default Blog

export const query = graphql`
  query BlogPostPage($locale: String, $id: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiBlogPost(id: { eq: $id }) {
      Title
      Content {
        data {
          Content
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
      sugestions {
        id
        Title
        Content {
          data {
            Content
          }
        }
        Summary {
          data {
            Summary
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
    }
  }
`
