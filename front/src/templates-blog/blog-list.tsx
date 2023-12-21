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
import { Icon } from '@/components/elements/icon'
interface IBlogPageData {
  strapiGlobal: Strapi_Global
  allStrapiBlogPost: { nodes: Strapi_Blog_Post[] }
}
const Blog: React.FC<PageProps<IBlogPageData>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext & {
    limit: number
    skip: number
    numPages: number
    currentPage: number
    nextPageUrl: string | undefined
    previousPageUrl: string | undefined
  }

  const metaData = {
    //i was not able to access new single type from gatsby
    //therefore i mock it for not
    MetaTitle: 'Blog',
    MetaDescription: 'Blog',
  }
  const global = data?.strapiGlobal as Strapi_Global
  const allStrapiBlogPost = data?.allStrapiBlogPost
  const posts = allStrapiBlogPost?.nodes

  // const location = props?.location
  // useLocalizePage(pageContext, location) //todo: i18n without breaking page path
  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: '40px',
                fontWeight: 'bold',
                textAlign: { xs: 'center', md: 'left' },
                paddingBottom: { md: '20px' },
                paddingLeft: '2.5%',
              }}
            >
              Blog
            </Typography>
          </Grid>
          {posts?.map((post) => (
            <Grid item key={'post#' + post.id} xs={12}>
              <Grid container sx={{ padding: '22px' }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
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
                <Grid item xs={12} sx={{ fontSize: '18pxpx', textAlign: { md: 'left', xs: 'center' } }}>
                  <RichText markdown={post.Summary?.data?.Summary} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: { md: 'right', xs: 'center' } }}
                >
                  {/*@ts-ignore*/}
                  <Link to={`/blog/post/${post.id}`} style={{ color: theme.palette.text.primary }}>
                    Read more
                  </Link>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{
                    display: { xs: 'none', md: 'block' },
                  }}
                >
                  <Image
                    media={post?.Image}
                    imageStyle={{ objectFit: `contain`, aspectRatio: 'auto', width: '100%' }}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: '2.5%' }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography sx={{ textAlign: 'left', fontSize: '30px', fontWeight: 'bold', paddingY: '20px' }}>
                        {post?.Title}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ fontSize: '20px', textAlign: { md: 'left', xs: 'center' } }}>
                      <RichText markdown={post.Summary?.data?.Summary} />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: { md: 'right', xs: 'center' } }}
                    >
                      {/*@ts-ignore*/}
                      <Link to={`/blog/post/${post.id}`} style={{ color: theme.palette.text.primary }}>
                        Read more
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ paddingY: '86px', position: 'relative' }}>
            {pageContext?.previousPageUrl && (
              /*@ts-ignore*/
              <Link to={pageContext?.previousPageUrl} style={{ textDecoration: 'none' }}>
                <Icon icon="arrowLeft" style={{ position: 'absolute', left: '10%' }} />
              </Link>
            )}
            {pageContext?.nextPageUrl && (
              /*@ts-ignore*/
              <Link to={pageContext?.nextPageUrl} style={{ textDecoration: 'none' }}>
                <Icon icon="arrowRight" style={{ position: 'absolute', right: '10%' }} />
              </Link>
            )}
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Blog

export const query = graphql`
  query BlogPage($locale: String, $skip: Int!, $limit: Int!) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    allStrapiBlogPost(limit: $limit, skip: $skip, sort: { fields: publishedAt }) {
      totalCount
      nodes {
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
