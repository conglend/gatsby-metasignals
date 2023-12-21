import React, { useContext, useEffect, useState } from 'react'
import { graphql, PageProps } from 'gatsby'
import {
  DashboardPageQuery,
  Strapi__Component_Dashboard_Alerts_By_Direction,
  Strapi__Component_Dashboard_Alerts_By_Membership,
  Strapi__Component_Dashboard_Alerts_By_Pair,
  Strapi__Component_Dashboard_Alerts_By_Timeframe,
  Strapi__Component_Dashboard_Alerts_By_Timeframe_Group,
  Strapi__Component_Dashboard_Alerts_Generated,
  Strapi__Component_Dashboard_Header,
  Strapi__Component_Links_Button,
  Strapi__Component_Meta_Metadata,
  Strapi_Global,
  Strapi__Component_Dashboard_Timeframe_Options,
  Strapi__Component_Dashboard_Membership_Options,
} from '../../gatsby-graphql'
import { Oval } from 'react-loader-spinner'

import Layout from '../components/layout'
import SEO from '../components/seo'
import AlertsByDirection from '@/components/sections/dashboard/alertsByDirection'
import AlertsByTimeframeGroup from '@/components/sections/dashboard/alertsByTimeframeGroup'
import AlertsGenerated from '@/components/sections/dashboard/alertsGenerated'
import AlertsByMembership from '@/components/sections/dashboard/alertsByMembership'
import { Box, Grid, SelectChangeEvent } from '@mui/material'
import { Header } from '@/components/sections/dashboard/header'
import AlertsByTimeframe from '@/components/sections/dashboard/alertsByTimeframe'
import AlertsByPair from '@/components/sections/dashboard/alertsByPair'
import { SectionDivider } from '@/components/elements/section-divider'
import DesktopTabs from '@/components/sections/dashboard/desktopTabs'
import Button from '@/components/elements/button'
import { useIsMobile, useLocalizePage } from '@/utils/hooks'
import MobileTabs from '@/components/sections/dashboard/mobileTabs'

import dashboardJson from '../assets/dashboard.json'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import HeaderStripe from '@/components/sections/dashboard/headerStripe'

export type dashboardTimeValues = keyof (typeof dashboardJson)['Meta Mogul'] // each membership has same time values
export type dashboardMembershipValues = keyof typeof dashboardJson

const jsonUrl = process.env.GATSBY_DASHBOARD_JSON_URL || 'https://uat.metasignals.io/dashboard.json'

const Dashboard: React.FC<PageProps<DashboardPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')
  const isMobile = useIsMobile()

  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await fetch(jsonUrl)
        setDashboard(await data.json())
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const global = data?.strapiGlobal as Strapi_Global
  const strapiDashboard = data?.strapiDashboard
  const metaData = strapiDashboard?.MetaData as Strapi__Component_Meta_Metadata
  const header = strapiDashboard?.Header as Strapi__Component_Dashboard_Header
  const timeframeOptions = strapiDashboard?.TimeframeOptions as Strapi__Component_Dashboard_Timeframe_Options
  const membershipOptions = strapiDashboard?.MembershipOptions as Strapi__Component_Dashboard_Membership_Options

  const alertsByPair = strapiDashboard?.AlertsByPair as Strapi__Component_Dashboard_Alerts_By_Pair
  const alertsGenerated = strapiDashboard?.AlertsGenerated as Strapi__Component_Dashboard_Alerts_Generated
  const alertsByTimeframe = strapiDashboard?.AlertsByTimeframe as Strapi__Component_Dashboard_Alerts_By_Timeframe
  const alertsByTimeframeGroup =
    strapiDashboard?.AlertsByTimeframeGroup as Strapi__Component_Dashboard_Alerts_By_Timeframe_Group
  const alertsByDirection = strapiDashboard?.AlertsByDirection as Strapi__Component_Dashboard_Alerts_By_Direction
  const alertsByMembership = strapiDashboard?.AlertsByMembership as Strapi__Component_Dashboard_Alerts_By_Membership
  const freeTrialButton = strapiDashboard?.FreeTrialButton as Strapi__Component_Links_Button

  const [selectedTimeframe, setSelectedTimeframe] = useState<dashboardTimeValues>('last30Days')
  const handleChangeTimeframeDesktop = (_event: React.SyntheticEvent, newValue: dashboardTimeValues) => {
    setSelectedTimeframe(newValue)
  }
  const handleChangeTimeframeMobile = (event: SelectChangeEvent<dashboardTimeValues>) => {
    setSelectedTimeframe(event.target.value as dashboardTimeValues)
  }

  const [selectedMembership, setSelectedMembership] = useState<dashboardMembershipValues>(
    membershipOptions.Pro as 'Meta Mafioso' | 'Meta Maven' | 'Meta Mogul',
  )

  const handleChangeMembership = (event: SelectChangeEvent<dashboardMembershipValues>) => {
    setSelectedMembership(event.target.value as dashboardMembershipValues)
  }

  useLocalizePage(pageContext, location)

  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        <Grid container sx={{ textAlign: 'center', marginBottom: '60px' }}>
          <Grid item xs={12}>
            <Header
              alertsGenerated={
                (dashboard?.[selectedMembership]?.['allTime']?.['alertsGenerated'][0]['value'] ||
                  dashboard?.['Meta Mafioso']?.['allTime']?.['alertsGenerated'][0]['value']) ??
                0
              }
              data={dashboard?.dashboard}
              {...header}
            />
          </Grid>
        </Grid>
        {dashboard ? (
          <>
            <HeaderStripe
              alertsGenerated={
                (dashboard?.[selectedMembership]?.['allTime']?.['alertsGenerated'][0]['value'] ||
                  dashboard?.['Meta Mafioso']?.['allTime']?.['alertsGenerated'][0]['value']) ??
                0
              }
              data={dashboard?.dashboard}
              {...header}
            />
            {isMobile ? (
              <MobileTabs
                selectedMembership={selectedMembership}
                handleChangeMemrbership={handleChangeMembership}
                selectedTimeframe={selectedTimeframe}
                handleChangeTimeframe={handleChangeTimeframeMobile}
                {...timeframeOptions}
                {...membershipOptions}
              />
            ) : (
              <DesktopTabs
                selectedMembership={selectedMembership}
                handleChangeMemrbership={handleChangeMembership}
                selectedTimeframe={selectedTimeframe}
                handleChangeTimeframe={handleChangeTimeframeDesktop}
                {...timeframeOptions}
                {...membershipOptions}
              />
            )}
            <SectionDivider style={{ marginTop: 0 }} />
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <AlertsByPair
                  data={dashboard?.[selectedMembership]?.[selectedTimeframe]?.['alertsByPair'] ?? []}
                  {...alertsByPair}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AlertsGenerated
                  data={dashboard?.[selectedMembership]?.[selectedTimeframe]?.['alertsGenerated'] ?? []}
                  {...alertsGenerated}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AlertsByDirection
                  data={dashboard?.[selectedMembership]?.[selectedTimeframe]?.['alertsByDirection'] ?? []}
                  {...alertsByDirection}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AlertsByTimeframeGroup
                  data={dashboard?.[selectedMembership]?.[selectedTimeframe]?.['alertsByTimeframeGroup'] ?? []}
                  {...alertsByTimeframeGroup}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AlertsByTimeframe
                  data={
                    dashboard?.[selectedMembership]?.[selectedTimeframe]?.['alertsByTimeframe']?.filter(
                      (entry: any) => entry.name != '15M',
                    ) ?? []
                  }
                  {...alertsByTimeframe}
                />
              </Grid>
              <Grid item xs={12}>
                <AlertsByMembership
                  data={[
                    {
                      name: membershipOptions.Amateur,
                      value: dashboard?.['Meta Mogul']?.[selectedTimeframe]?.['alertsGenerated'][0]['value'] ?? 0,
                    },
                    {
                      name: membershipOptions.Expert,
                      value: dashboard?.['Meta Maven']?.[selectedTimeframe]?.['alertsGenerated'][0]['value'] ?? 0,
                    },
                    {
                      name: membershipOptions.Pro,
                      value: dashboard?.['Meta Mafioso']?.[selectedTimeframe]?.['alertsGenerated'][0]['value'] ?? 0,
                    },
                  ]}
                  {...alertsByMembership}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '36px', marginTop: '56px' }}>
                <Box sx={{ width: { xs: '100%', md: '236px' }, margin: 'auto' }}>
                  <Button button={freeTrialButton} />
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              paddingTop: { md: 8, xs: 4 },
              paddingBottom: { md: 16, xs: 8 },
            }}
          >
            <Oval color="#ffffff" />
          </Box>
        )}
      </Layout>
    </>
  )
}

export default Dashboard

export const query = graphql`
  query DashboardPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiDashboard(locale: { eq: $locale }) {
      MetaData {
        MetaTitle
        MetaDescription
      }
      Header {
        Title
        SubTitle {
          data {
            SubTitle
          }
        }
        RecentAlertLabel
        RecentAlertRemark
        FreeTrialButtonLong {
          newTab
          url
          type
          icon
          text
        }
        FreeTrialButtonShort {
          newTab
          url
          type
          icon
          text
        }
      }
      AlertsByPair {
        Title
      }
      AlertsGenerated {
        Title
      }
      AlertsByTimeframe {
        Title
      }
      AlertsByTimeframeGroup {
        Title
      }
      AlertsByDirection {
        Title
      }
      AlertsByMembership {
        Title
      }
      TimeframeOptions {
        Last30Days
        MonthToDate
        YearToDate
        AllTime
      }
      MembershipOptions {
        Amateur
        Expert
        Pro
      }
      FreeTrialButton {
        newTab
        url
        text
        type
        icon
      }
    }
  }
`
