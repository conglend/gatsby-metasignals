import { Box, IconButton, Modal } from '@mui/material'
import { Strapi__Media } from 'gatsby-graphql'
import React, { ReactNode, useState } from 'react'
import { Icon } from './icon'
import Image from '@/components/image'
import { theme } from 'src/theme/ThemeProvider'

interface IImageCarouselProps {
  children: ReactNode
  images: Array<Strapi__Media>
  startFrom: number
}

const buttonHeight = 28
const ImageCarouselModal = (props: IImageCarouselProps) => {
  const length = props?.images?.length
  const [currentImage, setCurrentImage] = useState(props.startFrom)
  const shiftRight = () => setCurrentImage(currentImage + 1 >= length ? length - 1 : currentImage + 1)
  const shiftLeft = () => setCurrentImage(currentImage - 1 < 0 ? 0 : currentImage - 1)
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
              paddingTop: '150px',
              width: '100vw',
              alignContent: 'center',
              display: 'flex',
              outline: 'none',
              justifyContent: 'center',
              height: '90vh',
            }}
          >
            <IconButton onClick={shiftLeft} sx={{ height: 86, marginY: 'auto' }}>
              <Icon icon="chevronLeft" style={{ height: 32, width: 32 }} />
            </IconButton>
            <Box sx={{ width: '80%', position: 'relative', height: '100%', display: 'flex' }}>
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
              <Image
                media={props?.images[currentImage]}
                style={{ maxWidth: '100%', outline: 'none', margin: 'auto', maxHeight: '100%' }}
                imageStyle={{ objectFit: 'scale-down' }}
              />
            </Box>
            <IconButton onClick={shiftRight} sx={{ height: 86, marginY: 'auto' }}>
              <Icon icon="chevronRight" style={{ height: 32, width: 32 }} />
            </IconButton>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}
export default ImageCarouselModal
