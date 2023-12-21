import React from 'react'
import { Box, styled } from '@mui/material'

interface BaloonContainerProps {
  triangleLocation: 'right' | 'left'
}

const SpeechBaloonBorderRadius = '5px'
const SpeechBalloonContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'triangleLocation',
})<BaloonContainerProps>((props) => ({
  width: '100%',
  padding: '25px',
  paddingTop: '40px',
  backgroundColor: props.theme.palette.primary.light,
  position: 'relative',
  color: 'black',
  borderTopLeftRadius: SpeechBaloonBorderRadius,
  borderTopRightRadius: SpeechBaloonBorderRadius,
  borderBottomLeftRadius: props.triangleLocation == 'left' ? 'inherit' : SpeechBaloonBorderRadius,
  borderBottomRightRadius: props.triangleLocation == 'right' ? 'inherit' : SpeechBaloonBorderRadius,
  '&::before': {
    //tiny triangle at the bottom of a balloon
    content: '""',
    position: 'absolute',
    top: '100%',
    right: props.triangleLocation == 'left' ? 'inherit' : '0%',
    marginLeft: '-50%',
    width: '0',
    height: '0',
    borderBottom: 'solid 60px transparent',
    borderLeft:
      props.triangleLocation == 'left' ? `solid 30px ${props.theme.palette.primary.light}` : 'solid 30px transparent',
    borderRight:
      props.triangleLocation == 'right' ? `solid 30px ${props.theme.palette.primary.light}` : 'solid 30px transparent',
  },
}))

interface SpeechBalloonProps {
  children: React.ReactNode
  variant: 'left' | 'right'
}
const SpeechBalloon = (props: SpeechBalloonProps) => {
  const { children, variant } = props
  return <SpeechBalloonContainer triangleLocation={variant}>{children}</SpeechBalloonContainer>
}

export default SpeechBalloon
