/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import sha256 from 'crypto-js/sha256'
import { useRouter } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

type ProductDetail = {
  order_id: string
  amount: number
  quantity: number
}

const generateSignature = (params: Record<string, any>, secretKey: string) => {
  const filteredKeys = Object.keys(params)
    .filter(key => key !== 'productdetail')
    .sort()

  let signatureString = secretKey
  filteredKeys.forEach(key => {
    signatureString += params[key]
  })

  return sha256(signatureString).toString()
}

export const CheckoutForm: React.FC<{
  location: string
  modalState: any
}> = ({ location, modalState }) => {
  const [error, setError] = React.useState<string | null>(null)

  const { cart, cartTotal } = useCart()

  return (
    <>
      {error && <Message error={error} />}

      <SadadPaymentForm
        modalState={modalState}
        location={location}
        cartTotal={cartTotal}
        cart={cart}
      />
    </>
  )
}

type CartItem = {
  product: {
    id: string
    _price: string
  }
  quantity: number
}

type Props = {
  cartTotal: { raw: number }
  cart: { items?: any[] }
  location: string
  modalState: any
}

function formatTimeAsOrderID(date: Date) {
  return date
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, 14)
}

const SadadPaymentForm: React.FC<Props> = ({ cartTotal, cart, location, modalState }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const secretKey = process.env.NEXT_PUBLIC_SADAD_SECRET_KEY
  const merchantId = process.env.NEXT_PUBLIC_SADAD_MERCHANT_ID
  const origin = 'test.alrefa3ee.tech' // Test website domain
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const [count, setCount] = useState(0)

  const params = useMemo(() => {
    return {
      CALLBACK_URL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sadadpayment`,
      EMAIL: user.email,
      MOBILE_NO: '97455556666',
      ORDER_ID: formatTimeAsOrderID(new Date()),
      TXN_AMOUNT: `${cartTotal.raw.toFixed(2)}`,
      WEBSITE: origin,
      merchant_id: merchantId,
      txnDate: currentDate,
      productdetail: cart?.items?.map(item => {
        if (typeof item.product === 'object') {
          const { quantity, product } = item
          return {
            order_id: product.id,
            amount: product._price,
            quantity: quantity,
          }
        }
        return null
      }),
    } as Record<string, any>
  }, [cartTotal])

  const generateSignature = (params: Record<string, any>, secretKey: string) => {
    const filteredKeys = Object.keys(params)
      .filter(key => key !== 'productdetail')
      .sort()

    let signatureString = secretKey
    filteredKeys.forEach(key => {
      signatureString += params[key]
    })

    return sha256(signatureString).toString()
  }

  const handleSubmit = useCallback(async () => {
    setLoading(true)

    modalState(true)

    const signature = generateSignature(params, secretKey)
    const form = document.getElementById('sadadForm') as HTMLFormElement
    const signatureInput = document.createElement('input')
    signatureInput.type = 'hidden'
    signatureInput.name = 'signature'
    signatureInput.value = signature
    form.appendChild(signatureInput)
    try {
      const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.ORDER_ID,
          _id: params.ORDER_ID,
          SadadPaymentID: params.ORDER_ID,
          total: cartTotal.raw,
          items: (cart?.items || [])?.map(({ product, quantity }) => ({
            product: typeof product === 'string' ? product : product.id,
            quantity,
            price:
              typeof product === 'object' ? priceFromJSON(product.priceJSON, 1, true) : undefined,
          })),
          location: location || 'online',
          status: 'failed',
        }),
      })

      if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

      const {
        error: errorFromRes,
        doc,
      }: {
        message?: string
        error?: string
        doc: Order
      } = await orderReq.json()

      if (errorFromRes) throw new Error(errorFromRes)

      form.submit()
    } catch (err) {
      // don't throw an error if the order was not created successfully
      // this is because payment _did_ in fact go through, and we don't want the user to pay twice
      console.error(err.message) // eslint-disable-line no-console
      router.push(`/checkout?error=${encodeURIComponent(err.message)}`)
    }
  }, [params, cartTotal, cart, router])

  useEffect(() => {
    const form = document.getElementById('sadadForm') as HTMLFormElement

    Object.keys(params).forEach(key => {
      if (key === 'productdetail' && Array.isArray(params[key])) {
        params[key].forEach((item: ProductDetail, index: number) => {
          Object.keys(item).forEach(subKey => {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = `productdetail[${index}][${subKey}]`
            input.value = item[subKey as keyof ProductDetail] as string
            form.appendChild(input)
          })
        })
      } else {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key as keyof typeof params] as string
        form.appendChild(input)
      }
    })
  }, [params])

  return (
    <form id="sadadForm" action="https://sadadqa.com/webpurchase" method="post">
      <Button
        className={` btn w-1/3 ${classes.checkoutButton}`}
        onClick={handleSubmit}
        label="الانتقال إلى الدفع"
      />
    </form>
  )
}

export default CheckoutForm
