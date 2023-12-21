import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Partners_Advantage } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'
import Image from '@/components/image'
import RichText from '@/components/elements/rich-text'

interface IAdvantagesSection {
  title: string
  advantages: Array<Strapi__Component_Partners_Advantage>
}
const AdvantagesSection = (props: IAdvantagesSection) => {
  return (
    <Grid
      container
      sx={{
        marginBottom: '60px',
        marginTop: { md: '30px', xs: 'none' },
      }}
    >
      <Grid item xs={12}>
        <Typography sx={{ fontSize: '40px', textAlign: 'center', fontWeight: 'bold', padding: '20px' }}>
          {props?.title}
        </Typography>
      </Grid>
      {props?.advantages?.map((advantage) => (
        <Grid item xs={12} md={6} sx={{ paddingX: '15px', paddingY: { md: '0px', xs: '30px' } }}>
          <Box
            sx={{
              maxWidth: '100%',
              paddingBottom: '30px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: '75%', sm: '50%' },
                marginBottom: '-40px',
              }}
            >
              <Image media={advantage.Image} />
            </Box>
            <Box
              sx={{
                width: '100%',
                minHeight: { lg: '320px', md: '450px' },
                padding: '25px',
                paddingTop: '50px',
                backgroundColor: theme.palette.primary.light,
                position: 'relative',
                color: 'black',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: -1,
                boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.4);',
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: '40px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                {advantage.Title}
              </Typography>

              <div>
                <RichText
                  markdown={advantage?.Paragraph1?.data?.Paragraph1}
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '24px',
                    textAlign: 'center',
                  }}
                />

                <RichText
                  markdown={advantage?.Paragraph2?.data?.Paragraph2}
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: '24px',
                    textAlign: 'center',
                  }}
                />
              </div>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
export default AdvantagesSection
