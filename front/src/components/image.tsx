import React, { CSSProperties } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Strapi__Media } from 'gatsby-graphql'
import { IGatsbyImageDataParent } from 'gatsby-plugin-image/dist/src/components/hooks'

interface IImageProps {
  media: Strapi__Media
  className?: string
  style?: CSSProperties
  scaleDown?: boolean
  imageStyle?: CSSProperties
}

const Image: React.FC<IImageProps> = ({ media, className, style, scaleDown, imageStyle }) => {
  const isDynamicImage = Boolean(media?.localFile)
  const alt = media?.alternativeText || 'An image uploaded to Strapi'

  const image = media?.localFile && getImage(media?.localFile as IGatsbyImageDataParent)

  const isSVG = media?.localFile?.publicURL?.includes('.svg')

  if (isDynamicImage && image && !isSVG) {
    return scaleDown ? (
      <GatsbyImage
        draggable="false"
        className={className}
        style={style}
        image={image}
        alt={alt}
        objectFit="scale-down"
        imgStyle={imageStyle}
      />
    ) : (
      <GatsbyImage className={className} style={style} image={image} alt={alt} imgStyle={imageStyle} />
    )
  }

  return (
    <img
      src={media?.localFile.publicURL}
      alt={alt}
      style={style}
      className={className}
      height={'100%'}
      width={'100%'}
    />
  )
}

export default Image
