import * as React from 'react'
import { Dialog, DialogContent, DialogContentText, Box, IconButton, Typography } from '@mui/material'
import { Strapi__Component_Layout_Financial_Advice_Popup } from 'gatsby-graphql'
import Image from '../image'
import RichText from '../elements/rich-text'
import { Icon } from '../elements/icon'

const buttonHeight = 28

const FinancialAdvicePopup: React.FunctionComponent<Strapi__Component_Layout_Financial_Advice_Popup> = (props) => {
  const popupDismissed =
    !props.IsActive || typeof localStorage === `undefined` || localStorage.getItem('popupDismissed') === 'true'
  const [open, setOpen] = React.useState(!popupDismissed)
  const handleClose = () => {
    localStorage.setItem('popupDismissed', 'true')
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        style={{
          position: 'relative',
        }}
      >
        <DialogContentText>
          <Box
            sx={{
              outline: 'none',
              maxWidth: { lg: 1000, md: 900, xs: '90vw' },
              marginX: 'auto',
            }}
          >
            <Box sx={{ margin: 'auto', width: '132px', marginY: '24px' }}>
              <Image media={props.Image} />
            </Box>
            <Typography
              sx={{ textAlign: 'center', fontSize: { xs: 30, md: 40 }, fontWeight: 'bold', color: '#333333' }}
            >
              {props.Title}
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#333333' }}>
              <RichText markdown={props.Paragraph.data.Paragraph} />
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                outline: 'none',
                position: 'absolute',
                top: 28,
                right: 28,
                zIndex: 2,
                width: buttonHeight,
                height: buttonHeight,
              }}
            >
              <Icon icon="closeGrey" />
            </IconButton>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default FinancialAdvicePopup
