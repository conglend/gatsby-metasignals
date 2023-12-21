import React, { useContext, useRef, useState } from 'react'
import { graphql, PageProps } from 'gatsby'
import {
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  ContactPageQuery,
  Strapi__Component_Links_Button,
  Strapi__Component_Contact_Form,
  Strapi__Media,
  Strapi__Component_Contact_Tiers_List,
} from 'gatsby-graphql'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Box, Grid, Typography } from '@mui/material'
import { useIsMobile, useLocalizePage } from '@/utils/hooks'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import ContactForm from '@/components/sections/contact/contactForm'
import Button from '@/components/elements/button'
import { SectionDivider } from '@/components/elements/section-divider'
import Image from '@/components/image'
import { Icon } from '@/components/elements/icon'
import RichText from '@/components/elements/rich-text'

const Contact: React.FC<PageProps<ContactPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')
  const isMobile = useIsMobile()
  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const strapiContact = data?.strapiContact
  const metaData = strapiContact?.MetaData as Strapi__Component_Meta_Metadata

  useLocalizePage(pageContext, location)
  const contact = strapiContact?.Contact
  const formContainerRef = useRef<HTMLDivElement | null>(null)

  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Grid container ref={formContainerRef}>
              {!submitted && (
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: '30px',
                      lineHeight: '28px',
                      fontWeight: 'bold',
                      width: { xs: '100%', md: '80%', lg: '75%' },
                      paddingBottom: '10px',
                      paddingRight: '10px',
                      textAlign: { md: 'left', xs: 'center' },
                    }}
                  >
                    {contact?.Title}
                  </Typography>
                </Grid>
              )}
              <ContactForm
                {...(contact?.Form as Strapi__Component_Contact_Form)}
                button={contact?.SendButton as Strapi__Component_Links_Button}
                consentParagraph={contact?.ConsentParagraph?.data?.ConsentParagraph}
                promptParagraph={contact?.Paragraph?.data?.Paragraph}
                tiersList={contact?.TiersList as Strapi__Component_Contact_Tiers_List[]}
                formContainerRef={formContainerRef}
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            </Grid>
          </Grid>
          {!isMobile && (
            <Grid item xs={6} sx={{ display: 'flex' }}>
              <Image
                media={contact?.Image as Strapi__Media}
                style={{ maxWidth: '80%', height: 'auto', margin: 'auto', marginTop: '16.66%' }}
              />
            </Grid>
          )}
        </Grid>
        <SectionDivider />
        <Grid container>
          <Grid item xs={12} sx={{ paddingY: '30px' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{contact?.TrialTitle}</Typography>
          </Grid>
          {contact?.Point?.map((p) => (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '12px',
              }}
            >
              <Icon style={{ height: 40, width: 40 }} icon="checkmark" />
              <Typography
                sx={{
                  fontSize: '20px',
                  '& div p': {
                    //override default margin for Markdown
                    marginY: '8px',
                  },
                }}
              >
                <RichText markdown={p?.Content?.data?.Content} />
              </Typography>
            </Grid>
          ))}

          <Grid item xs={12} sx={{ paddingY: '40px' }}>
            <Box sx={{ width: { xs: '100%', md: '236px' } }}>
              <Button button={contact?.FreeTrialButton as Strapi__Component_Links_Button} color="primary" />
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}

export default Contact

export const query = graphql`
  query ContactPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiContact(locale: { eq: $locale }) {
      Contact {
        Title
        Paragraph {
          data {
            Paragraph
          }
        }
        Form {
          FirstNameLabel
          FirstNamePlaceholder
          LastNameLabel
          LastNamePlaceholder
          EmailAddressLabel
          EmailAddressPlaceholder
          MessageLabel
          MessagePlaceholder
          DiscordUsernameLabel
          DiscordUsernamePlaceholder
          TradingViewUsernameLabel
          TradingViewUsernamePlaceholder
          RequiredLabel
          SubmittedMessage {
            data {
              SubmittedMessage
            }
          }
          MembershipTierLabel
        }
        SendButton {
          text
          type
          icon
        }
        ConsentParagraph {
          data {
            ConsentParagraph
          }
        }
        TrialTitle
        Point {
          Content {
            data {
              Content
            }
          }
        }
        FreeTrialButton {
          text
          type
          icon
          url
          newTab
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
        TiersList {
          Tier
        }
      }
      MetaData {
        MetaTitle
        MetaDescription
      }
    }
  }
`
