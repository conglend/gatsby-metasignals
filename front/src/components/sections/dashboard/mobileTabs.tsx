import React from 'react'
import { MenuItem, Select, SelectChangeEvent, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { dashboardMembershipValues, dashboardTimeValues } from '@/templates/dashboard'
import {
  Strapi__Component_Dashboard_Membership_Options,
  Strapi__Component_Dashboard_Timeframe_Options,
} from 'gatsby-graphql'
import { theme } from 'src/theme/ThemeProvider'
import { Icon } from '@/components/elements/icon'

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.background.paper,
  '&.Mui-selected': {
    background: theme.palette.grey[200],
    '&.Mui-focusVisible': {
      background: theme.palette.grey[200],
    },
  },
}))

interface IMobileTabsProps
  extends Strapi__Component_Dashboard_Timeframe_Options,
    Strapi__Component_Dashboard_Membership_Options {
  selectedTimeframe: dashboardTimeValues
  handleChangeTimeframe: (event: SelectChangeEvent<dashboardTimeValues>) => void
  selectedMembership: dashboardMembershipValues
  handleChangeMemrbership: (event: SelectChangeEvent<dashboardMembershipValues>) => void
}

const MobileTabs: React.FC<IMobileTabsProps> = ({
  selectedTimeframe,
  handleChangeTimeframe,
  selectedMembership,
  handleChangeMemrbership,
  Last30Days,
  MonthToDate,
  YearToDate,
  AllTime,
  Amateur,
  Expert,
  Pro,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '4px',
        }}
      >
        <Select
          value={selectedTimeframe}
          onChange={handleChangeTimeframe}
          sx={{
            width: '100%',
            border: `1px solid ${theme.palette.grey[600]}`,
            '& fieldset': {
              borderColor: 'transparent !important',
            },
          }}
        >
          {[
            { label: Last30Days, value: 'last30Days' },
            { label: MonthToDate, value: 'monthToDate' },
            { label: YearToDate, value: 'yearToDate' },
            { label: AllTime, value: 'allTime' },
          ]?.map((timeframe) => (
            <StyledMenuItem disableRipple value={timeframe.value}>
              <Typography sx={{ color: theme.palette.background.default }}>{timeframe.label}</Typography>
            </StyledMenuItem>
          ))}
        </Select>
      </Box>
      <Select
        value={selectedMembership}
        sx={{
          '& fieldset': { border: 'none' },
          '& p': { fontSize: '30px', fontWeight: 'bold' },
        }}
        onChange={handleChangeMemrbership}
        IconComponent={() => <Icon width={30} icon="chevronDown" />}
        MenuProps={{
          sx: {
            '& li': {
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
              borderRadius: '4px',
              alignItems: 'center',
            },
          },
        }}
      >
        {[
          { label: Amateur, value: 'Meta Mogul' },
          { label: Expert, value: 'Meta Maven' },
          { label: Pro, value: 'Meta Mafioso' },
        ]?.map((membership) => (
          <MenuItem value={membership.value} key={membership.value}>
            <Typography sx={{ margin: 'auto' }}>{membership.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default MobileTabs
