import React from 'react'
import { SlidingCharacter, SlidingTensCharacter } from './SlidingCharacter'
import { usePrevious } from 'react-use'
import { Box, Typography } from '@mui/material'

interface Props {
  value: number
  unit: any
}

const padWithZero = (value: number, length = 2) => {
  return String(value).padStart(length, '0')
}

export const CountdownPart = ({ value, unit }: Props) => {
  const previousValue = usePrevious(value)

  const [currentString, previousString] = [
    value,
    previousValue == undefined || previousValue == null ? value : previousValue,
  ].map((number) => padWithZero(number))
  // if (unit == 'mins') console.log(previousValue, value, 'check')

  return (
    <Box
      sx={{
        width: { xs: '64px', md: '72px' },
        height: '68px',
        padding: { xs: '3px', md: '5px' },
        fontSize: { xs: '20px', md: '24px' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontWeight: 500,
        lineHeight: '1 !important',
        background: ' #419865',
        color: 'white !important',
        borderRadius: '6px',
        fontVariantNumeric: 'tabular-nums !important',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          columnGap: '6px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            fontWeight: 700,
            alignItems: 'center',
            justifyContent: 'center',
            pl: '2px',
          }}
        >
          {currentString.split('').map((character, index) => {
            const previousCharacter = previousString[index]
            const animationId = previousCharacter !== character ? `${character}` : undefined

            if (unit == 'hours' && index === 0 && previousString == '00' && currentString == '23') {
              const animationId = `${value}+${unit}`
              return (
                <Box
                  key={index}
                  sx={{
                    width: '15.83px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    height: '24px',
                  }}
                >
                  <SlidingTensCharacter
                    style={{
                      position: 'absolute',
                      width: '17.83px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    key={index}
                    animationid={animationId}
                    minandday={true}
                  >
                    {Array.from({ length: 9 }, (_, i) => (
                      <Typography
                        key={i}
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          m: 'auto',
                          p: 0,
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          lineHeight: 'inherit',
                          display: 'inline-block',
                        }}
                      >
                        {(i + 2) % 10}
                      </Typography>
                    ))}
                  </SlidingTensCharacter>
                </Box>
              )
            }
            if (unit == 'hours' && index === 1 && previousString == '00' && currentString == '23') {
              const animationId = `${value}+${unit}`
              return (
                <Box
                  key={index}
                  sx={{
                    width: '15.83px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    height: '24px',
                  }}
                >
                  <SlidingTensCharacter
                    style={{
                      position: 'absolute',
                      width: '17.83px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    key={index}
                    animationid={animationId}
                    minandday={true}
                  >
                    {Array.from({ length: 8 }, (_, i) => (
                      <Typography
                        key={i}
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          m: 'auto',
                          p: 0,
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          lineHeight: 'inherit',
                          display: 'inline-block',
                        }}
                      >
                        {(i + 3) % 10}
                      </Typography>
                    ))}
                  </SlidingTensCharacter>
                </Box>
              )
            }
            if (unit == 'mins' && index === 0 && previousString == '00' && currentString == '59') {
              const animationId = `${currentString}+${unit}`
              return (
                <Box
                  key={index}
                  sx={{
                    width: '15.83px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    height: '24px',
                  }}
                >
                  <SlidingTensCharacter
                    style={{
                      position: 'absolute',
                      width: '17.83px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    key={index}
                    animationid={animationId}
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <Typography
                        key={i}
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          m: 'auto',
                          p: 0,
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          lineHeight: 'inherit',
                          display: 'inline-block',
                        }}
                      >
                        {(i + 5) % 10}
                      </Typography>
                    ))}
                  </SlidingTensCharacter>
                </Box>
              )
            }
            if (unit === 'secs' && currentString === '59' && previousString === '00' && index === 0) {
              const animationId = `${currentString}+${index}`
              return (
                <Box
                  key={index}
                  sx={{
                    width: '15.83px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    height: '24px',
                  }}
                >
                  <SlidingTensCharacter
                    style={{
                      position: 'absolute',
                      width: '17.83px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    key={index}
                    animationid={animationId}
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <Typography
                        key={i}
                        sx={{
                          width: '100%',
                          textAlign: 'center',
                          m: 'auto',
                          p: 0,
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          lineHeight: 'inherit',
                          display: 'inline-block',
                        }}
                      >
                        {(i + 5) % 10}
                      </Typography>
                    ))}
                  </SlidingTensCharacter>
                </Box>
              )
            }
            return (
              <Box
                key={index}
                sx={{
                  width: '15.83px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                }}
              >
                <Typography
                  sx={{
                    visibility: 'hidden !important',
                    overflowWrap: 'break-word',
                    width: '100%',
                    textAlign: 'center',
                    overflow: 'hidden',
                    m: 'auto',
                    p: 0,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    lineHeight: 'inherit',
                  }}
                >
                  {character}
                </Typography>
                <SlidingCharacter
                  style={{ position: 'absolute', top: '0%' }}
                  as="div"
                  animationid={animationId}
                  className="w-[15.83px]"
                >
                  <Typography
                    sx={{
                      overflowWrap: 'break-word',
                      width: '100%',
                      textAlign: 'center',
                      overflow: 'hidden',
                      m: 'auto',
                      p: 0,
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      lineHeight: 'inherit',
                    }}
                  >
                    {character}
                  </Typography>
                  <Typography
                    sx={{
                      overflowWrap: 'break-word',
                      width: '100%',
                      textAlign: 'center',
                      overflow: 'hidden',
                      m: 'auto',
                      p: 0,
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      lineHeight: 'inherit',
                    }}
                  >
                    {unit == 'secs' && currentString == '59' && previousString == '59' ? 0 : previousCharacter}
                  </Typography>
                </SlidingCharacter>
              </Box>
            )
          })}
        </Box>
        <Typography
          sx={{
            textTransform: 'uppercase',
            width: '100%',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '400',
          }}
        >
          {unit}
        </Typography>
      </Box>
    </Box>
  )
}
