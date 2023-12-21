import { Grid, Typography } from '@mui/material'
import { Strapi__Component_Pricing_Tiers } from 'gatsby-graphql'
import React from 'react'
import Tier from './tier'

interface ITiersProps {
  tiers: Array<Strapi__Component_Pricing_Tiers>
  RsiDivAlertsLegend: string
}
const Tiers = (props: ITiersProps) => {
  return (
    <Grid container>
      {props?.tiers?.map((tier, index) => (
        <Grid item xs={12} md={12 / props.tiers.length} marginTop={'128px'}>
          <Tier tier={tier} index={index} totalLength={props?.tiers?.length} />
        </Grid>
      ))}
      <Grid item sx={{ marginBottom: '120px' }}>
        <Typography>* {props?.RsiDivAlertsLegend}</Typography>
      </Grid>
    </Grid>
  )
}

export default Tiers
