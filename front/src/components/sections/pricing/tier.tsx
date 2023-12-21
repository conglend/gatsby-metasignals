import Button from '@/components/elements/button'
import { Icon } from '@/components/elements/icon'
import PricingBadge from '@/components/elements/pricing-badge'
import { getArrayFromSpaceSeparatedString } from '@/utils/helpers'
import { useIsMobile } from '@/utils/hooks'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import { Strapi__Component_Pricing_Tiers } from 'gatsby-graphql'
import React from 'react'
import { theme } from 'src/theme/ThemeProvider'
import Image from '../../../components/image'
import PairsList from './pairsList'

interface ITierProps {
  tier: Strapi__Component_Pricing_Tiers
  index: number
  totalLength: number
}
const Tier = ({ tier, index, totalLength }: ITierProps) => {
  const pairs = getArrayFromSpaceSeparatedString(tier?.PairsList)
  const timeframes = getArrayFromSpaceSeparatedString(tier?.TimeframesList)
  const isMobile = useIsMobile()
  return (
    <Grid
      container
      sx={{
        borderRadius: { xs: '10px', md: 'inherit' },
        marginTop: '60px',
        boxShadow: tier?.IsMostPopular ? '0px 0px 10px 0px white' : 'none',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          borderLeft: !index ? { md: `1px solid ${theme.palette.background.light}`, xs: 'none' } : 'none',
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          background: theme.palette.background.light,
          display: 'flex',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              margin: 'auto',
              position: 'relative',
              height: '100px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                '& div': {
                  top: '-100px',
                },
              }}
            >
              <Image
                scaleDown
                media={tier?.Avatar}
                style={{
                  height: '180px',
                }}
              />
            </Box>

            {tier?.IsMostPopular && (
              <Box sx={{ position: 'absolute', top: '20px', width: '100%' }}>
                <PricingBadge />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: '20px', padding: '14px', fontWeight: 'bold' }}>{tier?.Title}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          borderLeft: !index ? { md: `1px solid ${theme.palette.background.light}`, xs: 'none' } : 'none',
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          background: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.background.light}`,
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          paddingBottom: { md: '14px', xs: 0 },
        }}
      >
        <Typography
          sx={{
            height: '100%',
            marginTop: { md: '14px', xs: 0 },
            borderLeft: index && { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
            width: '100%',
            fontSize: '15px',
            fontWeight: 'bold',
            position: 'relative',
          }}
        >
          {isMobile ? (
            <Accordion
              sx={{
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Box
                    sx={{
                      //customize expand and collapse icon
                      '& > .tiers--accordion-closed': {
                        display: 'none',
                      },
                      '& > .tiers--accordion-open': {
                        display: 'block',
                      },
                      '.Mui-expanded & > .tiers--accordion-closed': {
                        display: 'block',
                      },
                      '.Mui-expanded & > .tiers--accordion-open': {
                        display: 'none',
                      },
                    }}
                  >
                    <div className="tiers--accordion-closed">
                      <Icon icon="minus" />
                    </div>
                    <div className="tiers--accordion-open">
                      <Icon icon="plus" />
                    </div>
                  </Box>
                }
                sx={{
                  alignItems: 'center',
                  position: 'relative',
                  '& div.MuiAccordionSummary-expandIconWrapper': {
                    transform: 'none !important',
                    position: 'absolute',
                    left: '10px',
                  },
                }}
              >
                <Box sx={{ width: '100%', margin: 'auto' }}>
                  {tier?.PairsLabel}: {pairs.length}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {pairs.map((pair) => (
                    <li>
                      <Typography sx={{ fontSize: '15px', fontWeight: 'normal' }}>{pair}</Typography>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 'bold',
                lineHeight: '20px',
              }}
            >
              {tier?.PairsLabel}: {pairs.length}
            </Typography>
          )}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          borderLeft: !index ? { md: `1px solid ${theme.palette.background.light}`, xs: 'none' } : 'none',
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          background: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.background.light}`,
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
        }}
      >
        <Typography
          sx={{
            height: '100%',
            // marginTop: { md: '14px', xs: 0 },
            borderLeft: index && { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
            width: '100%',
            fontSize: '15px',
            fontWeight: 'bold',
            position: 'relative',
          }}
        >
          <Accordion
            sx={{
              boxShadow: 'none',
              background: 'transparent',
            }}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    //customize expand and collapse icon
                    '& > .tiers--accordion-closed': {
                      display: 'none',
                    },
                    '& > .tiers--accordion-open': {
                      display: 'block',
                    },
                    '.Mui-expanded & > .tiers--accordion-closed': {
                      display: 'block',
                    },
                    '.Mui-expanded & > .tiers--accordion-open': {
                      display: 'none',
                    },
                  }}
                >
                  <div className="tiers--accordion-closed">
                    <Icon icon="minus" />
                  </div>
                  <div className="tiers--accordion-open">
                    <Icon icon="plus" />
                  </div>
                </Box>
              }
              sx={{
                alignItems: 'center',
                position: 'relative',
                '& div.MuiAccordionSummary-expandIconWrapper': {
                  transform: 'none !important',
                  position: 'absolute',
                  left: '10px',
                },
              }}
            >
              <Box sx={{ width: '100%', margin: 'auto' }}>
                {tier?.TimeframesLabel}: {timeframes?.length}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {timeframes.map((pair) => (
                  <li>
                    <Typography sx={{ fontSize: '15px', fontWeight: 'normal' }}>{pair}</Typography>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          background: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.background.light}`,
          borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          padding: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            width: '130px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              lineHeight: '20px',
            }}
          >
            {tier?.TradeAlerts?.Label}:{' '}
          </Typography>
          {tier?.TradeAlerts?.Value ? <Icon icon="checkmark" /> : <Icon icon="redcross" />}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          background: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.background.light}`,
          borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          padding: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            width: '130px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              lineHeight: '20px',
            }}
          >
            {tier?.VolumeAlerts?.Label}:{' '}
          </Typography>
          {tier?.VolumeAlerts?.Value ? <Icon icon="checkmark" /> : <Icon icon="redcross" />}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          borderRight:
            index == totalLength - 1
              ? {
                  md: `1px solid ${theme.palette.background.light}`,
                  xs: 'none',
                }
              : 'none',
          background: theme.palette.background.light,
          borderTop: `1px solid ${theme.palette.background.light}`,
          borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          padding: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: '30px',
        }}
      >
        <Box
          sx={{
            width: '130px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              lineHeight: '20px',
            }}
          >
            {tier?.RsiDivAlerts?.Label}:{' '}
          </Typography>
          {tier?.RsiDivAlerts?.Value ? <Icon icon="checkmark" /> : <Icon icon="redcross" />}
        </Box>
      </Grid>

      {!isMobile && (
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'center',
            borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
            borderRight:
              index == totalLength - 1
                ? {
                    md: `1px solid ${theme.palette.background.light}`,
                    xs: 'none',
                  }
                : 'none',
            borderTop: `1px solid ${theme.palette.background.light}`,

            position: 'relative',
          }}
        >
          <PairsList pairs={pairs} />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sx={{
          width: '100%',
          height: '20px',
          background: theme.palette.background.light,
          borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
        }}
      ></Grid>
      {tier?.Lifetime ? (
        <Grid
          item
          xs={12}
          sx={{
            background: theme.palette.background.light,
            borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
            padding: '14px',
            position: 'relative',
          }}
        >
          {tier.Title.toLocaleLowerCase().includes('mafioso') && (
            <Box sx={{ position: 'absolute', top: '-70vh' }} id="getStarted" />
          )}
          <Typography sx={{ fontSize: '40px', fontWeight: 'bold', display: 'inline' }}>{tier?.Lifetime}</Typography>
        </Grid>
      ) : undefined}
      {tier.Buttons.map((btn) => (
        <Grid
          item
          xs={12}
          sx={{
            background: theme.palette.background.light,
            textAlign: 'center',
            borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
          }}
        >
          <Box sx={{ paddingX: '30px', paddingBottom: '20px', paddingTop: '12px' }}>
            <Button
              centered
              button={btn}
              color={btn.type === 'primary' ? 'success' : 'secondary'}
              style={{ textAlign: 'center' }}
            />
          </Box>
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        sx={{
          width: '100%',
          height: '20px',
          background: theme.palette.background.light,
          borderLeft: { md: `1px solid ${theme.palette.background.light}`, xs: 'none' },
        }}
      ></Grid>
    </Grid>
  )
}

export default Tier
