import React, { useContext } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, PageProps } from 'gatsby'
import { Strapi__Component_Meta_Metadata, Strapi_Global, NftPageQuery } from 'gatsby-graphql'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useLocalizePage } from '@/utils/hooks'
import ThemeTypeContext from '@/components/themeTypeContext'
import { IPageContext } from '@/types/pages'
import { theme } from 'src/theme/ThemeProvider'
import RichText from '@/components/elements/rich-text'
import { css } from '@emotion/css'
import { Icon } from '@/components/elements/icon'
import MintWidget from '@/components/elements/mint-widget'
import Countdown from '@/components/sections/Countdown'

const Nft: React.FC<PageProps<NftPageQuery>> = (props) => {
  const { setTheme } = useContext(ThemeTypeContext)
  setTheme('core')

  const data = props?.data
  const pageContext = props?.pageContext as IPageContext
  const location = props?.location

  const metaData = data?.strapiNft?.MetaData as Strapi__Component_Meta_Metadata
  const global = data?.strapiGlobal as Strapi_Global

  const hero = data?.strapiNft.Nft
  const table = data?.strapiNft.NftTable
  const prices = data?.strapiNft.NftPrices
  const mintSection = data?.strapiNft.MintSection
  const pricesRowsFirstHalf = prices.Row.slice(0, prices.Row.length / 2)
  const pricesRowsSecondHalf = prices.Row.slice(prices.Row.length / 2, prices.Row.length)

  useLocalizePage(pageContext, location)
  
  return (
    <>
      <SEO metaData={metaData} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, ...metaData }} theme={theme}>
        {hero?.ShowCountDown && <Countdown endsAt={new Date(hero?.CountDownLiveTime).getTime()} CountDownOfferText={hero?.CountDownOfferText} CountDownLiveText={hero?.CountDownLiveText} />}

        <RichText
          markdown={hero.FirstParagraph.data.FirstParagraph}
          sx={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        />
        <Typography
          component={'h1'}
          sx={{
            maxWidth: '866px',
            fontSize: '23.4px',
            fontWeight: 700,
            textAlign: 'center',
            paddingTop: { xs: '24px', lg: '48px' },
            paddingBottom: { xs: '34px', lg: '64px' },
            margin: 'auto',
          }}
        >
          {hero.Title}
        </Typography>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
          }}
        >
          <iframe
            className={css`
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              width: 100%;
              height: 100%;
            `}
            src={hero.VideoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video"
          ></iframe>
        </Box>
        <RichText
          markdown={hero.SecondParagraph.data.SecondParagraph}
          sx={{
            fontSize: '20px',
            textAlign: 'center',
            paddingTop: { xs: '34px', lg: '68px' },
            paddingBottom: { xs: '64px', lg: '112px' },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'black',
            width: '100vw',
            marginLeft: 'calc((-100vw + 100%)/2)',
            marginBottom: '64px',
          }}
        >
          <span
            className={css`
              position: relative;
              width: 100%;
              height: 500px;
              @media (max-width: 600px) {
                height: 300px;
              }
            `}
          >
            <iframe
              className={css`
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
              `}
              src={hero.VimeoUrl}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Video"
            ></iframe>
          </span>
        </Box>
        <TableContainer sx={{ paddingBottom: '64px', paddingTop: '32px', fontSize: { sm: '20px', xs: '16px' } }}>
          <Table sx={{ borderCollapse: 'separate', borderBottom: `1px solid ${theme.palette.background.light}` }}>
            <TableBody>
              <TableRow sx={{ background: theme.palette.background.light }}>
                <TableCell
                  sx={{
                    borderRight: `1px solid ${theme.palette.background.light}`,
                    borderBottom: '1px solid transparent',
                    fontWeight: 700,
                    padding: { sm: '12px', xs: '8px' },
                    textAlign: 'center',
                    paddingLeft: '17px',
                    fontSize: { sm: '20px', xs: '16px' },
                  }}
                >
                  {table.NftTableRowFirstColumn.Title}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: `1px solid ${theme.palette.background.light}`,
                    borderLeft: `1px solid ${theme.palette.background.light}`,
                    borderBottom: '1px solid transparent',
                    padding: { sm: '12px', xs: '8px' },
                    textAlign: 'center',
                    fontSize: { sm: '20px', xs: '16px' },
                    fontWeight: 700,
                  }}
                >
                  {table.NftTableRowFirstColumn.NftHoldersTextValue}
                </TableCell>
                <TableCell
                  sx={{
                    borderLeft: `1px solid ${theme.palette.background.light}`,
                    borderBottom: '1px solid transparent',
                    padding: { sm: '12px', xs: '8px' },
                    textAlign: 'center',
                    fontSize: { sm: '20px', xs: '16px' },
                    fontWeight: 700,
                  }}
                >
                  {table.NftTableRowFirstColumn.UsdSubscribersTextValue}
                </TableCell>
              </TableRow>
              {table.NftTableRow.map((row, index) => (
                <TableRow
                  key={index}
                  sx={row.RowBackground === 'dimmed' ? { background: theme.palette.background.light } : {}}
                >
                  <TableCell
                    sx={{
                      borderRight: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.background.light
                      }`,
                      borderBottom: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.grey[900]
                      }`,
                      padding: { sm: '12px', xs: '8px' },
                      paddingLeft: '17px',
                      fontSize: { sm: '20px', xs: '16px' },
                    }}
                  >
                    <RichText
                      className={css`
                        & p {
                          margin-block-start: 0;
                          margin-block-end: 0;
                          line-height: 186%;
                        }
                        text-align: ${row.TextAlignment === 'center' ? 'center' : 'left'};
                      `}
                      markdown={row.RowTitle.data.RowTitle}
                      preserveNewlines
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: `1px solid ${theme.palette.background.light}`,
                      borderLeft: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.background.light
                      }`,
                      borderBottom: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.grey[900]
                      }`,
                      padding: { sm: '12px', xs: '8px' },
                      textAlign: 'center',
                      fontSize: { sm: '20px', xs: '16px' },
                    }}
                  >
                    {row.NftHoldersColumnTextValue}
                    {row.NftHoldersColumnIconValue &&
                      row.NftHoldersColumnIconValue !== 'none' &&
                      (row.NftHoldersColumnIconValue === 'checkmark' ? (
                        <Icon icon="checkmark" />
                      ) : (
                        <Icon icon="redcross" />
                      ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderLeft: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.background.light
                      }`,
                      borderBottom: `1px solid ${
                        row.RowBackground === 'dimmed' ? 'transparent' : theme.palette.grey[900]
                      }`,
                      padding: { sm: '12px', xs: '8px' },
                      textAlign: 'center',
                      fontSize: { sm: '20px', xs: '16px' },
                    }}
                  >
                    {row.UsdSubscribersColumnTextValue}
                    {row.UsdSubscribersColumnIconValue &&
                      row.UsdSubscribersColumnIconValue !== 'none' &&
                      (row.UsdSubscribersColumnIconValue === 'checkmark' ? (
                        <Icon icon="checkmark" />
                      ) : (
                        <Icon icon="redcross" />
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {table?.TableFooterList?.map((item) => (
            <Typography>{item.Text}</Typography>
          ))}
        </TableContainer>

        <Box sx={{ maxWidth: { md: 905, xs: '100%' }, margin: 'auto', paddingY: '48px' }}>
          <Typography
            component={'h2'}
            sx={{ fontWeight: 700, fontSize: 30, textAlign: 'center', paddingBottom: '24px' }}
          >
            {mintSection.Title}
          </Typography>
          {/* @ts-ignore */}
          <MintWidget mintSection={mintSection} />
        </Box>
        <Grid container sx={{ justifyContent: 'space-between', paddingBottom: '80px', fontSize: '20px' }}>
          <Grid item xs={12} sx={{ textAlign: 'center', paddingY: '32px' }}>
            <RichText markdown={prices.Title.data.Title} preserveNewlines />
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <Grid container sx={{ borderBottom: { sm: `1px solid ${theme.palette.background.light}` } }}>
              <Grid
                item
                xs={6}
                sx={{
                  background: theme.palette.background.light,
                  borderRight: `1px solid ${theme.palette.background.light}`,
                  padding: '12px',
                  paddingLeft: '17px',
                }}
              >
                {prices.ColumnOneTitle}
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  background: theme.palette.background.light,
                  borderLeft: `1px solid ${theme.palette.background.light}`,
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                {prices.ColumnTwoTitle}
              </Grid>
              {pricesRowsFirstHalf.map((row) => (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderRight: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${theme.palette.background.light}`,
                      borderBottom: `1px solid ${theme.palette.grey[900]}`,
                      padding: '12px',
                      paddingLeft: '17px',
                    }}
                  >
                    {row.Left}
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderLeft: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${theme.palette.background.light}`,
                      borderBottom: `1px solid ${theme.palette.grey[900]}`,
                      padding: '12px',
                      textAlign: 'center',
                    }}
                  >
                    {row.Right}
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <Grid container sx={{ borderBottom: `1px solid ${theme.palette.background.light}` }}>
              <Grid
                item
                xs={6}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  background: theme.palette.background.light,
                  borderRight: `1px solid ${theme.palette.background.light}`,
                  padding: '12px',
                  paddingLeft: '17px',
                }}
              >
                {prices.ColumnOneTitle}
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  background: theme.palette.background.light,
                  borderLeft: `1px solid ${theme.palette.background.light}`,
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                {prices.ColumnTwoTitle}
              </Grid>
              {pricesRowsSecondHalf.map((row) => (
                <>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderRight: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${theme.palette.background.light}`,
                      borderBottom: `1px solid ${theme.palette.grey[900]}`,
                      padding: '12px',
                      paddingLeft: '17px',
                    }}
                  >
                    {row.Left}
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      borderLeft: `1px solid ${theme.palette.background.light}`,
                      borderTop: `1px solid ${theme.palette.background.light}`,
                      borderBottom: `1px solid ${theme.palette.grey[900]}`,
                      padding: '12px',
                      textAlign: 'center',
                    }}
                  >
                    {row.Right}
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box
          id="nft-tos"
          sx={{
            maxHeight: '400px',
            overflowY: 'scroll',
            paddingRight: '24px',
            scrollbarColor: `rgba(255, 255, 255, 0.5) transparent`, //firefox
            scrollbarWidth: 'thin', //firefox
            '&::-webkit-scrollbar': {
              display: 'block',
              background: 'transparent',
              width: '8px',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
            },
          }}
        >
          <RichText markdown={props.data.strapiNft.NftTermsOfService.Content.data.Content} preserveNewlines />
        </Box>
        <Box sx={{ paddingBottom: '40px' }} />
      </Layout>
    </>
  )
}

export default Nft

export const query = graphql`
  query NftPage($locale: String) {
    strapiGlobal(locale: { eq: $locale }) {
      ...GlobalData
    }
    strapiNft(locale: { eq: $locale }) {
      Nft {
        Title
        FirstParagraph {
          data {
            FirstParagraph
          }
        }
        VideoUrl
        SecondParagraph {
          data {
            SecondParagraph
          }
        }
        VimeoUrl
        ShowCountDown
        CountDownLiveTime
        CountDownOfferText
        CountDownLiveText
      }
      NftTable {
        NftTableRow {
          NftHoldersColumnIconValue
          NftHoldersColumnTextValue
          RowBackground
          RowTitle {
            data {
              RowTitle
            }
          }
          UsdSubscribersColumnIconValue
          UsdSubscribersColumnTextValue
          TextAlignment
        }
        NftTableRowFirstColumn {
          NftHoldersTextValue
          Title
          UsdSubscribersTextValue
        }
        TableFooterList {
          Text
        }
      }
      NftPrices {
        Title {
          data {
            Title
          }
        }
        ColumnOneTitle
        ColumnTwoTitle
        Row {
          Left
          Right
        }
      }
      NftTermsOfService {
        Content {
          data {
            Content
          }
        }
      }
      MintSection {
        Title
        WalletButtonText
        MintButtonText
        DisconnectButtonText
        TosParagraphPreLink
        TosParagraphLinkText
        TosParagraphPostLink
        InsufficientBalanceError {
          data {
            InsufficientBalanceError
          }
        }
        UnexpectedError {
          data {
            UnexpectedError
          }
        }
        NotOnWhitelistError {
          data {
            NotOnWhitelistError
          }
        }
        WrongBlockchainError {
          data {
            WrongBlockchainError
          }
        }
        MintingPausedError {
          data {
            MintingPausedError
          }
        }
        SoldOutError {
          data {
            SoldOutError
          }
        }
        WalletError {
          data {
            WalletError
          }
        }
        MintingConfirmationAlertTitle
        MintingConfirmationAlertText
        WaitingOnTxAlertTitle
        WaitingOnTxAlertText
        NftMintColumn {
          Number
          Text
        }
        Labels {
          Minted
          Remaining
          CurrentPrice
          SwitchChain
          Disconnect
          Connect
        }
      }
      MetaData {
        MetaTitle
        MetaDescription
      }
    }
  }
`
