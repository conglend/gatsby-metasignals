import { Box, Modal, Zoom } from '@mui/material'
import { IconButton } from 'gatsby-theme-material-ui'
import { useState } from 'react'
import { Icon } from './icon'
import Image from '../image'
import { Strapi__Media } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

interface IPhoneModalProps {
  image: Strapi__Media
}
export const LeftPhoneModal = ({ image }: IPhoneModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const handleClose = () => setIsZoomed(false)
  const handleOpen = () => setIsZoomed(true)
  return (
    <>
      <Box sx={{ position: 'absolute', width: '50%', height: '80%', top: 0, left: 0 }} onClick={handleOpen} />
      <PopUp handleClose={handleClose} isZoomed={isZoomed} image={image} />
    </>
  )
}
export const RightPhoneModal = ({ image }: IPhoneModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const handleClose = () => setIsZoomed(false)
  const handleOpen = () => setIsZoomed(true)
  return (
    <>
      <Box sx={{ position: 'absolute', width: '50%', height: '80%', bottom: 0, right: 0 }} onClick={handleOpen} />
      <PopUp handleClose={handleClose} isZoomed={isZoomed} image={image} />
    </>
  )
}

interface IPopUpProps {
  handleClose: () => void
  isZoomed: boolean
  image: Strapi__Media
}
const buttonHeight = 84
const PopUp = ({ handleClose, isZoomed, image }: IPopUpProps) => (
  <Modal
    open={isZoomed}
    onClose={handleClose}
    sx={{
      outline: 'none',
    }}
  >
    <Zoom in={isZoomed}>
      <Box
        sx={{
          marginTop: '10%',
          marginX: 'auto',
          width: '85vw',
          outline: 'none',
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              outline: 'none',
              top: { sm: -buttonHeight / 2, xs: -buttonHeight / 4 },
              right: { sm: -buttonHeight / 2, xs: -buttonHeight / 4 },
              width: { sm: buttonHeight, xs: buttonHeight / 2 },
              height: { sm: buttonHeight, xs: buttonHeight / 2 },
              background: theme.palette.grey[600],
              zIndex: 10,
            }}
          >
            <Icon icon="close" />
          </IconButton>
          <Image
            media={image}
            style={{
              outline: 'none',
              margin: 'auto',
              width: '100%',
            }}
          />
        </Box>
      </Box>
    </Zoom>
  </Modal>
)
