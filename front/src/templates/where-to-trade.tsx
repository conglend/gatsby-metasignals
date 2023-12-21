import React, { useContext } from 'react'
import { graphql, PageProps } from 'gatsby'
import { WhereToTradeQuery, Strapi_Where_To_Trade, Strapi_Global } from '../../gatsby-graphql'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Box, Grid, NoSsr, Typography } from '@mui/material'
import { useLocalizePage } from '@/utils/hooks'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme as coreTheme } from 'src/theme/ThemeProvider'
import Image from '@/components/image'
import RichText from '@/components/elements/rich-text'
import { Link } from 'gatsby-theme-material-ui'

const WhereToTrade: React.FC<PageProps<WhereToTradeQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')
  const theme = coreTheme

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const whereToTrade = (data?.strapiWhereToTrade as Strapi_Where_To_Trade).WhereToTrade

  useLocalizePage(pageContext, location)

  const metaData = data?.strapiWhereToTrade?.MetaData

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Box sx={{ paddingBottom: '64px', width: '100%', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '18px' }}>{whereToTrade?.SmallTitle}</Typography>
          <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 'bold' }}>
            {whereToTrade?.Title}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>
          {whereToTrade?.ExchangesTitle}
        </Typography>
        {whereToTrade?.ExchangesParagraphs?.map((paragraph) => (
          <Typography sx={{ fontSize: '20px', textAlign: 'center', paddingBottom: '30px' }}>
            <RichText markdown={paragraph?.Content?.data?.Content} />
          </Typography>
        ))}

        <NoSsr>
          {/* sometimes one paragraph in rich text didn't receive formatting during ssg */}
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>
            {whereToTrade?.ProtocoleTitle}
          </Typography>
          <Typography sx={{ fontSize: '20px', textAlign: 'center', paddingBottom: '30px' }}>
            <RichText markdown={whereToTrade?.ProtocoleParagraph?.data?.ProtocoleParagraph} />
          </Typography>

          {/* for some reason, the styles below were applied differently on dev and build */}
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              width: '100%',
              paddingY: '32px',
            }}
          >
            <Grid
              container
              sx={{
                width: '100%',
                backgroundColor: theme.palette.background.light,
                paddingY: '30px',
              }}
            >
              {whereToTrade?.Logos?.map((logo, _index) => (
                <>
                  <Grid item xs={12} sx={{ padding: '16px' }}>
                    <Link to={logo.Url}>
                      <Image media={whereToTrade?.LogoImages[_index]} style={{ height: '48px' }} />
                    </Link>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '100vw',
              backgroundColor: 'rgb(255,255,255,.4)',
              marginLeft: 'calc((-100vw + 100%)/2)',
              marginY: '32px',
            }}
          >
            <Box
              sx={{
                maxWidth: { lg: 1140, xs: 900 },
                margin: '0 auto',
                display: { xs: 'hidden', md: 'block' },
              }}
            >
              <Grid container>
                {whereToTrade?.Logos?.map((logo, _index, arr) => (
                  <Grid
                    item
                    md={12 / arr.length}
                    xs={12}
                    sx={{ paddingY: '25px', paddingX: { lg: '25px', md: '12.5px' } }}
                  >
                    <Link to={logo.Url} target="_blank">
                      <Image media={whereToTrade?.LogoImages[_index]} style={{ width: '100%' }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </NoSsr>
      </Layout>
    </>
  )
}

export default WhereToTrade

export const query = graphql`
  query WhereToTrade($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiWhereToTrade {
      MetaData {
        MetaTitle
        MetaDescription
      }
      WhereToTrade {
        Title
        ExchangesTitle
        ProtocoleParagraph {
          data {
            ProtocoleParagraph
          }
        }
        ProtocoleTitle
        SmallTitle
        ExchangesParagraphs {
          Content {
            data {
              Content
            }
          }
        }
        Logos {
          Url
        }
        LogoImages {
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
