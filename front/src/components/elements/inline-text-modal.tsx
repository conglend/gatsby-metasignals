import { Box, IconButton, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Icon } from './icon'
import { theme } from 'src/theme/ThemeProvider'
import ReactMarkdown from 'react-markdown'
import { Strapi__Component_Links_Modal_Link } from 'gatsby-graphql'

export interface ITextModalProps {
  modalLink: Strapi__Component_Links_Modal_Link
}
const buttonHeight = 28
const InlineTextModal = (props: ITextModalProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <span>
      <span onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {props.modalLink?.LinkText}
      </span>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            outline: 'none',
          }}
        >
          <Box
            sx={{
              outline: 'none',
              maxWidth: { lg: 1140, md: 900, xs: '90vw' },
              marginTop: '8vh',
              marginX: 'auto',
              position: 'relative',
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                outline: 'none',
                position: 'absolute',
                top: -buttonHeight / 2,
                right: -buttonHeight / 2,
                zIndex: 2,
                width: buttonHeight,
                height: buttonHeight,
                background: theme.palette.background.black,
              }}
            >
              <Icon icon="close" />
            </IconButton>
            <Box
              sx={{
                outline: 'none',
                padding: 0,
                background: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                borderRadius: '5px',
                overflow: 'none',
              }}
            >
              <Box
                sx={{
                  outline: 'none',
                  height: '80vh',
                }}
              >
                <Box
                  sx={{
                    '& ul ::marker': { color: theme.palette.success.main },
                    '& ul': {
                      paddingLeft: '20px',
                    },
                    '& ol': {
                      paddingLeft: '20px',
                    },
                    fontSize: '16px',
                    height: '75vh',
                    marginX: '18px',
                    paddingX: { md: '18px', xs: '0px' },
                    marginY: '30px',
                    borderRadius: '5px',
                    overflowY: 'scroll',
                    scrollbarColor: `${theme.palette.success.main} transparent`, //firefox
                    scrollbarWidth: 'thin', //firefox
                    '&::-webkit-scrollbar': {
                      display: 'block',
                      background: theme.palette.grey[200],
                      width: '8px',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: theme.palette.success.main,
                      borderRadius: '4px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      margin: '18px',
                    }}
                  >
                    <Typography sx={{ width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>
                      {props?.modalLink?.Title}
                    </Typography>
                    <Typography sx={{ width: '100%', textAlign: 'center', fontSize: '20px', marginBottom: '32px' }}>
                      {props?.modalLink?.Subtitle}
                    </Typography>
                    <ReactMarkdown children={props?.modalLink?.Content?.data?.Content} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </span>
  )
}
export default InlineTextModal
