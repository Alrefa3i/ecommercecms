'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Category, Product } from '../../../../payload/payload-types'
import { Card } from '../../Card'

export const CardContainer: React.FC<{ slug: String; title: String; products: Product[] }> = ({
  products,
  title,
  slug,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="container mx-auto lg:max-w-screen-lg flex justify-between">
        <h2 className="text-xl font-semibold text-logo-600">{title}</h2>
        <Link href={`/${slug}`} className="btn bg-logo-600 text-white ">
          عرض الكل
        </Link>
      </div>
      <div className="flex justify-start container lg:max-w-screen-lg mx-auto flex-wrap lg:flex-nowrap gap-6  ">
        {products.map(book => (
          <Card
            alignItems="center"
            showCategories={false}
            className="w-40 text-center hover:shadow-sm transition-all mx-auto lg:mx-0"
            key={book.id}
            doc={book}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  products: Product[]
}
const CategoriesClient = ({ products }: Props) => {
  const [books, setBooks] = useState<Product[]>([])
  const [tools, setTools] = useState<Product[]>([])
  const [services, setServices] = useState<Product[]>([])
  useEffect(() => {
    const books = products
      .filter(product => (product.categories[0] as Category).title === 'الكتب')
      .slice(0, 4)
    const tools = products
      .filter(product => (product.categories[0] as Category).title === 'القرطاسية')
      .slice(0, 4)
    const services = products
      .filter(product => (product.categories[0] as Category).title === 'الخدمات')
      .slice(0, 4)
    setBooks(books)
    setTools(tools)
    setServices(services)
  }, [products])

  return (
    <div className="flex flex-col gap-8 mt-10">
      <CardContainer slug="books" title="الكتب" products={books} />
      <div className="divider"></div>
      <CardContainer slug="tools" title="القرطاسية" products={tools} />
      <div className="divider"></div>
      <CardContainer slug="services" title="الخدمات" products={services} />
    </div>
  )
}

export default CategoriesClient
