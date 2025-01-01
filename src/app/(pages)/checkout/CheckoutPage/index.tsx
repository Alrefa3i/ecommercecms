'use client'

import React, { Fragment, useEffect } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import Box from '@mui/material/Box'
// import  Button  from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { useTheme } from '../../../_providers/Theme'
import cssVariables from '../../../cssVariables'
import { CheckoutForm } from '../CheckoutForm'

import classes from './index.module.scss'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [clientSecret, setClientSecret] = React.useState(true)
  const { theme } = useTheme()
  const [location, setLocation] = React.useState<string | null>(null)

  const { cart, cartIsEmpty, cartTotal } = useCart()

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  if (!user) return null

  return (
    <div className="flex flex-col gap-4">
      {cartIsEmpty && (
        <div>
          {'سلة التسوق الخاصة بك '}
          <Link href="/cart">فارغة</Link>
          {'.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>هل تريد متابعة التسوق؟</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          {cart?.items?.map((item, index) => {
            if (typeof item.product === 'object') {
              const {
                quantity,
                product,
                product: { id, stripeProductID, title, meta },
              } = item

              if (!quantity) return null

              const isLast = index === (cart?.items?.length || 0) - 1

              const metaImage = meta?.image

              return (
                <Fragment key={index}>
                  <div className={classes.row}>
                    <div className={classes.mediaWrapper}>
                      {!metaImage && <span className={classes.placeholder}>No image</span>}
                      {metaImage && typeof metaImage !== 'string' && (
                        <Media
                          className={classes.media}
                          imgClassName={classes.image}
                          resource={metaImage}
                          fill
                        />
                      )}
                    </div>
                    <div className={classes.rowContent}>
                      <h6 className={classes.title}>{title}</h6>
                      <Price product={product} button={false} quantity={quantity} />
                    </div>
                  </div>
                  {!isLast && <HR />}
                </Fragment>
              )
            }
            return null
          })}
          <div className={classes.orderTotal}>{`Order total: ${cartTotal.raw}`}</div>
        </div>
      )}

      {/* location filed */}
      <div className="form-control relative w-3/4 lg:w-1/2">
        <span className="absolute inset-y-0 left-4 inline-flex items-center">
          <AddLocationIcon />
        </span>
        <textarea
          rows={3}
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="input input-lg max-w-full"
          placeholder="ادخل عنوان الطلب"
        />
      </div>
      
      {!location &&  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            gap: 4,
            boxShadow: 24,
          }}
        >
          <Typography id="modal-modal-title" className="text-center" variant="h6" component="h2">
            سيتم اكمال الطلب بدون عنوان {' "خدمة اونلاين" '}
          </Typography>
        </Box>
      </Modal>}

      {!clientSecret && !error && (
        <div className={classes.loading}>
          <LoadingShimmer number={2} />
        </div>
      )}
      {!clientSecret && error && (
        <div className={classes.error}>
          <p>{`Error: ${error}`}</p>
          <Button label="Back to cart" href="/cart" appearance="secondary" />
        </div>
      )}
      {clientSecret && (
        <Fragment>
          {error && <p>{`Error: ${error}`}</p>}
          <CheckoutForm modalState={setOpen} location={location} />
        </Fragment>
      )}
    </div>
  )
}
