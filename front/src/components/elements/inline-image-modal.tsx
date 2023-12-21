import { Box, IconButton, Modal } from '@mui/material'
import { Strapi__Media } from 'gatsby-graphql'
import React, { ReactNode } from 'react'
import { Icon } from './icon'
import Image from '@/components/image'
import { theme } from 'src/theme/ThemeProvider'

interface IImageModalProps {
  children: ReactNode
  image: Strapi__Media
}

const buttonHeight = 28
const ImageModal = (props: IImageModalProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <span>
      <span onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {props.children}
      </span>
      <span>
        <Modal
          sx={{
            outline: 'none',
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              paddingTop: '50px',
              width: '100vw',
              alignContent: 'center',
              display: 'flex',
              outline: 'none',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '80%', position: 'relative' }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  outline: 'none',
                  top: -buttonHeight / 2,
                  right: -buttonHeight / 2,
                  width: buttonHeight,
                  height: buttonHeight,
                  background: theme.palette.grey[600],
                  zIndex: 10,
                }}
              >
                <Icon icon="close" />
              </IconButton>
              <Image media={props?.image} style={{ width: '100%', outline: 'none' }} />
            </Box>
          </Box>
        </Modal>
      </span>
    </span>
  )
}
export default ImageModal
