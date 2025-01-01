'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  name: string
  phone: string
  password: string
  passwordConfirm: string
}

const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)

          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            phone: json.doc.phone,
            // Reset password fields
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        phone: user.phone,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <>
      <h1 className="text-xl font-bold">حسابي</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`gap-5 ${classes.form} mx-auto text-center`}
      >
        <Message error={error} success={success} className={`w-1/2 ${classes.message}`} />
        {!changePassword ? (
          <Fragment>
            <p className="text-center">
              {' تعدبل البيانات الخاصة بك أدناه ،أو '}
              <button
                type="button"
                className={classes.changePassword}
                onClick={() => setChangePassword(!changePassword)}
              >
                اضغط هنا
              </button>
              {' لتغيير كلمة المرور.'}
            </p>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full">
                <Input
                  inputClass=" input input-solid min-w-full"
                  name="name"
                  labelClass="sr-only"
                  label="الاسم الكامل"
                  register={register}
                  error={errors.name}
                />
                {/* input input-solid max-w-full */}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    name="email"
                    inputClass="input input-solid"
                    labelClass="sr-only"
                    label="البريد الالكتروني"
                    required
                    register={register}
                    error={errors.email}
                    type="email"
                  />
                </div>

                <div>
                  <Input
                    name="phone"
                    inputClass="input input-solid"
                    labelClass="sr-only"
                    label="رقم الهاتف"
                    required
                    register={register}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p className="text-center">
              {'  تغيير كلمة المرور الخاصة بك أدناه ،أو  '}
              <button
                type="button"
                className={classes.changePassword}
                onClick={() => setChangePassword(!changePassword)}
              >
                الالغاء
              </button>
              .
            </p>
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
              label="تاكيد كلمة المرور"
              required
              register={register}
              validate={value => value === password.current || 'كلمة المرور غير متطابقة'}
              error={errors.passwordConfirm}
            />
          </Fragment>
        )}
        <Button
          type="submit"
          label={
            isLoading ? 'Processin' : changePassword ? 'تغيير كلمة المرور' : 'تحديث معلومات الحساب'
          }
          disabled={isLoading}
          spinner={isLoading}
          appearance="primary"
          className={`hover:bg-logo-400 hover:text-logo-200 bg-gray-100 btn mx-auto ${classes.submit}`}
        />
      </form>
    </>
  )
}

export default AccountForm
