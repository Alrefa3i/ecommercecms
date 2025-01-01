'use client'
import { useState } from 'react'

import { Category } from '../../../payload/payload-types'
import { CollectionArchive } from '../../_components/CollectionArchive'
import RichText from '../../_components/RichText'
import { ArchiveBlockProps } from './types'
const collectAllCategories = (products: any) => {
  const categories = products.map(product => product['value'].categories[1])
  return categories
}
const ArchiveClient: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    selectedDocs,
    categories,
  } = props

  const [serach, setSearch] = useState('')

  return (
    <div className="w-full bg-logo-200">
      <div className="flex justify-center  py-5">
        <input
          type="text"
          className="input w-1/3 p-2 "
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
          value={serach}
        />
      </div>

      <div id={`block-${id}`}>
        {introContent && <RichText content={introContent} />}
        <CollectionArchive
          populateBy={populateBy}
          relationTo={relationTo}
          populatedDocs={populatedDocs}
          populatedDocsTotal={populatedDocsTotal}
          selectedDocs={selectedDocs}
          categories={categories}
          limit={limit}
          sort="-publishedOn"
          showPageRange={false}
        />
      </div>
    </div>
  )
}

export default ArchiveClient
