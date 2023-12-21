import { useIsMobile } from '@/utils/hooks'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { IconButton } from 'gatsby-theme-material-ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { theme } from 'src/theme/ThemeProvider'
import { Icon } from './icon'

interface ICustomAudioProps {
  prompt: string
  audioTag: HTMLAudioElement | null
}
export default (props: ICustomAudioProps) => {
  const isMobile = useIsMobile()
  const audioTag = props?.audioTag
  const [progress, setProgress] = useState(0)
  const handleAudioProgress = useCallback(() => {
    setProgress(audioTag?.currentTime ?? 0), [audioTag]
  }, [audioTag])

  useEffect(() => {
    if (audioTag) {
      audioTag.addEventListener('timeupdate', handleAudioProgress)
    }
    return () => {
      if (audioTag) {
        audioTag.removeEventListener('timeupdate', handleAudioProgress)
      }
    }
  }, [audioTag, handleAudioProgress])

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainer(node)
    }
  }, [])
  const BUTTON_SIZE = isMobile ? 70 : 100
  const BAR_WIDTH =
    container?.getBoundingClientRect().right && container?.getBoundingClientRect().left
      ? container?.getBoundingClientRect().right - container?.getBoundingClientRect()?.left - 1.2 * BUTTON_SIZE
      : 100
  const BAR_HEIGHT = 100
  const INDICATORS_NUMBER = isMobile ? 100 : 200
  const INDICATOR_WIDTH = 1
  const INDICATOR_HEIGHTS = [
    //sequence of heights of all the tiny bars. Could it be generated somehow from volume of the audio file?
    12, 33, 42, 11, 63, 34, 5, 0, 0, 12, 44, 66, 53, 15, 43, 52, 38, 0, 6, 14, 39, 64, 21, 8, 72, 43, 0, 23, 52, 31, 0,
    64, 11, 14, 11, 32, 75, 22, 0, 32, 10, 12, 29, 46, 54, 29, 0, 1, 18, 42, 43, 12, 33, 22, 2, 32, 35, 0, 0, 2, 12, 75,
    43, 23, 45, 33, 22, 9, 6, 14, 9, 14, 21, 8, 72, 43,
  ]
  const toggleAudioPlaying = () => {
    if (audioTag) {
      audioTag.paused ? audioTag.play() : audioTag.pause()
    }
  }

  const rewindAudio = useCallback((targetDuration: number, audioTag: HTMLAudioElement) => {
    audioTag.currentTime =
      targetDuration < 0 ? 0 : targetDuration > audioTag.duration ? audioTag.duration : targetDuration
  }, [])

  const barRef = useRef<HTMLDivElement>(null)
  return (
    <>
      {audioTag && (
        <Box ref={containerRef} sx={{ margin: '36px' }}>
          <Grid container sx={{ width: '100%', alignItems: 'center', outline: 'none' }}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                {props?.prompt}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                style={{
                  width: 0.9 * BUTTON_SIZE,
                  height: 0.9 * BUTTON_SIZE,
                  backgroundColor: audioTag.paused ? theme.palette.grey[400] : theme.palette.grey[700],
                  margin: 0.1 * BUTTON_SIZE,
                }}
              >
                <Icon
                  icon="videoPlayer"
                  onClick={toggleAudioPlaying}
                  style={{
                    width: 0.5 * BUTTON_SIZE,
                    height: 0.5 * BUTTON_SIZE,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <Box
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  if (barRef?.current) {
                    const targetDuration =
                      audioTag.duration * ((e.pageX - barRef.current.getBoundingClientRect().left) / BAR_WIDTH)
                    rewindAudio(targetDuration, audioTag)
                    audioTag.play()
                  }
                }}
                ref={barRef}
                sx={{
                  position: 'relative',
                  width: `${BAR_WIDTH}px`,
                  height: `${BAR_HEIGHT}px`,
                  background: `linear-gradient(to right, ${theme.palette.grey[700]} ${
                    (progress / audioTag?.duration) * 100
                  }%, ${theme.palette.grey[400]} ${(progress / audioTag?.duration) * 100}%)`,
                  outline: 'none',
                }}
              >
                <svg style={{ width: '100%', height: '100%', outline: 'none' }}>
                  <mask id="mask">
                    <rect fill="white" width="100%" height="100%" />
                    {[...Array(INDICATORS_NUMBER).keys()].map((index) => (
                      <>
                        {index != 0 &&
                          index != INDICATORS_NUMBER && ( //we skip first and last bar to simulate a margin
                            <rect
                              x={(index + 1) * (BAR_WIDTH / INDICATORS_NUMBER)}
                              y={(BAR_HEIGHT - INDICATOR_HEIGHTS[index % INDICATOR_HEIGHTS.length]) / 2}
                              width={INDICATOR_WIDTH}
                              height={INDICATOR_HEIGHTS[index % INDICATOR_HEIGHTS.length]}
                              stroke="black" //color doesn't matter for masks - it will end up as transparent anyway
                              stroke-width="2"
                              fill="black"
                            ></rect>
                          )}
                      </>
                    ))}
                  </mask>
                  <rect mask="url(#mask)" fill="white" width="100%" height="100%" />
                </svg>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}
