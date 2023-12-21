import React from 'react'
import { Button as MuiButton, ButtonProps, Typography } from '@mui/material'
import { Icon, IconTypes } from './icon'
import { Strapi__Component_Links_Button } from 'gatsby-graphql'
import { useIsMobile } from '@/utils/hooks'
import { theme } from 'src/theme/ThemeProvider'

export interface IButtonProps extends ButtonProps {
  button: Strapi__Component_Links_Button | { text: string; icon?: IconTypes }
  className?: ButtonProps['className'] | string
  centered?: boolean
  loading?: boolean
}

export default function DumbButton(props: IButtonProps) {
  const isMobile = useIsMobile()
  const centered = props.centered ?? (isMobile && !!props.button?.text)
  return (
    <MuiButton
      variant="contained"
      sx={{
        //@ts-ignore
        backgroundColor: props.button?.type,
        height: '56px',
        width: props.button?.text ? { xs: '100%' } : '56px', //if no label given then only icon is displayed
        display: 'flex',
        justifyContent: props.button?.text && !centered ? 'space-between' : 'center',
        textAlign: { md: 'left', xs: 'center' },
      }}
      {...props}
    >
      {props.button?.text && (
        <Typography
          sx={{
            fontWeight: 'bold',
            display: 'inline',
            width: '100%',
            paddingRight: !centered ? 3 : 0,
            textAlign: !centered ? 'left' : 'center',
            color: theme.palette.text.primary,
          }}
        >
          {props.button?.text}
        </Typography>
      )}
      {props.button?.icon && <Icon icon={props.button?.icon as IconTypes} />}
    </MuiButton>
  )
}
