import React from 'react'
import { getStrapiMedia } from '@/utils/media'
import { Strapi__Media } from 'gatsby-graphql'

interface IVideoProps {
  media: Strapi__Media
  poster: Strapi__Media
  className?: string
  controls?: boolean
  autoPlay?: boolean
}

const Video: React.FC<IVideoProps> = ({ media, poster, className, controls = true, autoPlay = false }) => {
  const fullVideoUrl = getStrapiMedia(media.url)
  const fullPosterUrl = getStrapiMedia(poster?.url)

  return (
    <video className={className} poster={fullPosterUrl} controls={controls} autoPlay={autoPlay}>
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  )
}

export default Video
