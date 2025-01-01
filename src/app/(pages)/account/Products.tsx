'use client'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../_components/Media'

const Products = ({ user }) => {
  return (
    <div className="lg:w-1/2">
      <h1 className="text-xl font-bold mb-1"> مشترياتي</h1>
      {user?.purchases?.length || 0 > 0 ? (
        <div className=" w-full overflow-x-auto">
          <table className="table-zebra table w-full">
            <thead>
              <tr className="w-full">
                <th>#</th>
                <th>رقم المنتج</th>
                <th>السعر</th>

                <th>عرض التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {user?.purchases?.map((purchase, index) => {
                return (
                  <tr key={index}>
                    <th>
                      {' '}
                      <Media resource={purchase.meta.image} className="size-10" />
                    </th>
                    <th>{purchase.id.slice(0, 6)}</th>
                    <td>{purchase._price}</td>

                    <td>
                      <Link prefetch={true} href={`/products/${purchase.slug}`}>
                        View product
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="">You have no purchases.</div>
      )}
    </div>
  )
}

export default Products
