import { Box } from '@mui/material'
import React from 'react'
import InlineTextModal, { ITextModalProps } from './inline-text-modal'

const TextModal = (props: ITextModalProps) => {
  return (
    <Box>
      <InlineTextModal {...props} />
    </Box>
  )
}
export default TextModal
