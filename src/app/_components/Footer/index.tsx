import React from 'react'
import Link from 'next/link'

import { Footer as FooterType } from '../../../payload/payload-types'
import { fetchFooter, fetchGlobals } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

export async function Footer() {
  let footer: FooterType | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.error('Error fetching footer:', error)
  }
  return (
    <>
      <FooterComponent />
    </>
  )
}
