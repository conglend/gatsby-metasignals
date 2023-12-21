import FadeIn from '@/components/elements/fade-in'
import RichText from '@/components/elements/rich-text'
import { useIsMobile } from '@/utils/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Guide_Step_2 } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const Step2 = (props: Strapi__Component_Guide_Step_2) => {
  const isMobile = useIsMobile()

  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ gap: { xs: '20px', md: '70px' } }}>
      <Grid item xs={12}>
        <FadeIn>
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
              02
            </Typography>
          </Box>
        </FadeIn>
        <FadeIn>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}> {props?.Title} </Typography>
        </FadeIn>
        <FadeIn>
          {isMobile ? (
            <Box>
              <Typography sx={{ fontSize: { lg: '20px', xs: '18px' } }}>
                <RichText markdown={props?.Paragraph.data?.Paragraph} />
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ fontSize: { lg: '20px', xs: '18px' } }}>
              <RichText markdown={props?.Paragraph.data?.Paragraph} />
            </Typography>
          )}
        </FadeIn>
      </Grid>
    </Grid>
  )
}

export default Step2
