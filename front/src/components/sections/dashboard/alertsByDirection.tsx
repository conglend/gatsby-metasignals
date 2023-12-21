import React from 'react'
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Cell, YAxis } from 'recharts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_By_Direction } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'

interface IAlertsByDirectionProps extends Strapi__Component_Dashboard_Alerts_By_Direction {
  data: {
    name: string
    value: number
  }[]
}

const AlertsByDirection: React.FC<IAlertsByDirectionProps> = ({ data, Title }) => {
  let domainUpperBound = 0
  for (const datum of data) {
    if (datum.value > domainUpperBound) {
      domainUpperBound = datum.value
    }
  }
  domainUpperBound *= 1.25

  return (
    <Box sx={{ height: '400px', backgroundColor: 'background.dark', padding: 3, paddingBottom: 6 }}>
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>{Title}</Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={200} margin={{ top: 10 }}>
          <XAxis stroke="#none" dataKey="name" tick={{ fill: theme.palette.background.paper, fontWeight: 'bold' }} />
          {/* YAxis is used only to change the domain and add extra space over the chart to amke space for the label */}
          <YAxis type="number" domain={[0, domainUpperBound]} hide />
          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke={theme.palette.chart.stroke} opacity={0.6} />
          <Bar
            dataKey="value"
            radius={10}
            background={{ fill: theme.palette.background.paper, opacity: 0.2, radius: 10 }}
            label={{ position: 'top', fill: theme.palette.background.paper, fontWeight: 'bold', opacity: 0.5 }}
          >
            <Cell fill={theme.palette.success.main} />
            <Cell fill={theme.palette.chart.fill} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default AlertsByDirection
