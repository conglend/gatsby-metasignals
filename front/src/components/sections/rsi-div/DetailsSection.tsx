import Button from '@/components/elements/button'
import { useIsMobile } from '@/utils/hooks'
import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Rsi_Div_Details_Paragraph, Strapi__Component_Rsi_Div_Details_Row } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const DetailsSection = (props: Strapi__Component_Rsi_Div_Details_Paragraph) => {
  const isMobile = useIsMobile()
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ marginTop: { xs: '32px', md: '0' }, fontSize: '30px', fontWeight: 'bold' }}>
        {props?.Title}
      </Typography>
      <Typography sx={{ fontSize: '20px' }}>{props?.Label}</Typography>
      <Grid
        container
        sx={{
          borderBottom: `1px solid ${theme.palette.background.light}`,
          borderTop: `1px solid ${theme.palette.grey[900]}`,
          marginY: '32px',
          width: { xs: '100%', md: '66%' },
          marginX: 'auto',
          textAlign: 'left',
        }}
      >
        {props?.DetailsRows?.map((row: Strapi__Component_Rsi_Div_Details_Row) => (
          <Grid
            item
            xs={12}
            sx={{
              borderTop: `1px solid ${theme.palette.background.light}`,
              borderBottom: `1px solid ${theme.palette.grey[900]}`,
              paddingY: '16px',
            }}
          >
            <Grid container sx={{ width: '100%' }}>
              <Grid item md={5} xs={6} sx={{ paddingLeft: '16px' }}>
                <Typography sx={{ fontSize: '20px' }}>{row.Label}</Typography>
              </Grid>
              <Grid item md={7} xs={6} sx={{ paddingLeft: '16px' }}>
                <Typography sx={{ fontSize: '20px' }}>{row.Value}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: { xs: '100%', md: '240px' }, marginX: 'auto', marginY: '36px' }}>
        <Button button={props?.FreeTrialButton} centered={isMobile} />
      </Box>
    </Box>
  )
}

export default DetailsSection
