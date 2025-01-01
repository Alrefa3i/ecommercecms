import React from 'react'
import { Metadata } from 'next'

import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <div className="w-full h-full">
      <RenderParams className={classes.params} />
      <LoginForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'تسجيل الدخول',
  description: 'تسجيل الدخول إلى حسابك للوصول إلى المزيد من الميزات.',
  openGraph: mergeOpenGraph({
    title: 'تسجيل الدخول',
    description: 'تسجيل الدخول إلى حسابك للوصول إلى المزيد من الميزات.',
  }),
}
