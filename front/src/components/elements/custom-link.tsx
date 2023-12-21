import React from 'react'
import { GatsbyLinkProps, Link } from 'gatsby'
import { Link as MuiLink, LinkProps } from '@mui/material'
import { Strapi__Component_Links_Link } from 'gatsby-graphql'
import { localizePath } from '@/utils/localize'

interface ICustomLinkProps extends LinkProps {
  link: Strapi__Component_Links_Link
  // eslint-disable-next-line
  activeStyle?: GatsbyLinkProps<any>['activeStyle']
}

const CustomLink: React.FC<ICustomLinkProps> = ({ link, children, ...props }) => {
  const isInternalLink = link?.url?.startsWith('/') && !link?.newTab //to open in new tab we need an external link
  const localePrefix = (typeof localStorage !== `undefined` && localStorage.getItem('locale')) || 'en'
  const localizedUrl = localizePath(localePrefix, 'en', link?.url) // TODO store defaultLocale globally?

  return (
    <MuiLink
      href={link?.url}
      component={MuiLink}
      to={isInternalLink ? localizedUrl : link?.url}
      target={link?.newTab ? '_blank' : '_self'}
      rel="noreferrer"
      {...props}
    >
      {children}
    </MuiLink>
  )
}

export default CustomLink
