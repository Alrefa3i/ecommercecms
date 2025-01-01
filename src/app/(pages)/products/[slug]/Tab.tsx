'use client'
import React from 'react'

import RichText from '../../../_components/RichText'
const Tab = ({ data, title }: { data: any; title: String }) => {
  return (
    <div>
      <div className="container mx-auto lg:max-w-screen-lg flex justify-between gap-6">
        <h2 id="rel" className="text-xl font-semibold text-logo-600">
          {title}
        </h2>
      </div>
      <RichText content={data} />
    </div>
  )
}

export default Tab
