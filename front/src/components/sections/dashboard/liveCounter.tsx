import { Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { theme } from 'src/theme/ThemeProvider'
interface ICounterProps {
  to: number
  duration: number
}
const LiveCounter = ({ to, duration }: ICounterProps) => {
  // current displayed value
  const [current, setCurrent] = useState(0)
  const [interval, setInterval] = useState(100)
  const [timerId, setTimerId] = useState<number | null>(null)

  useEffect(() => {
    // number we start counting from
    const from = Math.floor(
      Math.random() * 0.7 * (to - Math.pow(10, to.toString().length - 1)) + Math.pow(10, to.toString().length - 1),
    )
    setCurrent(from)
    setInterval(duration / (to - from))
  }, [to])

  useEffect(() => {
    if (current < to) {
      const timeId: any = setTimeout(() => {
        setCurrent((c) => (c >= to ? to : c + 1))
      }, interval)
      setTimerId(timeId as number)
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [current, to])

  // Convert number to  a 4-digit string
  const currentNumberString = current.toString().padStart(4, '0')
  const currentNumberLength = currentNumberString.length

  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <Grid container sx={{ gap: `${100 / (3 * currentNumberLength)}%`, width: '100%' }} ref={containerRef}>
      {[...currentNumberString].map((c, index) => (
        <Grid
          item
          key={index}
          sx={{
            background: theme.palette.success.main,
            height: '80px',
            flexGrow: 1,
            flexShrink: 1,
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::after': {
              // coma every 3rd digit
              content:
                (currentNumberLength - index - 1) % 3 == 0 && currentNumberLength - index - 1 !== 0 ? '","' : '""',
              position: 'absolute',
              fontSize: '40px',
              fontWeight: 'bold',
              right: `-${
                ((containerRef?.current?.getBoundingClientRect().width as number) / currentNumberLength) * 0.25 - 3
              }px`,
            },
          }}
        >
          <Typography fontSize="40px" fontWeight="bold" color={'primary.light'}>
            {c}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default LiveCounter
