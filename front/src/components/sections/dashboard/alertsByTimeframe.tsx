import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_By_Timeframe } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'

interface IAlertsByTimeframeProps extends Strapi__Component_Dashboard_Alerts_By_Timeframe {
  data: {
    name: string
    value: number
  }[]
}

const AlertsByTimeframe: React.FC<IAlertsByTimeframeProps> = ({ data, Title }) => {
  return (
    <Box sx={{ height: '400px', backgroundColor: 'background.dark', padding: 3, paddingBottom: 6 }}>
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>{Title}</Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} maxBarSize={10} layout={'vertical'}>
          <CartesianGrid horizontal={false} stroke={theme.palette.chart.stroke} />
          <XAxis
            type={'number'}
            orientation={'bottom'}
            stroke="none"
            dataKey={'value'}
            tick={{ fill: theme.palette.background.paper, fontWeight: 'bold' }}
            tickLine
            tickCount={4}
            domain={[0, 'auto']}
          />
          <YAxis
            type={'category'}
            orientation={'left'}
            dataKey={'name'}
            stroke="none"
            tick={{ fill: theme.palette.background.paper, fontWeight: 'bold', dx: -20 }}
            interval={0}
          />
          <Bar
            dataKey={'value'}
            fill={theme.palette.chart.fill}
            radius={20}
            background={{ fill: theme.palette.chart.background, radius: 20 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default AlertsByTimeframe
