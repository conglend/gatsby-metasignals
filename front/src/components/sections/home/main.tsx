import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  ImageListItemBar,
  ImageListItem,
  ImageList,
  IconButton,
  NoSsr,
} from '@mui/material'
import React, { useState, useRef } from 'react'
import Image from '../../image'
import CSS from 'csstype'
import {
  Strapi__Component_Home_Example,
  Strapi__Component_Home_Main,
  Strapi__Component_Home_Real_World_Examples,
  Strapi__Component_Links_Scroll_Down,
} from 'gatsby-graphql'
import Button from '../../elements/button'
import { Icon } from '@/components/elements/icon'
import { useMousePosition } from '@/utils/use-mouse-position'
import FadeIn from '@/components/elements/fade-in'
import Typist from 'react-typist'
import { css } from '@emotion/css'
import EmbeddedVideo from '@/components/elements/embedded-video'
import { LeftPhoneModal, RightPhoneModal } from '@/components/elements/phone-zoom'
import DumbButton from '@/components/elements/dumb-button'
import CustomLink from '@/components/elements/custom-link'
import ImageCarouselModal from '@/components/elements/multi-image-modal'
import Background from '../../../assets/background.svg'
import BiggerImageModal from '@/components/elements/bigger-image-modal'

interface TabPanelProps {
  value: number
  index: number
  children: React.ReactNode
  style?: CSS.Properties
  display?: string
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, style, display } = props
  const hidden = value !== index
  if (!hidden && display && style) {
    style.display = display
  }
  return (
    <Box role="tabpanel" hidden={hidden} style={style}>
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

interface IImageListProps {
  examples: Strapi__Component_Home_Example[]
  buyLabel: string
}
function SingleLineImageList(props: IImageListProps & { imagesPerView: number }) {
  const imagesPerView = props?.imagesPerView || 4
  const listRef = useRef<HTMLUListElement>(null)
  const total = props?.examples?.length || 0
  const totalByImagesPerView = Math.ceil(total / imagesPerView)

  const [currentLeftElem, setCurrentLeftElem] = useState(0)

  const scrollToElemNumber = (index: number) => {
    let destinationIndex: number
    if (index >= total) {
      destinationIndex = total - imagesPerView
    } else if (index < 0) {
      destinationIndex = 0
    } else {
      destinationIndex = index
    }
    const destination = listRef?.current?.children[destinationIndex]
    if (!destination) return
    destination.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    setCurrentLeftElem(destinationIndex)
  }
  const scrollRight = () => {
    scrollToElemNumber(currentLeftElem + imagesPerView)
  }

  const scrollLeft = () => {
    scrollToElemNumber(currentLeftElem - imagesPerView)
  }

  return (
    <Box>
      <ImageList
        ref={listRef}
        sx={{
          gridAutoFlow: 'column',
          gridTemplateColumns: `repeat(auto-fit, minmax(calc(100% / ${imagesPerView}),1fr)) !important`,
          gridAutoColumns: `minmax(calc(100% / ${imagesPerView}), 1fr)`,
          padding: '0px',
          overflow: 'hidden',
        }}
        component={Box}
      >
        {props?.examples?.map((example, index) => (
          <ImageCarouselModal images={props?.examples?.map((e) => e?.Image)} startFrom={index}>
            <ImageListItem
              sx={{ margin: '10px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}
              component={Box}
            >
              <Typography sx={{ fontSize: '12px', position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                {example?.Time}
              </Typography>
              <Image media={example.Chart} style={{ height: '100px' }} /> {/* height is necessary on safari */}
              <ImageListItemBar
                title={
                  <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {example?.Type} {example?.Name}
                    </Typography>
                    <Icon icon={'imageIcon'} style={{ border: '1px dashed white' }} />
                  </Grid>
                }
                sx={{
                  height: '33%',
                  backgroundColor: example?.Type === 'Long' ? 'success.main' : 'error.main',
                  padding: { md: '3px', lg: '10px' },
                  '& .MuiImageListItemBar-titleWrap': {
                    padding: 0,
                  },
                }}
              />
            </ImageListItem>
          </ImageCarouselModal>
        ))}
      </ImageList>
      <Grid container sx={{ margin: 'auto', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
        <IconButton aria-label={'left arrow'} onClick={scrollLeft}>
          <Icon icon={'arrowLeft'} />
        </IconButton>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          {[...Array(totalByImagesPerView)].map((_el, index) => {
            return index === Math.floor(currentLeftElem / imagesPerView) ? (
              <Icon icon="scrollDash" />
            ) : (
              <Icon icon="scrollDot" />
            )
          })}
        </Box>
        <IconButton aria-label={'right arrow'} onClick={scrollRight}>
          <Icon icon={'arrowRight'} />
        </IconButton>
      </Grid>
    </Box>
  )
}

function MulitLineImageList(props: IImageListProps) {
  return (
    <Box>
      <ImageList>
        {props?.examples?.map((example) => (
          <BiggerImageModal image={example?.Image}>
            <ImageListItem sx={{ margin: '5px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: '10px', left: '10px' }}>
                <Typography sx={{ fontSize: '12px' }}>{example?.Time}</Typography>
              </Box>
              <Image media={example?.Chart} style={{ width: '136px', zIndex: -1 }} />
              <ImageListItemBar
                title={
                  <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px' }}>
                      {example?.Type} {example?.Name}
                    </Typography>
                    <Icon icon={'imageIcon'} style={{ border: '1px dashed white' }} />
                  </Grid>
                }
                sx={{
                  height: '33%',
                  backgroundColor: example?.Type === 'Long' ? 'success.main' : 'error.main',
                  padding: 0,
                }}
              />
            </ImageListItem>
          </BiggerImageModal>
        ))}
      </ImageList>
    </Box>
  )
}

interface MainSectionProps {
  main: IMainSection
}

interface IMainSection extends Strapi__Component_Home_Main {
  ScrollDown: Strapi__Component_Links_Scroll_Down
  RealWorldExamples: Strapi__Component_Home_Real_World_Examples
  Examples: Strapi__Component_Home_Example[]
}

function MobileMainSection(props: IMainSection) {
  const [tabValue, setTabValue] = useState(0)

  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      <FadeIn>
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            width: '80%',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          {props.Title}
        </Typography>
      </FadeIn>
      <Grid
        container
        sx={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: { xs: '500px', sm: '600px' },
          marginBottom: '10px',
        }}
      >
        <Background
          style={{
            opacity: 0.2,
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: -9000,
          }}
        />
        <Grid item xs={11} sx={{ height: '100%' }}>
          <TabPanel
            value={tabValue}
            index={0}
            style={{
              height: '100%',
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Image media={props?.Image} style={{ margin: 'auto', width: '100%' }} />
              <LeftPhoneModal image={props?.LeftPhoneScreen} />
              <RightPhoneModal image={props?.RightPhoneScreen} />
            </Box>
          </TabPanel>
          <TabPanel
            value={tabValue}
            index={1}
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            display="flex" //may be overriden in TabPanel component
          >
            <Grid
              container
              sx={{
                height: '100%',
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Grid
                item
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '"“"',
                    position: 'absolute',
                    left: 0,
                    top: '-50px',
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: '72px',
                    width: '20px',
                  },
                  '&::after': {
                    content: '"“"',
                    position: 'absolute',
                    left: 0,
                    bottom: '-90px',
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: '90px',
                    width: '20px',
                  },
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    lineHeight: '25px',
                    fontSize: '18px',
                    padding: '15px',
                    paddingTop: '0',
                  }}
                >
                  <noscript>{props.AddParagraph1}</noscript>
                  <NoSsr>
                    <Typist avgTypingDelay={10}>{props.AddParagraph1}</Typist>
                  </NoSsr>
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel
            value={tabValue}
            index={2}
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '36px',
            }}
            display="flex"
          >
            <Box
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <Typography sx={{ fontSize: '18px', letterSpacing: '-0.42px', textAlign: 'center', margin: '5px' }}>
                {props.RealWorldExamples.Title}
              </Typography>
              <MulitLineImageList examples={props.Examples} buyLabel={props.RealWorldExamples.BuyLabel} />
            </Box>
          </TabPanel>
        </Grid>

        <Grid item xs={1} sx={{ height: '100%', right: 0, marginRight: -2 }}>
          <Tabs
            sx={{ alignItems: 'center', '& .MuiTabs-flexContainer': { alignItems: 'center' } }}
            orientation="vertical"
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Tab
              icon={tabValue === 0 ? <Icon icon="scrollIndicatorActive" /> : <Icon icon="scrollIndicatorInactive" />}
            />
            <Tab
              icon={tabValue === 1 ? <Icon icon="scrollIndicatorActive" /> : <Icon icon="scrollIndicatorInactive" />}
            />
            <Tab
              icon={tabValue === 2 ? <Icon icon="scrollIndicatorActive" /> : <Icon icon="scrollIndicatorInactive" />}
            />
          </Tabs>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ paddingY: '36px', position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            bottom: '5px',
            width: '100%',
          }}
        >
          <EmbeddedVideo URL={props?.VideoButton?.url}>
            <DumbButton
              button={{ ...props?.VideoButton, text: '' }}
              color="success"
              sx={{ marginTop: 2, padding: 1.2, minWidth: 0 }}
            />
          </EmbeddedVideo>
          <Typography sx={{ marginTop: 1, fontSize: '16px' }}>{props?.VideoButton?.text}</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '16px',
            right: '0',
          }}
        >
          <Icon icon="scrollDownArrows" />
        </Box>
      </Grid>

      <Grid item xs={12} sx={{ paddingY: '36px' }}>
        <Typography sx={{ fontSize: { lg: '20px', md: '16px' }, lineHeight: '30px', textAlign: 'center' }}>
          {props.TargetAudienceParagraphText}{' '}
          <CustomLink
            link={props.TargetAudienceParagraphLink}
            style={{ color: '#A0CBB2', textDecoration: 'none', fontWeight: 'bold' }}
          >
            {props.TargetAudienceParagraphLink?.text}
          </CustomLink>
          {'.'}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          textAlign: 'center',
        }}
      >
        <Button button={props.FreeTrialButtonMobile} color="secondary" centered />
      </Grid>
    </Box>
  )
}

function DesktopMainSection(props: IMainSection) {
  const movingImage = useRef(null)
  const position = useMousePosition(movingImage)

  return (
    <Grid
      container
      sx={{
        display: { xs: 'none', md: 'flex' },
        columnSpacing: '10px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          paddingLeft: '10px',
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'center',
            rowGap: '50px',
            columnGap: { md: '10px' },
            paddingBottom: '100px',
          }}
        >
          <Grid item xs={12}>
            <Typography sx={{ fontSize: { lg: '20px', md: '16px' } }}>{props.CatchPhrase}</Typography>
            <FadeIn>
              <Typography
                sx={{
                  fontSize: { lg: '40px', md: '30px' },
                  fontWeight: 'bold',
                  letterSpacing: '-0.83px',
                }}
              >
                {props.Title}
              </Typography>
            </FadeIn>
          </Grid>
          <Grid item xs={12} sx={{ height: '100px' }}>
            <Typography
              sx={{
                fontSize: { lg: '20px', md: '16px' },
                lineHeight: { lg: '30px', md: '26px' },
                position: 'relative',
                '&::before': {
                  content: '"“"',
                  position: 'absolute',
                  left: 0,
                  top: { lg: '-20px', md: '-15px' },
                  fontSize: '72px',
                  width: '20px',
                },
                '&::after': {
                  content: '"“"',
                  position: 'absolute',
                  left: 0,
                  bottom: { lg: '-50px', md: '-45px' },
                  fontSize: '72px',
                  width: '20px',
                },
              }}
            >
              <>
                <noscript>{props.AddParagraph1}</noscript>
                <NoSsr>
                  <Typist avgTypingDelay={10} cursor={{ show: false }}>
                    {props.AddParagraph1}
                  </Typist>
                </NoSsr>
              </>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <FadeIn>
              <Box>
                <Button
                  button={props.FreeTrialButtonDesktop}
                  color="secondary"
                  className={css`
                    p {
                      padding-right: 8px;
                    }
                  `}
                />
              </Box>
            </FadeIn>
          </Grid>
          <Grid item xs={5}>
            <FadeIn>
              <Box>
                <EmbeddedVideo URL={props?.VideoButton?.url}>
                  <DumbButton button={props?.VideoButton} color="success" />
                </EmbeddedVideo>
              </Box>
            </FadeIn>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} sx={{ position: 'relative', minHeight: '100%' }} ref={movingImage}>
        <Background
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.2,
            position: 'absolute',
            top: '50px',
            left: '-50px',
            width: '120%',
            zIndex: -9000,
          }}
        />
        <Image
          media={props.Image}
          style={{
            width: '110%',
            position: 'relative',
            left: -position.x / 50 + 20,
            top: -position.y / 50 + 50,
          }}
        />
      </Grid>

      <Grid item xs={6} sx={{ paddingLeft: '10px', marginTop: '-65px' }}>
        <Typography
          sx={{
            fontSize: { lg: '20px', md: '16px' },
            fontWeight: 'bold',
            lineHeight: '40px',
            letterSpacing: '-0.42px',
          }}
        >
          ***
        </Typography>
        <Typography sx={{ fontSize: { lg: '20px', md: '16px' }, lineHeight: '30px' }}>
          {props.TargetAudienceParagraphText}{' '}
          <CustomLink
            link={props.TargetAudienceParagraphLink}
            style={{ color: '#A0CBB2', textDecoration: 'none', fontWeight: 'bold' }}
          >
            {props.TargetAudienceParagraphLink?.text}
          </CustomLink>
          {'.'}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ paddingLeft: '20px' }}>
        <Typography sx={{ fontSize: { lg: '20px', md: '16px' }, letterSpacing: '-0.42px', marginLeft: '10px' }}>
          {props?.RealWorldExamples?.Title}
        </Typography>
        <SingleLineImageList
          examples={props?.Examples}
          buyLabel={props?.RealWorldExamples?.BuyLabel}
          imagesPerView={props?.RealWorldExamples?.ImagesShownAtOnce}
        />
      </Grid>
      <Grid item xs={12}>
        <Icon icon="scrollDownArrows" />
        <Typography
          sx={{
            paddingLeft: 2,
            fontSize: { lg: '14px', md: '10px' },
            display: 'inline',
          }}
        >
          {props?.ScrollDown?.Label}
        </Typography>
      </Grid>
    </Grid>
  )
}

const MainSection = (props: MainSectionProps) => {
  return (
    <>
      <DesktopMainSection {...props.main} />
      <MobileMainSection {...props.main} />
    </>
  )
}

export default MainSection
