import React, { useContext } from 'react'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { graphql, PageProps } from 'gatsby'
import {
  FaqsLitePageQuery,
  Strapi__Component_Links_Button,
  Strapi__Component_Meta_Metadata,
  Strapi_Global_Lite,
} from 'gatsby-graphql'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import { useIsMobile, useLocalizePage } from '@/utils/hooks'
import { Icon } from '@/components/elements/icon'
import { liteTheme as theme } from 'src/theme/ThemeProvider'
import Button from '@/components/elements/button'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import RichText from '@/components/elements/rich-text'

const Faqs: React.FC<PageProps<FaqsLitePageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('lite')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiFaqsLite?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobalLite as Strapi_Global_Lite
  const isMobile = useIsMobile()
  const faqs = data?.strapiFaqsLite?.FaqsLite

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ marginBottom: '60px' }}>
          <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography sx={{ textAlign: 'center', fontSize: 20 }}>{faqs?.Subtitle}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', fontSize: { xs: 30, md: 40 }, fontWeight: 'bold' }}>
              {faqs?.Title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              sx={{
                marginTop: { xs: '10px', md: '60px' },
                marginBottom: '60px',
                borderTop: `1px solid ${theme.palette.grey[900]}`,
                borderBottom: `1px solid ${theme.palette.background.light}`,
              }}
            >
              {faqs?.QnA?.map((qna) => (
                <Grid
                  item
                  xs={12}
                  sx={{
                    borderTop: `1px solid ${theme.palette.background.light}`,
                    borderBottom: `1px solid ${theme.palette.grey[900]}`,
                    paddingBottom: { md: '14px', xs: 0 },
                  }}
                >
                  <Typography
                    sx={{
                      height: '100%',
                      marginTop: { md: '14px', xs: 0 },
                      width: '100%',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      position: 'relative',
                    }}
                  >
                    <Grid item xs={12}>
                      <Accordion
                        sx={{
                          boxShadow: 'none',
                          background: 'transparent',
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <Box
                              sx={{
                                paddingTop: '7px',
                                paddingRight: '10px',
                                //customize expand and collapse icon
                                '& > .tiers--accordion-closed': {
                                  display: 'none',
                                },
                                '& > .tiers--accordion-open': {
                                  display: 'block',
                                },
                                '.Mui-expanded & > .tiers--accordion-closed': {
                                  display: 'block',
                                },
                                '.Mui-expanded & > .tiers--accordion-open': {
                                  display: 'none',
                                },
                              }}
                            >
                              <div className="tiers--accordion-closed">
                                <Icon icon="minus" />
                              </div>
                              <div className="tiers--accordion-open">
                                <Icon icon="plus" />
                              </div>
                            </Box>
                          }
                          sx={{
                            alignItems: 'center',
                            position: 'relative',
                            justifyItems: 'center',
                            '& div.MuiAccordionSummary-expandIconWrapper': {
                              transform: 'none !important',
                              position: 'absolute',
                              left: '10px',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              marginLeft: '30px',
                            }}
                          >
                            {qna.Question}
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{
                              fontWeight: 'standard',
                              marginLeft: '30px',
                            }}
                          >
                            <RichText markdown={qna?.Answer?.data?.Answer} />
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '36px', marginTop: '36px' }}>
            <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
              <Button
                button={faqs?.FreeTrialButton as Strapi__Component_Links_Button}
                color="secondary"
                centered={isMobile}
              />
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Faqs

export const query = graphql`
  query FaqsLitePage($locale: String) {
    strapiGlobalLite(locale: { eq: $locale }) {
      ...GlobalLiteData
    }
    strapiFaqsLite(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      FaqsLite {
        Subtitle
        Title
        QnA {
          Question
          Answer {
            data {
              Answer
            }
          }
        }
        FreeTrialButton {
          newTab
          url
          type
          icon
          text
        }
      }
    }
  }
`
