import React from 'react'
import { Button as MuiButton, ButtonProps, Typography } from '@mui/material'
import { Icon, IconTypes } from './icon'
import { Strapi__Component_Links_Button } from 'gatsby-graphql'
import { Link } from 'gatsby-theme-material-ui'
import { useIsMobile } from '@/utils/hooks'

export interface IButtonProps extends ButtonProps {
  button: Strapi__Component_Links_Button
  className?: ButtonProps['className'] | string
  centered?: boolean
}

export default function Button(props: IButtonProps) {
  const isMobile = useIsMobile()
  const centered = props.centered ?? (isMobile && !!props.button?.text)

  return (
    <Link
      to={props?.button?.url || '/traders'}
      style={{ textDecoration: 'none', width: '100%' }}
      target={props?.button?.newTab ? '_blank' : '_self'}
    >
      <MuiButton
        variant="contained"
        sx={{
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
              fontSize: 16,
            }}
          >
            {props.button?.text}
          </Typography>
        )}
        <Icon icon={props.button?.icon as IconTypes} />
      </MuiButton>
    </Link>
  )
}
