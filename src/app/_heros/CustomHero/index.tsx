import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import Hero from './Hero/Hero'

import classes from './index.module.scss'

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <>
      <Hero richText={richText} media={media} links={links} />
    </>
  )
}
