'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1>استعادة كلمة المرور</h1>
          <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Message error={error} className={classes.message} />
              <Input
                name="email"
                label="البريد الإلكتروني"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Button
                type="submit"
                appearance="primary"
                label="استعادة كلمة المرور"
                className={classes.submit}
              />
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>تم الارسال</h1>
          <p>
            تحقق من بريدك الإلكتروني للعثور على رابط يسمح لك بإعادة تعيين كلمة المرور الخاصة بك
            بأمان.
          </p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
