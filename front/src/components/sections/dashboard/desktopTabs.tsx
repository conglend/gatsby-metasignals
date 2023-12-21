import React from 'react'
import { MenuItem, Select, SelectChangeEvent, styled, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { dashboardMembershipValues, dashboardTimeValues } from '@/templates/dashboard'
import {
  Strapi__Component_Dashboard_Timeframe_Options,
  Strapi__Component_Dashboard_Membership_Options,
} from 'gatsby-graphql'
import { Icon } from '@/components/elements/icon'
import { css } from '@emotion/css'

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(4),
  paddingRight: 0,
  paddingLeft: 0,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  color: 'rgba(255, 255, 255, 0.8)',
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
}))

interface IDesktopTabsProps
  extends Strapi__Component_Dashboard_Timeframe_Options,
    Strapi__Component_Dashboard_Membership_Options {
  selectedTimeframe: dashboardTimeValues
  handleChangeTimeframe: (event: React.SyntheticEvent, newValue: dashboardTimeValues) => void
  selectedMembership: dashboardMembershipValues
  handleChangeMemrbership: (event: SelectChangeEvent<dashboardMembershipValues>) => void
}

const DesktopTabs: React.FC<IDesktopTabsProps> = ({
  selectedTimeframe,
  handleChangeTimeframe,
  selectedMembership,
  handleChangeMemrbership,
  Last30Days,
  MonthToDate,
  YearToDate,
  AllTime,
  Pro,
  Amateur,
  Expert,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          height: 3,
        },
      }}
    >
      <Select
        value={selectedMembership}
        sx={{
          '& fieldset': { border: 'none' },
          '& p': { fontSize: '30px', fontWeight: 'bold', paddingRight: '24px' },
          userSelect: 'none',
          position: 'relative',
        }}
        onChange={handleChangeMemrbership}
        IconComponent={() => (
          <Icon
            width={30}
            icon="chevronDown"
            className={css`
              right: 0;
              position: absolute;
              z-index: -9999;
            `}
          />
        )}
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
      <Tabs value={selectedTimeframe} onChange={handleChangeTimeframe}>
        {[
          { label: Last30Days, value: 'last30Days' },
          { label: MonthToDate, value: 'monthToDate' },
          { label: YearToDate, value: 'yearToDate' },
          { label: AllTime, value: 'allTime' },
        ]?.map((timeframe) => (
          <StyledTab disableRipple value={timeframe.value} label={timeframe.label} key={timeframe.value} />
        ))}
      </Tabs>
    </Box>
  )
}

export default DesktopTabs
