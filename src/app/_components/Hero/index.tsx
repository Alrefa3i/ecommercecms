import React from 'react'

import { Page } from '../../../payload/payload-types'
import { BooksHero } from '../../_heros/BooksHero'
import { CustomHero } from '../../_heros/CustomHero'
import { HighImpactHero } from '../../_heros/HighImpact'
import { LowImpactHero } from '../../_heros/LowImpact'
import { MediumImpactHero } from '../../_heros/MediumImpact'
import { ServicesHero } from '../../_heros/ServicesHero'
import { StationeryHero } from '../../_heros/StationeryHero'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  CustomHero: CustomHero,
  BooksHero: BooksHero,
  ServicesHero: ServicesHero,
  StationeryHero: StationeryHero,
}

export const Hero: React.FC<Page['hero']> = props => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
