import Button from '@/components/elements/button'
import RichText from '@/components/elements/rich-text'
import Image from '@/components/image'
import { useIsMobile } from '@/utils/hooks'
import { Box, Grid, NoSsr, Typography } from '@mui/material'
import { Strapi__Component_Rsi_Div_Explanation_Paragraph } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const ExplanationSection = (props: Strapi__Component_Rsi_Div_Explanation_Paragraph) => {
  const isMobile = useIsMobile()
  return (
    <Box sx={{ textAlign: 'center', fontSize: '20px' }}>
      <h3 style={{ fontSize: '30px', fontWeight: 'bold' }}>{props?.MainTitle}</h3>
      <Typography sx={{ fontSize: '20px' }}>
        <RichText markdown={props?.MainParagraph?.data?.MainParagraph} />
      </Typography>
      <h3 style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '48px' }}>{props?.SecondTitle}</h3>
      <RichText markdown={props?.SecondParagraph?.data?.SecondParagraph} />
      <Grid
        container
        sx={{
          width: { xs: '100%', md: '80%' },
          backgroundColor: theme.palette.background.light,
          marginX: 'auto',
          marginBottom: '32px',
          marginTop: '48px',
          padding: '16px',
        }}
      >
        {props?.Charts?.map((chart) => (
          <Grid item xs={12} md={6} sx={{ padding: '16px' }}>
            <Image media={chart} />
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ fontSize: '20px' }}>
        <RichText markdown={props?.ThirdParagraph?.data?.ThirdParagraph} />
      </Typography>
      <NoSsr>
        {/* during build gatsby SOMETIMES breaks at media querries from mui and doesn't apply styles :) */}
        <Box sx={{ width: { xs: '100%', md: '240px' }, marginX: 'auto', marginY: '72px' }}>
          <Button button={props?.FreeTrialButton} centered={isMobile} />
        </Box>
      </NoSsr>
    </Box>
  )
}
export default ExplanationSection
