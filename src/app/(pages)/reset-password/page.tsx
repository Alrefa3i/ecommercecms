import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'اعد ضبط كلمة المرور',
  description: 'الرجاء إدخال كلمة مرور جديدة أدناه.',
  openGraph: mergeOpenGraph({
    title: 'اعد ضبط كلمة المرور',
    description: 'الرجاء إدخال كلمة مرور جديدة أدناه.',
    url: '/reset-password',
  }),
}
