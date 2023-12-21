import RichText from '@/components/elements/rich-text'
import Image from '@/components/image'
import { getArrayFromSpaceSeparatedString } from '@/utils/helpers'
import { useIsMobile } from '@/utils/hooks'

import { Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Rsi_Div_Main } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const Main = (props: Strapi__Component_Rsi_Div_Main) => {
  const isMobile = useIsMobile()
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: '20px', width: { xs: '100%', md: '66%' }, margin: 'auto' }}>
        {props?.SmallTitle}
      </Typography>

      <Typography sx={{ fontSize: { xs: '30px', md: '40px' }, fontWeight: 'bold' }}>{props?.Title}</Typography>

      <Box sx={{ width: { xs: '100%', md: '80%' }, margin: 'auto', position: 'relative' }}>
        <Typography
          sx={{
            fontSize: '20px',
          }}
        >
          <RichText markdown={props?.WhatYouGetParagraph?.data?.WhatYouGetParagraph} />
        </Typography>
        <Typography sx={{ marginTop: '64px', fontSize: '30px', fontWeight: 'bold' }}>{props?.TableTitle}</Typography>
        <ul
          style={{
            paddingInlineStart: '0',
            border: `solid 2px ${theme.palette.background.light}`,
            listStyle: 'none',
            textAlign: 'left',
            columns: 2,
            columnRule: `solid 2px ${theme.palette.background.light}`,
            margin: 'auto',
            marginTop: '32px',
            marginBottom: '200px',
            width: isMobile ? '100%' : '75%',
            fontSize: 20,
          }}
        >
          {props?.Pairs &&
            getArrayFromSpaceSeparatedString(props.Pairs).map((pair, index, arr) => (
              <li
                style={{
                  //paddings for first and last elements in each column are here to extend collumns with their divider
                  paddingTop: index === arr.length * 0 || index === arr.length * 0.5 ? '30px' : '2px',
                  paddingBottom: index + 1 === arr.length * 0.5 || index + 1 === arr.length * 1 ? '30px' : '2px',
                  textAlign: 'center',
                }}
              >
                {pair}
              </li>
            ))}
        </ul>
        <Grid item xs={12}>
          <Box
            sx={{
              marginY: { md: '100px', xs: '100px', sm: '125px' },
              height: { md: '200px', lg: '314px' },
              width: '100vw',
              backgroundColor: theme.palette.primary.main,
              marginLeft: 'calc((-100vw + 100%)/2)',
              paddingY: { md: '50px', xs: '10px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              sx={{
                alignContent: 'center',
                alignItems: 'center',
                maxWidth: { lg: 1140, xs: 900 },
                height: { md: '200px' },
                margin: '0 auto',
                padding: { xs: 2, md: 0 },
                marginY: { xs: 'calc(-10vw - 64px)', md: 'inherit' },
              }}
            >
              {props?.AlertCards?.map((card) => (
                <Grid
                  item
                  md={3}
                  xs={12}
                  sx={{ paddingX: { xs: '12.5%', md: '1%' }, marginY: { xs: '16px', md: 'inherit' } }}
                >
                  <Image
                    media={card}
                    style={{ boxShadow: isMobile ? '0px 0px 32px -10px black' : '0px 0px 16px -10px black' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
export default Main
