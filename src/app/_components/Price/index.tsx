'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { RemoveFromCartButton } from '../RemoveFromCartButton'

import classes from './index.module.scss'

export const priceFromJSON = (priceJSON: string, quantity: number = 1, raw?: boolean): string => {
  if (!priceJSON) return '0'
  return `${parseFloat(priceJSON) * quantity}`
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { _price } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(`${_price}`),
    withQuantity: priceFromJSON(`${_price}`, quantity),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(`${_price}`),
      withQuantity: priceFromJSON(`${_price}`, quantity),
    })
  }, [_price, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={`${classes.price} w-full`}>
          <p>
            {price?.withQuantity} <small className="text-xs">ريال</small>
          </p>
          {quantity > 1 && (
            <small
              className={`${classes.priceBreakdown} text-center text-gray-500 block`}
            >{`${price.actualPrice} x ${quantity}`}</small>
          )}
        </div>
      )}
      {button && button === 'addToCart' && (
        <AddToCartButton product={product} className="btn bg-logo-500 text-white" />
      )}
      {button && button === 'removeFromCart' && <RemoveFromCartButton product={product} />}
    </div>
  )
}
