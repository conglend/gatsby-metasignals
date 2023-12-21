import { Box, Modal } from '@mui/material'
import { Strapi__Media } from 'gatsby-graphql'
import React, { ReactNode } from 'react'

import Image from '@/components/image'

interface IImageModalProps {
  children: ReactNode
  image: Strapi__Media
}

const BiggerImageModal = (props: IImageModalProps) => {
  const [open, setOpen] = React.useState(false)
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
              paddingTop: '50px',
              width: '100vw',
              alignContent: 'center',
              display: 'flex',
              outline: 'none',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '95%' }}>
              <Image media={props?.image} style={{ width: '100%', outline: 'none' }} />
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}
export default BiggerImageModal
