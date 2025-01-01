{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'

import { Header as HeaderType } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import { HeaderNav } from './Nav'

export async function Header() {
  let header: HeaderType | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.error('Error fetching header:', error)
  }

  return (
    <>
      <HeaderNav header={header} />
    </>
  )
}
