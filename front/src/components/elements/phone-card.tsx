import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'
import { CurrencyIcon } from './currency-icon-scalable'

type Crypto = 'BTC' | 'USD' | 'ETH'
interface IPhoneCard {
  width?: number
  scale?: number
  data: {
    alert_side: 'LONG' | 'SHORT'
    asset_1: Crypto
    asset_2: Crypto
    alert_type: string
    exchange: string
    pair: string
    timeframe: string
    price: string
    datetime: string
    stop_loss: string
    target_1: string
    rr_1: string
    target_2: string
    rr_2: string
    target_3: string
    rr_3: string
  }
}
const PhoneCard = (props: IPhoneCard) => {
  const defaultWidth = 480

  const scale = props?.scale || (props?.width as number) / defaultWidth || 1

  const data = props?.data
  const secondary =
    data?.alert_side == 'LONG' ? theme.palette.alert.long.secondaryText : theme.palette.alert.short.secondaryText
  const background =
    data?.alert_side == 'LONG' ? theme.palette.alert.long.background : theme.palette.alert.short.background
  const mainFontSize = `calc(22px * ${scale})`
  const rowHeight = `calc(30px * ${scale})`
  const borderRadius = `calc(30px * ${scale})`
  return (
    <Box
      sx={{
        margin: 'auto',
        background: data?.alert_side == 'LONG' ? theme.palette.alert.long.shadow : theme.palette.alert.short.shadow,
        width: `calc(${defaultWidth}px * ${scale})`,
        height: `calc(780px * ${scale})`,
        borderRadius: borderRadius,
        padding: borderRadius,
      }}
    >
      <Box
        sx={{
          background: background,
          width: '100%',
          height: '100%',
          borderRadius: borderRadius,
          textTransform: 'uppercase',
        }}
      >
        <Typography
          sx={{
            fontSize: mainFontSize,
            letterSpacing: `calc(-1.2px * ${scale})`,
            width: '100%',
            textAlign: 'center',
            paddingTop: mainFontSize,
            color: secondary,
          }}
        >
          metasignals.io
        </Typography>
        <Typography
          sx={{
            fontSize: `calc(36px * ${scale})`,
            margin: 'auto',
            letterSpacing: `calc(-1.2px * ${scale})`,
            width: '85%',
            textAlign: 'center',
            borderBottom: `solid 1px ${secondary}`,
          }}
        >
          POTENTIAL {data?.alert_side}
        </Typography>
        <Grid
          container
          sx={{
            width: '30%',
            marginX: 'auto',
            background: 'white',
            height: `calc(60px * ${scale})`,
            borderRadius: `calc(10px * ${scale})`,
            marginY: `calc(16px * ${scale})`,
          }}
        >
          <Grid item xs={5.9} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data?.asset_1 && <CurrencyIcon icon={data?.asset_1} />}
          </Grid>
          <Grid item xs={0.2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '2px', height: '50%', backgroundColor: background }} />
          </Grid>
          <Grid
            item
            xs={5.9}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {data?.asset_2 && <CurrencyIcon icon={data?.asset_2} />}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: '30%',
            marginX: 'auto',
            borderTop: `solid 1px ${secondary}`,
            height: `calc(60px * ${scale})`,
            alignItems: 'center',
            paddingX: `calc(5px * ${scale})`,
          }}
        >
          <Grid item xs={5.9}>
            <Typography sx={{ fontSize: mainFontSize, textAlign: 'center', margin: 'auto', direction: 'rtl' }}>
              {/* direction makes text overflow to the left */}
              {data?.asset_1}
            </Typography>
          </Grid>
          <Grid item xs={0.2} />
          <Grid item xs={5.9}>
            <Typography sx={{ fontSize: mainFontSize, textAlign: 'center', margin: 'auto' }}>
              {data?.asset_2}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Alert type:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>
              {data?.alert_type}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Exchange:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>
              {data?.exchange}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Pair:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>{data?.pair}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ height: rowHeight, paddingRight: `calc(20px * ${scale})`, paddingLeft: `calc(20px * ${scale})` }}
          >
            <Divider
              sx={{
                borderColor: 'transparent',
                marginTop: `calc(17px * ${scale})`,
                borderTop: `solid 1px ${secondary}`,
                marginBottom: `calc(17px * ${scale})`,
              }}
            ></Divider>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Time frame:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>
              {data?.timeframe}
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Price:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>
              {data?.price}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: 'left' }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {'date & time:'}
            </Typography>
          </Grid>
          <Grid item xs={7} sx={{ textAlign: 'right' }}>
            <Typography
              sx={{
                paddingRight: `calc(20px * ${scale})`,
                fontSize: mainFontSize,
                height: rowHeight,
                textTransform: 'none',
              }}
            >
              {data?.datetime}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ height: rowHeight, paddingRight: `calc(20px * ${scale})`, paddingLeft: `calc(20px * ${scale})` }}
          >
            <Divider
              sx={{
                borderColor: 'transparent',
                margin: 'auto',
                marginTop: `calc(17px * ${scale})`,
                borderTop: `solid 1px ${secondary}`,
                marginBottom: `calc(17px * ${scale})`,
              }}
            ></Divider>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize }}>Stop loss:</Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: 'right', height: rowHeight }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize }}>
              {data?.stop_loss}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: 'left' }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {'Target 1:'}
            </Typography>
          </Grid>
          <Grid item xs={7} sx={{ textAlign: 'right' }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {data?.target_1} &nbsp; RR: &nbsp; {data?.rr_1}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: 'left' }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {data?.target_2 ? 'Target 2:' : ' '}
            </Typography>
          </Grid>
          <Grid item xs={7} sx={{ textAlign: 'right' }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {data?.target_2 ? (
                <>
                  {data?.target_2} &nbsp; RR: &nbsp; {data?.rr_2}
                </>
              ) : (
                ' '
              )}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: 'left' }}>
            <Typography sx={{ paddingLeft: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {data?.target_2 && data?.target_3 ? 'Target 3:' : ' '}
            </Typography>
          </Grid>
          <Grid item xs={7} sx={{ textAlign: 'right' }}>
            <Typography sx={{ paddingRight: `calc(20px * ${scale})`, fontSize: mainFontSize, height: rowHeight }}>
              {data?.target_2 && data?.target_3 ? (
                <>
                  {data?.target_3} &nbsp; RR: &nbsp; {data?.rr_3}
                </>
              ) : (
                ' '
              )}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          sx={{
            fontSize: `calc(18px * ${scale})`,
            letterSpacing: `calc(-1.2px * ${scale})`,
            width: '100%',
            textAlign: 'center',
            paddingTop: mainFontSize,
            color: secondary,
            textTransform: 'none',
          }}
        >
          *Time and Date (UTC)
        </Typography>
      </Box>
    </Box>
  )
}

export default PhoneCard
