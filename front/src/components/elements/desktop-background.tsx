import { useIsDesktopLarge } from '@/utils/hooks'
import { Box } from '@mui/system'
import React from 'react'
import Background from '../../assets/background.svg'

const DesktopBackground = () => {
  const isDesktopLarge = useIsDesktopLarge()
  return (
    <>
      <Box sx={{ width: '100%', height: '100%', zIndex: -9000 }}>
        <Box
          sx={{
            height: '100%',
            maxWidth: '100vw',
            width: '100vw',
            position: 'absolute',
            zIndex: -9000,
            overflow: 'hidden',
          }}
        >
          <Background
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              opacity: 0.2,
              position: 'absolute',
              top: '0',
              width: isDesktopLarge ? '320vh' : '330vh',
              height: isDesktopLarge ? '320vh' : '330vh',
              left: isDesktopLarge ? '-40vw' : '-110vw',
              zIndex: -9000,
            }}
          />

          <Background
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              opacity: 0.2,
              position: 'absolute',
              top: isDesktopLarge ? '225vh' : '275vh',
              width: isDesktopLarge ? '320vh' : '330vh',
              height: '300vh',
              left: isDesktopLarge ? '-120vw' : '-200vw',
              zIndex: -9000,
            }}
          />
        </Box>
      </Box>
    </>
  )
}
export default DesktopBackground
