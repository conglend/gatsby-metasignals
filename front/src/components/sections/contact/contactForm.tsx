import DumbButton from '@/components/elements/dumb-button'
import { Icon } from '@/components/elements/icon'
import RichText from '@/components/elements/rich-text'
import SpeechBalloon from '@/components/elements/speech-balloon'
import { useIsMobile } from '@/utils/hooks'
import { css } from '@emotion/css'
import { Box, Grid, Typography } from '@mui/material'
import {
  Strapi__Component_Contact_Form,
  Strapi__Component_Contact_Tiers_List,
  Strapi__Component_Links_Button,
} from 'gatsby-graphql'
import React, { Dispatch, MutableRefObject, SetStateAction, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { theme } from 'src/theme/ThemeProvider'
import TierSelect from './tierSelect'
import ReCAPTCHA from 'react-google-recaptcha'
import { bool } from 'yup'

interface IContactFormProps extends Strapi__Component_Contact_Form {
  consentParagraph: string
  promptParagraph: string
  button: Strapi__Component_Links_Button
  tiersList: Strapi__Component_Contact_Tiers_List[]
  formContainerRef: MutableRefObject<HTMLDivElement | null>
  submitted: boolean
  setSubmitted: Dispatch<SetStateAction<boolean>>
}
const ContactForm = (props: IContactFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: {
    token: string | undefined
    message: string
    firstName: string
    lastName: string
    emailAddress: string
    discordUsername: string
    membershipTier: string
  }) => {
    const requestHeaders = new Headers()
    requestHeaders.append('Content-Type', 'application/json')
    if (process.env.GATSBY_ZENDESK_LAMBDA)
      fetch(process.env.GATSBY_ZENDESK_LAMBDA, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({
          token: data.token,
          message: data.message,
          first_name: data.firstName,
          last_name: data.lastName,
          email_address: data.emailAddress,
          membership_tier: data.membershipTier,
          discord_username: data.discordUsername,
        }),
      })

    props.setSubmitted(true)
    props.formContainerRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onChangeCaptcha = (value: string | null) => {
    setValue('token', value)
  }

  const isMobile = useIsMobile()
  return (
    <>
      {props.submitted ? (
        isMobile ? (
          <Box
            sx={{
              width: '100%',
              height: '550px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              paddingTop: '20%',
            }}
          >
            <Icon icon="checkmark" style={{ width: '33%', flexBasis: '50%' }} />
            <Typography sx={{ textAlign: 'center', fontSize: '24px', flexBasis: '30%', paddingTop: '24px' }}>
              <RichText markdown={props?.SubmittedMessage?.data?.SubmittedMessage} />
            </Typography>
          </Box>
        ) : (
          <Box sx={{ paddingTop: '32px', width: '100%' }}>
            <SpeechBalloon variant="right">
              <Box
                sx={{
                  width: '100%',
                  height: '550px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingTop: '20%',
                }}
              >
                <Icon icon="checkmark" style={{ width: '33%', flexBasis: '50%' }} />
                <Typography
                  sx={{ textAlign: 'center', fontSize: '24px', flexBasis: '30%', maxWidth: { lg: '75%', md: '90%' } }}
                >
                  <RichText markdown={props?.SubmittedMessage?.data?.SubmittedMessage} />
                </Typography>
              </Box>
            </SpeechBalloon>
          </Box>
        )
      ) : (
        <>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: '20px', textAlign: { md: 'left', xs: 'center' } }}>
              <RichText markdown={props?.promptParagraph} />
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ paddingY: '36px' }}>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
              <Grid container sx={{ width: '100%', gap: '16px', textTransform: 'uppercase' }}>
                <Grid item xs={12}>
                  <label>
                    {props?.FirstNameLabel}* <br />
                  </label>
                  <input
                    {...register('firstName', { required: true })}
                    type={'text'}
                    placeholder={props?.FirstNamePlaceholder}
                    className={css`
                      background-color: ${theme.palette.grey[100]};
                      ::placeholder {
                        color: ${theme.palette.background.default};
                      }
                      ${errors?.firstName && 'box-shadow: inset 0px 0px 0px 2px ' + theme.palette.error.main}
                    `}
                    style={{
                      height: '56px',
                      width: '100%',
                      padding: '10px',
                      fontSize: '18px',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      borderColor: 'transparent',
                      borderBottom: '1px solid white',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>
                    {props?.LastNameLabel} <br />
                    <input
                      {...register('lastName')}
                      type={'text'}
                      placeholder={props?.LastNamePlaceholder}
                      className={css`
                        background-color: ${theme.palette.grey[100]};
                        ::placeholder {
                          color: ${theme.palette.background.default};
                        }
                      `}
                      style={{
                        height: '56px',
                        width: '100%',
                        padding: '10px',
                        fontSize: '18px',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderColor: 'transparent',
                        borderBottom: '1px solid white',
                      }}
                    />
                  </label>
                </Grid>

                <Grid item xs={12}>
                  <label>
                    {props?.EmailAddressLabel}* <br />
                    <input
                      {...register('emailAddress', { required: true })}
                      type={'email'}
                      placeholder={props?.EmailAddressPlaceholder}
                      className={css`
                        background-color: ${theme.palette.grey[100]};
                        ::placeholder {
                          color: ${theme.palette.background.default};
                        }
                        ${errors?.emailAddress && 'box-shadow: inset 0px 0px 0px 2px ' + theme.palette.error.main}
                      `}
                      style={{
                        height: '56px',
                        width: '100%',
                        padding: '10px',
                        fontSize: '18px',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderColor: 'transparent',
                        borderBottom: '1px solid white',
                      }}
                    />
                  </label>
                </Grid>

                <Grid item xs={12}>
                  <label>
                    {props?.MembershipTierLabel} <br />
                    <TierSelect registerFunction={register} tiers={props?.tiersList} />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    {props?.DiscordUsernameLabel} <br />
                    <input
                      {...register('discordUsername')}
                      type={'text'}
                      placeholder={props?.DiscordUsernamePlaceholder}
                      className={css`
                        background-color: ${theme.palette.grey[100]};
                        ::placeholder {
                          color: ${theme.palette.background.default};
                        }
                      `}
                      style={{
                        height: '56px',
                        width: '100%',
                        padding: '10px',
                        fontSize: '18px',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderColor: 'transparent',
                        borderBottom: '1px solid white',
                      }}
                    />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    {props?.MessageLabel}* <br />
                    <textarea
                      {...register('message', { required: true })}
                      rows={11}
                      placeholder={props?.MessagePlaceholder}
                      className={css`
                        background-color: ${theme.palette.grey[100]};
                        ::placeholder {
                          color: ${theme.palette.background.default};
                        }
                        ${errors?.message && 'box-shadow: inset 0px 0px 0px 2px ' + theme.palette.error.main}
                      `}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '18px',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderColor: 'transparent',
                        borderBottom: '1px solid white',
                        resize: 'none',
                      }}
                    />
                  </label>
                </Grid>

                {process.env.GATSBY_RECAPTCHA_SITE_KEY && (
                  <Grid item xs={12}>
                    <ReCAPTCHA
                      {...register('token', { required: true })}
                      sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
                      onChange={onChangeCaptcha}
                      className={css`
                        div > div > iframe {
                          ${errors?.token && 'box-shadow: 0px 0px 0px 2px ' + theme.palette.error.main}
                        }
                      `}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sx={{ paddingX: '1%', paddingBottom: '20px' }}>
                  <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                    <DumbButton
                      button={props?.button as Strapi__Component_Links_Button}
                      color="success"
                      type="submit"
                    />
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: '14px' }}>
              <RichText markdown={props.consentParagraph} />
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              paddingTop: '22px',
            }}
          >
            <Typography sx={{ fontSize: '14px' }}>*{props?.RequiredLabel}</Typography>
          </Grid>
        </>
      )}
    </>
  )
}

export default ContactForm
