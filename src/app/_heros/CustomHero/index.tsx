import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import Hero from './Hero/Hero'

export const CustomHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <>
      <Hero richText={richText} />
    </>
  )
}
