import { Fade, NoSsr } from '@mui/material'
import InView from 'react-intersection-observer'
import React from 'react'

interface IFadeInProps {
  children: React.ReactElement<any, any>
  timeout?: number
}
//fadein used as a wraper around mui components
const FadeIn = ({ children, timeout = 600 }: IFadeInProps) => (
  // @ts-ignore
  <InView triggerOnce>
    {({ inView, ref }) => (
      <div ref={ref}>
        <NoSsr>
          <Fade in={inView} timeout={timeout} unmountOnExit>
            {children}
          </Fade>
        </NoSsr>
      </div>
    )}
  </InView>
)
export default FadeIn
