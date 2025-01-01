import React, { Fragment } from 'react'
import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/Gutter'
import { Message } from '../../_components/Message'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    // no need to redirect to 404 here, just simply render the page with fallback data where necessary
    console.error(error) // eslint-disable-line no-console
  }

  return (
    <Fragment>
      <Gutter className={`${classes.checkoutPage} bg-logo-200 py-8 `}>
        <CheckoutPage settings={settings} />
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'انهاء الطلب',
  description: 'تأكيد طلبك واختيار طريقة الدفع.',
  openGraph: mergeOpenGraph({
    title: 'انهاء الطلب',
    description: 'تأكيد طلبك واختيار طريقة الدفع.',
  }),
}
