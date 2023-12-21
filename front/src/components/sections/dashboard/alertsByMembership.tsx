import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Strapi__Component_Dashboard_Alerts_By_Membership } from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'
import { useIsMobile } from '@/utils/hooks'
interface IAlertsByMembershipProps extends Strapi__Component_Dashboard_Alerts_By_Membership {
  data: {
    name: string
    value: number
  }[]
}

const AlertsByMembership: React.FC<IAlertsByMembershipProps> = ({ data, Title }) => {
  const isMobile = useIsMobile()
  if (isMobile) {
    data = data.map((datum) => ({ ...datum, name: datum.name.replace(' ', '\n') }))
  }
  return (
    <Box sx={{ height: '400px', backgroundColor: 'background.dark', padding: 3, paddingBottom: 6 }}>
      <Typography sx={{ fontSize: 25, fontWeight: 'bold' }}>{Title}</Typography>
      <ResponsiveContainer>
        <BarChart
          width={600}
          height={400}
          data={data}
          maxBarSize={20}
          layout={'vertical'}
          margin={{ right: 40, left: 20 }}
        >
          <CartesianGrid horizontal={false} stroke={theme.palette.chart.stroke} />
          <XAxis
            type={'number'}
            orientation={'bottom'}
            stroke="none"
            tick={{
              fill: 'transparent',
              fontWeight: 'bold',
              fontSize: isMobile ? 14 : 18,
            }}
          />
          <YAxis
            width={isMobile ? 40 : 150}
            type={'category'}
            orientation={'left'}
            dataKey={'name'}
            stroke="none"
            tick={{
              fill: theme.palette.background.paper,
              fontWeight: 'bold',
              fontSize: isMobile ? 14 : 18,
              dx: isMobile ? 0 : -30,
            }}
          />
          <Bar
            dataKey={'value'}
            fill={theme.palette.chart.fill}
            radius={20}
            label={{
              position: 'right',
              fill: theme.palette.background.paper,
              fontWeight: 'bold',
              fontSize: isMobile ? 12 : 18,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default AlertsByMembership
