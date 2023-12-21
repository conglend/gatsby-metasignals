import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import Image from '../../../components/image'
import { Strapi__Component_Links_Scroll_Down, Strapi__Media } from 'gatsby-graphql'
import SpeechBalloon from '../../../components/elements/speech-balloon'
import { Icon } from '@/components/elements/icon'

import FadeIn from '@/components/elements/fade-in'
import RichText from '@/components/elements/rich-text'
import { css } from '@emotion/css'
interface IBox {
  Title?: string
  Paragraph?: Array<{ Type: string; Content: string }>
  ListElement?: Array<IListElement>
  Image: Strapi__Media
}
interface QuestionsSectionProps {
  boxes: Array<IBox>
  largeScreen: boolean
  ScrollDown: Strapi__Component_Links_Scroll_Down
}
interface IParagraph {
  Content: string
  Type: 'Bold' | 'Red' | 'Standard'
  fontSize: { md: string; lg: string; xs: string }
}
interface IListElement {
  Content: string
}
function Paragraph(props: IParagraph) {
  return (
    <Typography
      sx={{
        color: props?.Type === 'Red' ? 'primary.main' : 'primary.dark',
        fontWeight: props?.Type === 'Bold' || props?.Type === 'Red' ? 'bold' : 'inherit',
        fontSize: props?.fontSize,
      }}
    >
      {props?.Content}
    </Typography>
  )
}
export default function QuestionsSection(props: QuestionsSectionProps) {
  const { boxes, largeScreen } = props
  const textFontSize = { md: '20px', lg: '24px', xs: '16px' }
  const titleFontSize = { md: '35px', lg: '40px', xs: '30px' }
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={'45px'}>
      {boxes?.map((box, index) => {
        const isEven = index % 2 == 0
        const isOdd = !isEven
        return (
          <>
            {/* alternating between left and right */}
            {(!largeScreen || isOdd) && (
              <Grid item md={6} xs={12} key={`box#${index}-img`}>
                <Image
                  media={box?.Image}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
                  }}
                />

                <RichText
                  markdown={box?.ImageDescription.data.ImageDescription}
                  className={css`
                    text-align: center;
                    font-weight: 700;
                    & * {
                      margin: 0;
                    }
                  `}
                />
              </Grid>
            )}

            <Grid item md={6} xs={12} marginBottom={{ lg: '50px', xs: '80px' }} key={`box#${index}-text`}>
              <FadeIn>
                <Typography
                  sx={{
                    fontSize: titleFontSize,
                    fontWeight: 'bold',
                    letterSpacing: '-0.83px',
                    textAlign: { md: 'left', xs: 'center' },
                  }}
                >
                  {box.Title}
                </Typography>
              </FadeIn>
              <FadeIn>
                <Box sx={{ fontSize: textFontSize, textAlign: 'center' }}>
                  <SpeechBalloon variant={isEven ? 'right' : 'left'}>
                    <Grid
                      container
                      sx={{
                        justifyContent: 'flex-start',
                        gap: '10px',
                        rowGap: '20px',
                      }}
                    >
                      {box?.Paragraph?.map((paragraph) => (
                        <Grid item sx={{ textAlign: 'left' }}>
                          <Paragraph
                            Content={paragraph.Content}
                            Type={paragraph.Type as 'Bold' | 'Red' | 'Standard'}
                            fontSize={textFontSize}
                          ></Paragraph>
                        </Grid>
                      ))}
                      <Grid item textAlign="left" xs={12} component="div" key={`box#$list`}>
                        {box?.ListElement?.map((elem, i) => (
                          <Typography
                            key={`box#${index}-paragraph#${i}`}
                            component="li"
                            sx={{ color: 'success.main', fontSize: textFontSize, paddingBottom: '10px' }}
                          >
                            <Typography component="span" sx={{ color: 'primary.dark', fontSize: textFontSize }}>
                              {elem.Content}
                            </Typography>
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                  </SpeechBalloon>
                </Box>
              </FadeIn>
            </Grid>

            {isEven && largeScreen && (
              <Grid item md={6} xs={12} key={`box#${index}-img`}>
                <Image
                  media={box.Image}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
                  }}
                />
                <RichText
                  markdown={box?.ImageDescription.data.ImageDescription}
                  className={css`
                    text-align: center;
                    font-weight: 700;
                    & * {
                      margin: 0;
                    }
                  `}
                />
              </Grid>
            )}
          </>
        )
      })}

      {largeScreen && (
        <>
          <Grid item xs={12}>
            <Icon icon="scrollDownArrows" />
            <Typography fontSize="14px" sx={{ paddingLeft: 2, display: 'inline' }}>
              {props?.ScrollDown?.Label}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  )
}
