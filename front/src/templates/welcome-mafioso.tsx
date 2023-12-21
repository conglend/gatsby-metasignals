import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  NftPageQuery,
  Strapi__Component_Nft_Page_Welcome_Page,
} from 'gatsby-graphql'
import { Box, Grid, NoSsr, Typography } from '@mui/material'
import { useLocalizePage } from '@/utils/hooks'
import Image from '@/components/image'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'
import Button from '@/components/elements/button'
import { StepLabel } from '@/components/elements/step-label'

const WelcomeMafioso: React.FC<PageProps<NftPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location
  const global = data?.strapiGlobal as Strapi_Global

  const params = new URLSearchParams(location?.search)
  const txnExplorer = process.env.GATSBY_EXPLORER_URL
  const txnHash = params.get('tx')

  const metaData = data?.strapiNft?.MetaData as Strapi__Component_Meta_Metadata
  //   @ts-ignore
  const welcomePage = data?.strapiNft?.WelcomePage as Strapi__Component_Nft_Page_Welcome_Page

  useLocalizePage(pageContext, location)
  // alert('siema')

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Typography
          sx={{
            fontSize: { xs: '30px' },
            fontWeight: 700,
            textAlign: 'center',
            paddingY: '34px',
          }}
        >
          {welcomePage.Title}
        </Typography>
        <RichText
          markdown={welcomePage.Paragraph.data.Paragraph}
          sx={{
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '25px',
            textAlign: 'center',
            paddingBottom: '64px',
            paddingX: { md: '200px', xs: 0 },
          }}
          preserveNewlines={true}
        />
        <NoSsr>
          {txnHash && (
            <Grid sx={{ marginBottom: '64px' }}>
              <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
                <Button
                  button={{
                    url: `${txnExplorer}/tx/${txnHash}`,
                    text: welcomePage.MintConfirmationButtonText,
                    newTab: true,
                  }}
                  centered={true}
                />
              </Box>
            </Grid>
          )}
          <Box
            sx={{
              paddingY: '55px',
              backgroundColor: theme.palette.success.main,
              width: '100vw',
              marginLeft: 'calc((-100vw + 100%)/2)',
            }}
          >
            <Grid
              container
              sx={{
                maxWidth: { lg: 1140, xs: 900 },
                margin: '0 auto',
                padding: { xs: 2, md: 0 },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  fontSize: '30px',
                  fontWeight: 700,
                  textAlign: 'center',
                  paddingBottom: '48px',
                }}
              >
                {welcomePage.PointsTitle}
              </Grid>
              {welcomePage.NftPoints.map((point, i) => (
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingBottom: { lg: 0, xs: '16px' },
                    textAlign: 'center',
                  }}
                >
                  <StepLabel backgroundColor={'white'}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        fontSize: '40px',
                        color: theme.palette.success.main,
                        display: 'flex',
                        justifyItems: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <p>{(i + 1).toString().padStart(2, '0')}</p>
                    </Box>
                  </StepLabel>
                  <RichText markdown={point.Text.data.Text} hyperlinkColor={'#FFD600'} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '100px', flexDirection: 'column' }}>
            <RichText
              markdown={welcomePage.SignatureCaption.data.SignatureCaption}
              sx={{ paddingBottom: '48px', textAlign: 'center' }}
              textAlignLeft={true}
            />
            <Box sx={{ maxWidth: '450px', display: 'flex', justifyContent: 'center', margin: 'auto' }}>
              <Image media={welcomePage.Signature} />
            </Box>
          </Box>
        </NoSsr>
      </Layout>
    </>
  )
}

export default WelcomeMafioso

export const query = graphql`
  query WelcomeMafiosoPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiNft(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      WelcomePage {
        Signature {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
            publicURL
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
        Title
        Paragraph {
          data {
            Paragraph
          }
        }
        NftPoints {
          Text {
            data {
              Text
            }
          }
        }
        PointsTitle
        SignatureCaption {
          data {
            SignatureCaption
          }
        }
        MintConfirmationButtonText
      }
    }
  }
`
