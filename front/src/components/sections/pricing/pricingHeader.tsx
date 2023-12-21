import FadeIn from '@/components/elements/fade-in'
import RichText from '@/components/elements/rich-text'
import { Box, Typography } from '@mui/material'
import { Strapi__Component_Pricing_Pricing_Header } from 'gatsby-graphql'
import React from 'react'

const PricingHeader = (props: Strapi__Component_Pricing_Pricing_Header) => {
  return (
    <FadeIn>
      <Box>
        <Typography sx={{ fontSize: 20 }}>
          <RichText markdown={props?.Paragraph1.data?.Paragraph1} />
        </Typography>

        <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 'bold' }}>{props?.Title}</Typography>

        <br />
        <Typography sx={{ fontSize: 20 }}>
          <RichText markdown={props?.Paragraph2.data?.Paragraph2} />
        </Typography>
      </Box>
    </FadeIn>
  )
}

export default PricingHeader
