import FadeIn from '@/components/elements/fade-in'
import RichText from '@/components/elements/rich-text'
import Image from '@/components/image'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { Strapi__Component_Guide_How_To_Read_An_Alert } from 'gatsby-graphql'
import React from 'react'

const HowToReadAnAlert = (props: Strapi__Component_Guide_How_To_Read_An_Alert) => {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ marginBottom: { xs: '40px', md: '60px' } }}>
      <Grid item xs={12} sx={{ marginBottom: { xs: '40px', md: '60px' } }}>
        <FadeIn>
          <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}> {props?.Title} </Typography>
        </FadeIn>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} sx={{ marginBottom: { xs: '10px', md: 'inherit' } }} order={{ xs: 1, md: 0 }}>
          {props?.HowToReadAnAlertRows.map((row, index) => {
            return (
              <FadeIn key={index}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        width: '30%',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}
                    >
                      {row?.Label}
                    </Typography>
                    <Typography sx={{ width: '70%', fontSize: '16px', textAlign: 'left' }}>
                      <RichText markdown={row?.Description?.data?.Description} />
                    </Typography>
                  </Box>
                  {props?.HowToReadAnAlertRows[index + 1] && (
                    <Divider
                      sx={{
                        borderTop: 'solid 1px rgba(0, 0, 0, 0.2)',
                        marginTop: '10px',
                        marginBottom: '10px',
                        width: '100%',
                        height: '0px',
                        opacity: '25%',
                        color: 'white',
                      }}
                    />
                  )}
                </Box>
              </FadeIn>
            )
          })}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginBottom: { xs: '50px', md: 'inherit' }, paddingLeft: { md: '50px' } }}
          order={{ xs: 0, md: 1 }}
        >
          <Image
            media={props?.AlertCard}
            style={{
              maxHeight: '700px',
              outline: 'none',
              margin: 'auto',
              width: '100%',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HowToReadAnAlert
