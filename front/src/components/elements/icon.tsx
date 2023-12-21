import get from 'lodash.get'
import React, { SVGProps } from 'react'
import arrowLeft from '../../assets/icons/arrow-left.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'
import arrowTop from '../../assets/icons/arrow-top.svg'
import arrowBottom from '../../assets/icons/arrow-bottom.svg'
import chevronDown from '../../assets/icons/chevron-down.svg'
import chevronTop from '../../assets/icons/chevron-top.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRightRed from '../../assets/icons/chevron-right-red.svg'
import chevronRightGreen from '../../assets/icons/chevron-right-green.svg'
import menuBurger from '../../assets/icons/menu-burger.svg'
import scrollDownArrows from '../../assets/icons/scroll-down-arrows.svg'
import scrollIndicatorActive from '../../assets/icons/scroll-indicator-active.svg'
import scrollIndicatorInactive from '../../assets/icons/scroll-indicator-inactive.svg'
import twitter from '../../assets/icons/twitter.svg'
import videoPlayer from '../../assets/icons/video-player.svg'
import imageIcon from '../../assets/icons/image-icon.svg'
import close from '../../assets/icons/close.svg'
import closeGrey from '../../assets/icons/close-grey.svg'
import scrollDash from '../../assets/icons/scroll-dash.svg'
import scrollDot from '../../assets/icons/scroll-dot.svg'
import plus from '../../assets/icons/plus.svg'
import minus from '../../assets/icons/minus.svg'
import checkmark from '../../assets/icons/checkmark.svg'
import redcross from '../../assets/icons/redcross.svg'
import send from '../../assets/icons/send.svg'

const icons = {
  arrowLeft,
  arrowRight,
  arrowTop,
  arrowBottom,
  chevronDown,
  chevronTop,
  chevronRight,
  chevronRightRed,
  closeGrey,
  menuBurger,
  scrollDownArrows,
  scrollIndicatorActive,
  scrollIndicatorInactive,
  twitter,
  videoPlayer,
  close,
  scrollDash,
  scrollDot,
  imageIcon,
  plus,
  minus,
  chevronRightGreen,
  chevronLeft,
  checkmark,
  redcross,
  send,
}

export type IconTypes = keyof typeof icons

export interface IconProps extends SVGProps<any> {
  icon: IconTypes
}

export const Icon: React.FC<IconProps> = (props) => {
  const Component = get(icons, props.icon)

  if (!Component) return null

  return <Component {...props} />
}
