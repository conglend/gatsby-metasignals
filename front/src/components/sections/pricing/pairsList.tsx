import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { theme } from 'src/theme/ThemeProvider'
import { IconButton } from 'gatsby-theme-material-ui'
import { Icon } from '@/components/elements/icon'
import { useIsFirefox } from '@/utils/hooks'

interface IPairsListProps {
  pairs: string[]
}
const PairsList = ({ pairs }: IPairsListProps) => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)
  const [scrollbarRef, setScrollbarRef] = useState<HTMLDivElement | null>(null)

  const [buttonsAreVisable, setButtonsAreVisable] = useState(true)
  const handleScrollbarRef = useCallback((node) => {
    setScrollbarRef(node)
  }, [])
  const handlecontentRef = useCallback((node) => {
    setContentRef(node)
  }, [])
  useEffect(() => {
    if (!contentRef || !scrollbarRef) return
    const buttonsVisable = scrollbarRef?.clientHeight < contentRef?.clientHeight
    setButtonsAreVisable(buttonsVisable)
  }, [contentRef, scrollbarRef])

  const isFirefox = useIsFirefox()

  return (
    <Box
      sx={{
        height: '700px',
        position: 'relative',
        paddingY: '22px',
      }}
    >
      {buttonsAreVisable && (
        <IconButton
          onClick={() => {
            if (scrollbarRef) {
              scrollbarRef.scrollTop = 0
            }
          }}
          sx={{
            width: '48px',
            display: buttonsAreVisable ? 'flex' : 'none',
            justifyContent: 'center',
            textAlign: { md: 'left', xs: 'center' },
            padding: 1.2,
            minWidth: 0,
            position: 'absolute',
            top: '32px',
            right: isFirefox ? 'calc(3% + 1px)' : 'calc(3%)',
            zIndex: '5000',
          }}
        >
          <Icon icon="arrowTop" />
        </IconButton>
      )}
      {buttonsAreVisable && (
        <IconButton
          onClick={() => {
            if (scrollbarRef) {
              scrollbarRef.scrollTop = scrollbarRef?.scrollHeight
            }
          }}
          sx={{
            width: '48px',
            display: buttonsAreVisable ? 'flex' : 'none',
            justifyContent: 'center',
            textAlign: { md: 'left', xs: 'center' },
            padding: 1.2,
            minWidth: 0,
            position: 'absolute',
            bottom: '32px',
            right: isFirefox ? 'calc(3% + 1px)' : 'calc(3%)',
            zIndex: '5000',
          }}
        >
          <Icon icon="arrowBottom" />
        </IconButton>
      )}
      <Box
        ref={handleScrollbarRef}
        //@ts-ignore
        sx={{
          width: { md: 'calc(90% - 3px)', lg: 'calc(90%)' },
          height: 'calc(80% - 64px)',
          position: 'absolute',
          top: 'calc(10% + 32px)',
          overflowY: buttonsAreVisable ? 'scroll' : 'none',
          scrollbarColor: `${theme.palette.success.light} transparent`, //firefox
          scrollbarWidth: 'thin', //firefox
          '&::-webkit-scrollbar': {
            display: buttonsAreVisable ? 'block' : 'none',
            background: theme.palette.grey[200],
            width: '8px',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.success.light,
            borderRadius: '4px',
          },
        }}
      >
        <Box ref={handlecontentRef}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {pairs?.map((pair) => (
              <li>
                <Typography sx={{ fontSize: '20px' }}>{pair}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  )
}

export default PairsList
