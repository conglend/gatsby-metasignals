import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

interface IRichTextProps {
  markdown: string
  className?: string
  preserveNewlines?: boolean
  sx?: SxProps<Theme> | undefined
  hyperlinkColor?: string
  textAlignLeft?: boolean
}

const RichText = (props: IRichTextProps) => {
  let preformattedMarkdown = props.markdown
  if (props.preserveNewlines) {
    //looping instead of String.replaceAll/replace because sometimes it didn't detect some newline characters as newlines
    preformattedMarkdown = ''
    for (let i = 0; i < props.markdown.length; i++) {
      if (props.markdown.charAt(i) === '\n') {
        preformattedMarkdown += '<br />'
      } else {
        preformattedMarkdown += props.markdown.charAt(i)
      }
    }
  }

  return (
    <Box
      sx={{
        '& * a': {
          color: props.hyperlinkColor || '#A0CBB2',
          textDecoration: 'none',
          fontWeight: 'bold',
        },
        '& ul ::marker': { color: 'green' },
        '& ul': {
          paddingLeft: '20px',
          textAlign: props.textAlignLeft ? 'left' : 'inherit',
        },
        '& ol': {
          paddingLeft: '20px',
          textAlign: props.textAlignLeft ? 'left' : 'inherit',
        },
        '& * * a': {
          color: '#A0CBB2',
          textDecoration: 'none',
          fontWeight: 'bold',
        },
        '& * ul ::marker': { color: 'green' },
        '& * ul': {
          paddingLeft: '20px',
          textAlign: props.textAlignLeft ? 'left' : 'inherit',
        },
        '& * ol': {
          paddingLeft: '20px',
          textAlign: props.textAlignLeft ? 'left' : 'inherit',
        },
        whiteSpace: props.preserveNewlines ? 'pre-wrap' : 'initial',
        ...props.sx,
      }}
      className={props.className}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        children={preformattedMarkdown}
        linkTarget={(href) => (href.startsWith('http') ? '_blank' : '_self')}
      />
    </Box>
  )
}

export default RichText
