import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'
import Products from './Products'

import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <div className="bg-logo-200 pt-2">
      <div className="h-7 relative w-full">
        <RenderParams className={` ${classes.params}`} />
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold pb-3 text-center text-logo-600 ">ملفي الشخصي</h1>
      </div>
      <Gutter className={`${classes.account} flex flex-col `}>
        <AccountForm />
        <HR />

        <div className="flex justify-evenly gap-4 flex-col lg:flex-row w-full">
          <Products user={user} />
          <div className="lg:w-1/2 flex flex-col gap-3">
            <h1 className="text-xl font-bold "> طلباتي</h1>
            <p>هذا القسم يحتوي على جميع الطلبات التي قمت بإجرائها</p>
            <Link
              prefetch={true}
              className={'hover:bg-logo-400 hover:text-logo-200 btn mx-auto'}
              href="/orders"
            >
              عرض الطلبات
            </Link>
          </div>
        </div>
        <HR />
        <Button href="/logout" appearance="secondary" label="Log out" />
      </Gutter>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'حسابي',
  description:
    'تسجيل الدخول إلى حسابك أو إنشاء حساب جديد. يمكنك تحديث معلوماتك الشخصية وعرض طلباتك والمزيد.',
  openGraph: mergeOpenGraph({
    title: 'حسابي',
    url: '/account',
  }),
}
