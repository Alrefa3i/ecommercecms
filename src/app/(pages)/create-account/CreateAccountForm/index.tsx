'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <div className={`${classes.bg} flex items-center justify-center flex-col gap-4`}>
      <div className="flex flex-col justify-center items-center w-full text-center">
        <p className="m-0 p-0  text-center align-middle max-w-fit mt-2 font-light">مرحبا بك</p>
        <h1 className="text-3xl font-bold m-0 p-0 text-center align-middle  max-w-fit">
          انشاء حساب
        </h1>
      </div>
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
        <Input
          name="password"
          type="password"
          label="كلمة المرور"
          required
          register={register}
          error={errors.password}
        />
        <Input
          name="passwordConfirm"
          type="password"
          label="تأكيد كلمة المرور"
          required
          register={register}
          validate={value => value === password.current || 'The passwords do not match'}
          error={errors.passwordConfirm}
        />
        <Button
          type="submit"
          label={loading ? 'يتم التحميل' : ' انشاء حساب'}
          disabled={loading}
          spinner={loading}
          className={`mx-auto ${classes.submit} btn hover:bg-gray-100`}
        />
        <div className="mx-auto">
          {'لديك حساب؟ '}
          <Link href={`/login${allParams}`}>تسجيل الدخول</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateAccountForm
