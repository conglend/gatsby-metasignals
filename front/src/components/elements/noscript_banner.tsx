import { Box, Typography } from '@mui/material'
import React from 'react'

export const NoscriptBanner = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0042CD',
        padding: '20px',
        top: 0,
        position: 'fixed',
        zIndex: 99999999999,
      }}
    >
      <Typography sx={{ fontSize: 40, width: '100%', paddingTop: '30vh', textAlign: 'center' }}>
        This website is best experienced with JavaScript enabled. Without JavaScript certain functionalities / content
        will not work / display as intended. Please enable JavaScript.
      </Typography>
    </Box>
  )
}
