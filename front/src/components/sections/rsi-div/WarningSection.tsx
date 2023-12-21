import RichText from '@/components/elements/rich-text'
import { Typography, Box } from '@mui/material'
import { Strapi__Component_Rsi_Div_Warning_Paragraph } from 'gatsby-graphql'
import React from 'react'

const WarningSection = (props: Strapi__Component_Rsi_Div_Warning_Paragraph) => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
      <Typography sx={{ marginTop: { xs: '32px', md: '0' }, fontSize: '30px', fontWeight: 'bold' }}>
        {props?.Title}
      </Typography>
      <Typography sx={{ fontSize: '20px' }}>
        <RichText markdown={props?.Paragraph?.data?.Paragraph} />
      </Typography>
    </Box>
  )
}
export default WarningSection
