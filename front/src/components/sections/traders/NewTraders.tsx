import DumbButton from '@/components/elements/dumb-button'
import { Icon } from '@/components/elements/icon'
import RichText from '@/components/elements/rich-text'
import Image from '@/components/image'
import { useIsMobile } from '@/utils/hooks'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Traders_New_Traders } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'
import EmbeddedVideo from '@/components/elements/embedded-video'

interface INewTradersProps {
  data: Strapi__Component_Traders_New_Traders
}
const NewTraders = (props: INewTradersProps) => {
  const title = props.data?.Title
  const headerParagraphs = props.data?.HeaderParagraph
  const pointsTitle = props?.data?.PointsTitle
  const points = props.data?.Point
  const image = props.data?.Image

  const isMobile = useIsMobile()
  return (
    <>
      <Grid container sx={{ width: '100%' }}>
        {isMobile && (
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>{title}</Typography>
          </Grid>
        )}
        <Grid item md={6} xs={12}>
          <Grid container>
            {!isMobile && (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>{title}</Typography>
              </Grid>
            )}
            {headerParagraphs?.map((paragraph) => (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: { lg: '20px', md: '18px' }, textAlign: { xs: 'center', md: 'left' } }}>
                  <RichText markdown={paragraph?.Content?.data?.Content} />
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginLeft: '30px',
                }}
              >
                <EmbeddedVideo URL={props.data.VideoButton.url}>
                  <Grid
                    container
                    sx={{
                      width: '100%',
                      height: '100px',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Grid item sx={{ marginRight: '10px' }}>
                      <DumbButton
                        button={{ ...props?.data?.VideoButton, text: '', icon: 'videoPlayer' }}
                        color="success"
                        sx={{ padding: 1.2, minWidth: 0 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography>{props?.data?.VideoButton?.text}</Typography>
                    </Grid>
                  </Grid>
                </EmbeddedVideo>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} sx={{ marginTop: '78px' }}>
          <Image
            media={image}
            imageStyle={{ width: '100%', objectFit: 'contain' }}
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Grid>
      </Grid>
      <Typography
        sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: { xs: '10px', md: '60px' }, paddingBottom: '10px' }}
      >
        {pointsTitle}
      </Typography>
      <Grid
        container
        sx={{
          marginBottom: '60px',
          borderTop: `1px solid ${theme.palette.grey[900]}`,
          borderBottom: `1px solid ${theme.palette.background.light}`,
        }}
      >
        {points?.map((point) => (
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
                      {point.Title}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        fontWeight: 'standard',
                        marginLeft: '30px',
                      }}
                    >
                      <RichText markdown={point?.Content?.data?.Content} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default NewTraders
