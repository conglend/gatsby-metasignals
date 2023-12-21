import React, { useCallback, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Typography, Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_By_Pair } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'
import { Icon } from '@/components/elements/icon'
import { useIsDesktopLarge, useIsMobile, useWindowDimensions } from '@/utils/hooks'

interface IAlertsByPairProps extends Strapi__Component_Dashboard_Alerts_By_Pair {
  data: {
    name: string
    value: number
  }[]
}

const AlertsByPair: React.FC<IAlertsByPairProps> = ({ data, Title }) => {
  const { width: screenWidth } = useWindowDimensions()
  const isDesktopLarge = useIsDesktopLarge()
  const isMobile = useIsMobile()

  const sortedData = data
    .sort((x, y) => y.value - x.value)
    .filter((rec) => !!rec.value) //filter zeros/empty values
    .map((rec) => ({ Alerts: rec.value, name: rec.name })) //renaming keys to make it work better with tooltips

  //those are just approximate values - we don't calculate exact widths or numbers of visable bars

  const maxValue = sortedData[0]?.Alerts || 5 // 5 when no values provided
  const MINIMUM_WIDTH = !isMobile ? (isDesktopLarge ? 1000 : 800) : sortedData.length > 10 ? 800 : 0.75 * screenWidth
  const BARS_VISABLE_AT_ONCE = sortedData.length > 10 ? 40 : sortedData.length
  const GAP = 9
  const CHART_WIDTH = (sortedData.length / BARS_VISABLE_AT_ONCE) * MINIMUM_WIDTH

  const [scrollbarWrapper, setScrollbarWrapper] = useState<HTMLDivElement | null>(null)
  const scrollbarRef = useCallback((elem) => setScrollbarWrapper(elem), [])

  const [scrollWidth, setScrollWidth] = useState<number | null | undefined>(null)
  const [clientWidth, setClientWidth] = useState<number | null | undefined>(null)

  useEffect(() => {
    setScrollWidth(scrollbarWrapper?.scrollWidth)
    setClientWidth(scrollbarWrapper?.clientWidth)
  }, [CHART_WIDTH, scrollbarWrapper]) //we need to force rerender, as recharts skips rerendering when input data changes

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.dark,
        padding: 3,
        paddingBottom: 3,
      }}
    >
      <Typography sx={{ fontSize: 25, fontWeight: 'bold', paddingY: '10px' }}>{Title}</Typography>

      <Box
        ref={scrollbarRef}
        style={{ overflowX: 'auto', paddingBottom: 20 }}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'block',
            background: theme.palette.chart.background,
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.chart.fill,
            borderRadius: '6px',
          },
        }}
      >
        <BarChart
          width={CHART_WIDTH > MINIMUM_WIDTH ? CHART_WIDTH : MINIMUM_WIDTH}
          height={300}
          data={sortedData}
          barCategoryGap={GAP}
        >
          <XAxis
            height={80}
            angle={-90}
            textAnchor="end"
            stroke="#none"
            dataKey="name"
            tick={{ fill: theme.palette.background.paper, fontSize: '12px' }}
            interval={0}
          />
          <YAxis
            stroke="#none"
            tick={{ fill: theme.palette.background.paper, fontWeight: 'bold', dx: -10 }}
            tickCount={maxValue == 1 ? 1 : maxValue < 5 ? maxValue - 1 : 5}
          />
          <Tooltip
            allowEscapeViewBox={{ x: true }}
            wrapperStyle={{ left: -75 }}
            cursor={false}
            contentStyle={{ borderRadius: '5px', backgroundColor: theme.palette.chart.stroke, fontWeight: 'bold' }}
          />
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke={theme.palette.chart.stroke} opacity={0.6} />

          <Bar dataKey="Alerts" maxBarSize={40} fill={theme.palette.success.main} />
        </BarChart>
      </Box>
      {scrollWidth && clientWidth && scrollWidth > clientWidth && (
        <Grid container sx={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <IconButton
              aria-label={'left arrow'}
              onClick={() => {
                if (scrollbarWrapper) {
                  scrollbarWrapper.scrollLeft = 0
                }
              }}
            >
              <Icon icon="arrowLeft" />
            </IconButton>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <IconButton
              aria-label={'right arrow'}
              onClick={() => {
                if (scrollbarWrapper) {
                  scrollbarWrapper.scrollLeft = scrollbarWrapper?.scrollWidth
                }
              }}
            >
              <Icon icon="arrowRight" />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default AlertsByPair
