'use client'

import React, { Fragment, useEffect, useRef } from 'react'
import sha256 from 'crypto-js/sha256'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()
  const form = useRef<HTMLFormElement>(null)

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  const handleCheckout = () => {
    if (user) {
    } else {
      // redirect to login
    }
  }

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              {'لا يوجد منتجات في السلة.'}
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Link href={`/`}>
                  {' انقر هنا '}

                  {` للتسوق.`}
                </Link>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>تسجيل الدخول</Link>
                  {`لحفظ منتجاتك في السلة.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.items}>
              <div className={classes.itemsTotal}>
                {`هنالك  ${
                  cart?.items?.length == 1 ? 'منتج واحد' : cart?.items?.length + ' منتجات'
                } 
                 في سلة التسوق الخاصة بك.`}
                {!user && (
                  <Fragment>
                    {' '}
                    <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                    {` لحفظ منتجاتك في السلة.`}
                  </Fragment>
                )}
              </div>
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    quantity,
                    product,
                    product: { id, title, meta },
                  } = item

                  const isLast = index === (cart?.items?.length || 0) - 1

                  const metaImage = meta?.image

                  return (
                    <Fragment key={index}>
                      <div className={classes.row}>
                        <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                          {!metaImage && <span className={classes.placeholder}>No image</span>}
                          {metaImage && typeof metaImage !== 'string' && (
                            <Media
                              className={classes.media}
                              imgClassName={classes.image}
                              resource={metaImage}
                              fill
                            />
                          )}
                        </Link>
                        <div className={classes.rowContent}>
                          <h5 className={classes.title}>
                            <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                              {title}
                            </Link>
                          </h5>
                          <div className={classes.actions}>
                            <label>
                              الكمية &nbsp;
                              <input
                                type="number"
                                className={classes.quantity}
                                value={typeof quantity === 'number' ? quantity : ''}
                                onChange={e => {
                                  addItemToCart({
                                    product,
                                    quantity: Number(e.target.value),
                                  })
                                }}
                              />
                            </label>
                            <RemoveFromCartButton product={product} />
                          </div>
                          <Price product={product} button={false} quantity={quantity} />
                        </div>
                      </div>
                      {!isLast && <HR />}
                    </Fragment>
                  )
                }
                return null
              })}
              <HR />
              <h5 className={classes.cartTotal}>
                {` المجموع: `} <span>{cartTotal.raw.toFixed(2)}</span>
                <small>{' ر.ق '}</small>
              </h5>
              <Link href={'/checkout'} className="btn btn-outline lg:w-1/4 mb-4 ">
                الاستمرار للشراء
              </Link>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
