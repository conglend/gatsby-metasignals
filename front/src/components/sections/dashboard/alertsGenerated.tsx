import React from 'react'
import { RadialBarChart, RadialBar, Label, ResponsiveContainer, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_Generated } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'

interface IAlertsGeneratedProps extends Strapi__Component_Dashboard_Alerts_Generated {
  data: {
    value: number
  }[]
}

const AlertsGenerated: React.FC<IAlertsGeneratedProps> = ({ data, Title }) => {
  const dataWithColor = data.map((datum) => {
    return { fill: theme.palette.chart.fill, value: datum.value }
  })

  const dataArr = dataWithColor.map((datum) => datum.value)
  const maxValue = (dataArr.length > 0 && dataArr.reduce((prev, curr) => (prev > curr ? prev : curr))) || 0

  return (
    <Box sx={{ height: '400px', backgroundColor: 'background.dark', padding: 3, paddingBottom: 6 }}>
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>{Title}</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="90%"
          outerRadius="120%"
          data={dataWithColor}
          startAngle={180}
          endAngle={0}
          cy={220}
        >
          <PolarAngleAxis type="number" domain={[0, maxValue * 1.2]} angleAxisId={0} tick={false} />
          <PolarRadiusAxis tick={false} axisLine={false}>
            <Label
              value={dataWithColor[0]?.value.toLocaleString()}
              offset={0}
              position="center"
              fill={theme.palette.success.main}
              fontSize={50}
              fontWeight="bold"
            />
          </PolarRadiusAxis>
          <RadialBar background={{ fill: theme.palette.chart.background }} dataKey="value" cornerRadius={200} />
        </RadialBarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default AlertsGenerated
