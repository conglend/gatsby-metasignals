import { Box, IconButton, Modal } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { theme } from 'src/theme/ThemeProvider'
import { Icon } from './icon'
import { css } from '@emotion/css'

interface IEmbeddedVideoProps {
  children: ReactNode
  URL: string
}
const buttonHeight = 28
const EmbeddedVideo = (props: IEmbeddedVideoProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Box>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        {props.children}
      </Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{ outline: 'none' }} //safari
          aria-labelledby="meta-signals-video"
          aria-describedby="video-material"
        >
          <Box
            sx={{
              width: { xs: '90%', md: 900, lg: 1140 },
              maxWidth: '80%',
              margin: 'auto',
              position: 'relative',
              marginTop: '64px',
              paddinBottom: '64px',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                outline: 'none',
                top: `-${buttonHeight / 2}px`,
                right: `-${buttonHeight / 2}px`,
                width: buttonHeight,
                height: buttonHeight,
                background: theme.palette.grey[600],
                zIndex: 10,
              }}
            >
              <Icon icon="close" />
            </IconButton>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
              }}
            >
              <iframe
                className={css`
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 100%;
                  max-height: 70vh;
                  max-width: 70vw;
                  height: 100%;
                `}
                src={props?.URL}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Meta Signals Intro.mp4"
              ></iframe>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}
export default EmbeddedVideo
