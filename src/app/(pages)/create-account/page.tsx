import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <div>
      <RenderParams />
      <CreateAccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'تسجيل حساب جديد',
  description: 'إنشاء حساب جديد للوصول إلى المزيد من الميزات.',
  openGraph: mergeOpenGraph({
    title: 'تسجيل حساب جديد',
    description: 'إنشاء حساب جديد للوصول إلى المزيد من الميزات.',
  }),
}
