import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <Gutter className={classes.hero}>
      <div className={classes.content}>
        <RichText content={richText} />
        {Array.isArray(links) && links.length > 0 && (
          <ul className={classes.links}>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className={classes.media}>
        {typeof media === 'object' && (
          <div className="hidden lg:block">
            <Media resource={media} imgClassName="hidden lg:block " priority />
            {media?.caption && <RichText content={media.caption} className={classes.caption} />}
          </div>
        )}
      </div>
    </Gutter>
  )
}
