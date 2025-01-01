import React, { Fragment } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Message } from '../../_components/Message'
import { Price } from '../../_components/Price'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    title,
    categories,
    author,
    SKU,
    publisher,
    meta: { image: metaImage, description } = {},
  } = product

  return (
    <Fragment>
      <Gutter className=" flex flex-col items-center lg:items-start lg:flex-row md:flex-row justify-between py-8 gap-4  ">
        <div className={'w-full lg:w-1/3'}>
          <div className={`w-full`}>
            {!metaImage && <div className={classes.placeholder}>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName={`mx-auto`} resource={metaImage} />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            <RichText content={metaImage.caption} className={classes.caption} />
          )}
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4 justify-center  lg:justify-start lg:gap-0">
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
          <h1 className={'text-logo-500 text-2xl font-bold  '}>{title}</h1>

          <div className="w-2/3 align-middle">
            <span className="text-logo-400 p-0 m-0 text-lg  ">عن العنصر</span>

            {typeof categories[0] === 'object' && categories[0]?.title === 'الكتب' && (
              <>
                {' '}
                <p className={classes.description}>المؤلّف : {author}</p>
                <p className={classes.description}>الناشر: {publisher}</p>
                <p className={classes.description}>{SKU} : SKU</p>
              </>
            )}
            {typeof categories[0] === 'object' && categories[0]?.title === 'القرطاسية' && (
              <> {/*  */}</>
            )}
            {typeof categories[0] === 'object' && categories[0]?.title === 'الخدمات' && (
              <> {/*  */}</>
            )}

            <p className={classes.description}>
              وصف العنصر : {`${description ? `${description.slice(0, 100)}... ` : ''} `}
            </p>
          </div>
        </div>
        <div className="w-1/2 lg:w-1/4  flex flex-col justify-center items-center gap-4 py-4">
          <Price product={product} button={false} />
          <AddToCartButton product={product} className={`btn bg-logo-400 `} />
        </div>
      </Gutter>
    </Fragment>
  )
}
