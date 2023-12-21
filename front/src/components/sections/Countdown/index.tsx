import React, { useEffect, useState } from 'react'
import { CountdownPart } from './Countdownpart'
import { useRhythmicRerender } from './useRhythmicRerender'
import { Box, CircularProgress, Typography } from '@mui/material'

interface CountdownProps {
  endsAt: number
  precision?: string
  CountDownLiveText?: string
  CountDownOfferText?: string
}

const Countdown: React.FC<CountdownProps> = ({ endsAt, CountDownOfferText, CountDownLiveText }) => {
  useRhythmicRerender()

  const MS_IN_SEC = 1000
  const MS_IN_MIN = 60 * MS_IN_SEC
  const MS_IN_HOUR = 60 * MS_IN_MIN

  const now = Date.now()
  const unitsToShow = ['days', 'hours', 'mins', 'secs']

  const formatDuration = (durationInMs: number, units: string[]) => {
    const duration = {} as Record<string, number>

    units.reduce((msLeft, unit, index) => {
      const msInCurrentUnit =
        unit === 'days' ? MS_IN_HOUR * 24 : unit === 'hours' ? MS_IN_HOUR : unit === 'mins' ? MS_IN_MIN : MS_IN_SEC

      const isLast = index === units.length - 1
      const roundFunction = isLast ? Math.floor : Math.floor
      const period = roundFunction(msLeft / msInCurrentUnit)
      duration[unit] = period

      return msLeft - period * msInCurrentUnit
    }, durationInMs)

    return duration
  }

  const [countdownOver, setCountdownOver] = useState<boolean | null>(null)

  const duration = formatDuration(Math.max(endsAt - now, 0), unitsToShow)

  useEffect(() => {
    if (duration) {
      const isCountdownOver = duration.days === 0 && duration.hours === 0 && duration.mins === 0 && duration.secs === 0
      if (isCountdownOver) {
        setCountdownOver(isCountdownOver)
      } else {
        setCountdownOver(false)
      }
    }
  }, [duration])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {countdownOver === null ? (
          <Typography
            component={'h1'}
            sx={{
              maxWidth: '866px',
              fontSize: '20.4px',
              fontWeight: 700,
              textAlign: 'center',
              padding: '10px 0px ',
              margin: 'auto',
            }}
          >
            <CircularProgress color="primary" />
          </Typography>
        ) : countdownOver ? (
          <Typography
            component={'h1'}
            sx={{
              maxWidth: '866px',
              fontSize: '23.4px',
              fontWeight: 700,
              textAlign: 'center',
              paddingTop: { xs: '24px', lg: '48px' },
              paddingBottom: { xs: '34px', lg: '64px' },
              margin: 'auto',
            }}
          >
            {CountDownLiveText ? CountDownLiveText : ' NFT MINT NOW LIVE'}
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              component={'h1'}
              sx={{
                maxWidth: '866px',
                fontSize: '23.4px',
                fontWeight: 700,
                textAlign: 'center',
                padding: '10px 0px ',
                margin: 'auto',
              }}
            >
              {CountDownOfferText ? CountDownOfferText : 'Secure lifetime access in'}
            </Typography>

            <Box sx={{ display: 'flex', gap: { xs: '16px', md: '24px' } }}>
              {unitsToShow.map((unit) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                    }}
                    key={unit}
                  >
                    <CountdownPart value={duration[unit] || 0} unit={unit} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default Countdown
