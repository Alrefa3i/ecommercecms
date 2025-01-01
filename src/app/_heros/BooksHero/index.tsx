import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import BookHero from './BookHero'

import classes from './index.module.scss'
export const BooksHero: React.FC<Page['hero']> = props => {
  const { richText, media, links } = props

  return (
    <>
      <div className={` h-[calc(50vh)] ${classes.bgimage} grid place-items-center lg:block`}>
        <BookHero richText={richText} media={media} links={links} />
      </div>
    </>
  )
}
