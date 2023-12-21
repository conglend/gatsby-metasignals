import React, { DOMAttributes } from 'react'

if (typeof window !== 'undefined') {
  //dynamically import model-viewer at runtime
  // @ts-ignore
  import('@google/model-viewer/dist/model-viewer.js')
}

import { NoSsr } from '@mui/material'

interface IModelProps {
  src: string
  height: string
  isMobile?: boolean
}
type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>

//declare type for webcomponent
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ['model-viewer']: CustomElement<any>
    }
  }
}
const Model: React.FunctionComponent<IModelProps> = ({ src, height, isMobile }) => {
  return (
    <div style={{ height: height }}>
      <NoSsr>
        <model-viewer
          alt="Example alert card for MetaSignals lite"
          style={{
            width: '100%',
            height: height,
            '--poster-color': 'transparent',
          }}
          src={src}
          seamless-poster
          camera-controls
          environment-image="neutral"
          generate-schema
          shadow-intensity="1"
          auto-rotate
          auto-rotate-delay={500}
          rotation-per-second="300%"
          interaction-prompt-threshold={5000}
          camera-orbit={`45deg 90deg ${isMobile ? '1.25m' : '2m'}`}
        ></model-viewer>
      </NoSsr>
    </div>
  )
}

export default Model
