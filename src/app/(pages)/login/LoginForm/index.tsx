'use client'

import React, { useCallback, useRef } from 'react'
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
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/account')
      } catch (_) {
        setError('خطأ في تسجيل الدخول ، يرجى التحقق من البريد الإلكتروني وكلمة المرور')
      }
    },
    [login, router],
  )

  return (
    <div className={`${classes.bg} flex items-center justify-center flex-col gap-4`}>
      <div className="flex flex-col justify-center items-center w-full text-center">
        <p className="m-0 p-0  text-center align-middle max-w-fit mt-2">مرحبا بعودتك 👋</p>
        <h1 className="text-3xl font-bold m-0 p-0 text-center align-middle  max-w-fit">
          تسجيل الدخول لحسابك
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex justify-center items-center  ${classes.form}`}
      >
        <Message error={error} className={classes.message} />
        <Input
          name="email"
          label="البريد الإلكتروني"
          required
          register={register}
          error={errors.email}
          type="email"
          inputClass="w-full"
        />
        <Input
          name="password"
          type="password"
          label="كلمة المرور"
          inputClass="w-full"
          required
          register={register}
          error={errors.password}
        />
        <Button
          type="submit"
          label={isLoading ? 'يتم التحميل' : 'تسجيل الدخول'}
          disabled={isLoading}
          spinner={isLoading}
          className={`mx-auto ${classes.submit} btn hover:bg-gray-100`}
        />
        <div className=" text-center mx-auto w-1/2 text-sm">
          <Link href={`/create-account${allParams}`}>انشاء حساب</Link>
          <br />
          <Link href={`/recover-password${allParams}`}>اعادة تعيين كلمة المرور</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
