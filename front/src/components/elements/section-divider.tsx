import React from 'react'
import { Box, Divider, DividerProps } from '@mui/material'

export const SectionDivider = (props: DividerProps) => (
  <Box
    sx={{
      width: '100vw',
      marginLeft: 'calc((-100vw + 100%)/2)',
      position: 'relative',
      '&::before': {
        height: '1px',
        backgroundColor: 'rgb(0,0,0,.2)',
        content: '""',
        position: 'absolute',
        left: 'calc((100% - 100vw)/2)',
        width: '100vw',
      },
    }}
  >
    <Divider
      sx={{
        borderTop: 'solid 1px rgba(0, 0, 0, 0.2)',
        marginTop: '30px',
        marginBottom: '30px',
        width: '100%',
        height: '0px',
        opacity: '25%',
        color: 'white',
      }}
      {...props}
    />
  </Box>
)
