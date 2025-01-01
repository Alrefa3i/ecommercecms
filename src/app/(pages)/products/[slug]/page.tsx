import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { title } from 'process'

import { Media as md, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { CardContainer } from '../../../_components/Categories/Categories/Categories'
import { HR } from '../../../_components/HR'
import { Media } from '../../../_components/Media'
import { PaywallBlocks } from '../../../_components/PaywallBlocks'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'
import Tab from './Tab'
// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Product({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()
  let product: ProductType | null = null

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!product) {
    notFound()
  }

  const { layout, relatedProducts } = product

  let cards = relatedProducts.map(item => {
    let iteme = item as any
    return {
      id: iteme.id,
      slug: iteme.slug,
      title: iteme.title,
      image: iteme.meta.image,
    } as {
      id: any
      slug: string
      title: string
      image: md
    }
  })
  let lay = layout as any

  return (
    <div className="bg-logo-200">
      <ProductHero product={product} />

      <div className="container lg:max-w-screen-lg mx-auto ">
        <div className="container mx-auto flex flex-col gap-10 mt-1 ">
          <Tab data={lay[0].columns[0].richText} title={'الوصف'} />

          {lay[0].columns[1] && (
            <>
              {' '}
              <HR />
              <Tab data={lay[0].columns[1].richText} title={'تفاصيل المنتج'} />
            </>
          )}
          <HR />
          <div className="container mx-auto flex flex-col gap-4">
            <div className="container mx-auto lg:max-w-screen-lg flex justify-between">
              <h2 id="rel" className="text-xl font-semibold text-logo-600">
                {'المنتجات المشابهة'}
              </h2>
              <Link href={`/books`} className="btn  bg-logo-600 text-white ">
                عرض الكل
              </Link>
            </div>
            <div className="flex justify-start container lg:max-w-screen-lg mx-auto flex-wrap gap-6">
              {cards.map((card, index) => {
                return (
                  <div className="w-40 text-center hover:shadow-sm transition-all flex flex-col gap-4">
                    <Media resource={card.image} />
                    <h1 className="text-logo-400">{card.title}</h1>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: ProductType | null = null

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: product })
}
