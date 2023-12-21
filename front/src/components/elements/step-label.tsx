import { Box } from '@mui/material'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'

const StepLabelBorderRadius = '3px'
const StepLabelTriangleSize = '10px'

interface StepLabelProps {
  children: React.ReactNode
  style?: React.CSSProperties | undefined
  backgroundColor?: string
}
export const StepLabel = (props: StepLabelProps) => {
  const { children } = props
  return (
    <Box
      style={props.style}
      sx={{
        textAlign: 'center',
        width: '80px',
        height: '80px',
        backgroundColor: props.backgroundColor || theme.palette.success.main,
        marginBottom: '20px',
        position: 'relative',
        borderRadius: StepLabelBorderRadius,
        '&::before': {
          //tiny triangle at the bottom of a StepLabel
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '50%',
          marginLeft: `-${StepLabelTriangleSize}`,
          width: '0',
          height: '0',
          borderBottom: `solid ${StepLabelTriangleSize} transparent`,
          borderTop: `solid ${StepLabelTriangleSize} ${props.backgroundColor || theme.palette.success.main}`,
          borderLeft: `solid ${StepLabelTriangleSize} transparent`,
          borderRight: `solid ${StepLabelTriangleSize} transparent`,
        },
      }}
    >
      {children}
    </Box>
  )
}
