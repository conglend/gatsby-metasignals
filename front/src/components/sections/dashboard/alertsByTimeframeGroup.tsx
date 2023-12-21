import { useIsDesktopLarge, useIsMobile } from '@/utils/hooks'
import React from 'react'
import { Legend, ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_By_Timeframe_Group } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'

interface IAlertsByTimeframeGroupProps extends Strapi__Component_Dashboard_Alerts_By_Timeframe_Group {
  data: {
    name: string
    times: string
    value: number
  }[]
}
const renderLegendText = (value: string, entry: any) => {
  const { times } = entry?.payload

  return (
    <span style={{ display: 'inline-block', width: 180 }}>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ textAlign: 'left' }}> {value} </span>
        <span style={{ textAlign: 'left' }}>{times}</span>
      </span>
    </span>
  )
}

const AlertsByTimeframeGroup: React.FC<IAlertsByTimeframeGroupProps> = ({ data, Title }) => {
  const isMobile = useIsMobile()
  const isDesktopLarge = useIsDesktopLarge()

  const dataArr = data?.map((record) => record.value)
  const total = dataArr.length > 0 && dataArr.reduce((prev, next) => prev + next)

  const chartData = []
  const low = data.find((datum) => datum.name === 'Low')
  if (low?.value) chartData.push(low)
  const medium = data.find((datum) => datum.name === 'Medium')
  if (medium?.value) chartData.push(medium)
  const high = data.find((datum) => datum.name === 'High')
  if (high?.value) chartData.push(high)

  return (
    <Box
      sx={{ height: isMobile ? '450px' : '400px', backgroundColor: 'background.dark', padding: 3, paddingBottom: 6 }}
    >
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>{Title}</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={105}
            paddingAngle={15}
            cornerRadius={10}
          >
            {!!low?.value && (
              <Cell key="timeframe-group-low" fill={theme.palette.background.paper} stroke="transparent" />
            )}
            {!!medium?.value && (
              <Cell key="timeframe-group-medium" fill={theme.palette.success.main} stroke="transparent" />
            )}
            {!!high?.value && <Cell key="timeframe-group-high" fill={theme.palette.chart.fill} stroke="transparent" />}
          </Pie>
          <Legend
            formatter={renderLegendText}
            iconType="circle"
            iconSize={10}
            layout="vertical"
            verticalAlign={!isDesktopLarge ? 'bottom' : 'middle'}
            align={!isDesktopLarge ? 'center' : 'right'}
            wrapperStyle={{ paddingBottom: isMobile ? 50 : 0 }}
          />
          {/*@ts-ignore*/}
          <Tooltip formatter={(value: number) => `${((value / total) * 100).toFixed(0)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}
export default AlertsByTimeframeGroup
