import RichText from '@/components/elements/rich-text'
import { SectionDivider } from '@/components/elements/section-divider'
import Image from '@/components/image'
import { useIsMobile } from '@/utils/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Traders_Experienced_Traders } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

interface IExperiencedTradersProps {
  data: Strapi__Component_Traders_Experienced_Traders
}

const ExperiencedTraders = (props: IExperiencedTradersProps) => {
  const title = props.data?.Title
  const headerParagraphs = props.data?.HeaderParagraph
  const points = props.data?.SimplePoint
  const pointsTitle = props?.data?.PointsTitle
  const image = props.data?.Image
  const isMobile = useIsMobile()

  return (
    <>
      <Grid container sx={{ width: '100%' }}>
        {isMobile && (
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: { md: 'left', xs: 'center' } }}>
              {title}
            </Typography>
          </Grid>
        )}
        <Grid item md={6} xs={12}>
          <Grid container>
            {!isMobile && (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '40px', fontWeight: 'bold', textAlign: { md: 'left', xs: 'center' } }}>
                  {title}
                </Typography>
              </Grid>
            )}
            {headerParagraphs?.map((paragraph) => (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: { lg: '20px', md: '18px' }, textAlign: { md: 'left', xs: 'center' } }}>
                  <RichText markdown={paragraph?.Content?.data?.Content} />
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} sx={{ marginTop: '78px' }}>
          <Image
            media={image}
            imageStyle={{ width: '100%', objectFit: 'contain' }}
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: '40px',
              paddingTop: '80px',
              paddingBottom: '36px',
              fontWeight: 'bold',
              textAlign: { md: 'left', xs: 'center' },
              width: '100%',
            }}
          >
            {pointsTitle}
          </Typography>
        </Grid>

        {points?.map((point) => (
          <Grid item xs={12} sx={{ padding: { md: '20px', xs: '12px' } }}>
            <Grid container sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignItems: 'center' }}>
              <Grid item sx={{ width: '80px', height: '80px' }}>
                <Box
                  sx={{
                    margin: 'auto',
                    textAlign: 'center',
                    width: '80px',
                    height: '80px',
                    backgroundColor: theme.palette.success.main,
                    marginBottom: '20px',
                    position: 'relative',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography fontSize="40px" fontWeight="bold" color={'primary.light'} lineHeight="50px">
                    {point?.Number?.toString().padStart(2, '0')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ width: { md: 'calc(100% - 100px)', xs: '100%' } }}>
                <Typography
                  sx={{
                    padding: '10px',
                    fontSize: { lg: '20px', md: '18px' },
                    textAlign: { md: 'left', xs: 'center' },
                  }}
                >
                  <RichText markdown={point?.Content?.data?.Content} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <SectionDivider />
        </Grid>
      </Grid>
    </>
  )
}

export default ExperiencedTraders
