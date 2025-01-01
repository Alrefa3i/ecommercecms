import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import ServicesClient from './ServicesClient'

import classes from './index.module.scss'
export const ServicesHero: React.FC<Page['hero']> = props => {
  const { richText, media, links } = props

  return (
    <>
      <div className={` h-[calc(50vh)] ${classes.bgimage} pt-2 grid place-items-center my-auto`}>
        <ServicesClient richText={richText} />
      </div>
    </>
  )
}
