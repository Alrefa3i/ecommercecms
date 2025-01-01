import React from 'react'
import Link from 'next/link'
import payload from 'payload'

import { Category, Product } from '../../../payload/payload-types'
import CategoriesClient from './Categories/Categories'

const Categories = ({ products }: { products: Product[] }) => {
  return (
    <div className=" pt-4 bg-logo-200 pb-12">
      <CategoriesClient products={products} />
    </div>
  )
}

export default Categories
