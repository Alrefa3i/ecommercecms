import React, { ElementType, Fragment } from 'react'

import { Image } from './Image'
import { Props } from './types'
import { Video } from './Video'

export const Media: React.FC<Props> = props => {
  const { className, resource, htmlElement = 'div' } = props

  const isVideo = typeof resource !== 'string' && resource?.mimeType?.includes('video')
  const Tag = (htmlElement as ElementType) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo && (
        <>
          <div
            style={{
              width: '24.9%',
              minHeight: '13%',
              background: '#fefefe',
              position: 'absolute',
              bottom: 0,
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              width: '28%',
              minHeight: '8.7%',
              background: '#fefefe',
              position: 'absolute',
              bottom: 0,
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              width: '100%',
              minHeight: '1%',
              background: '#fefefe',
              position: 'absolute',
              bottom: 0,
              zIndex: 100,
            }}
          ></div>
        </>
      )}
      {isVideo ? <Video {...props} /> : <Image {...props} />}
    </Tag>
  )
}
