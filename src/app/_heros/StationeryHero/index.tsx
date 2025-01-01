import React from 'react'
import Image from 'next/image'

import { Page } from '../../../payload/payload-types'
import StationeryClient from './StationeryClient'

import classes from './index.module.scss'
export const StationeryHero: React.FC<Page['hero']> = props => {
  let isLoading = true
  return (
    <>
      <div className={` h-[calc(50vh)] ${classes.bgimage} pt-2 grid place-items-center lg:block`}>
        <StationeryClient richText={props.richText} />
      </div>
    </>
  )
}
