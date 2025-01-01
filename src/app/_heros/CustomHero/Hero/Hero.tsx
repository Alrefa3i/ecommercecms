'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import RichText from '../../../_components/RichText'

import './index.css'

const Hero = ({ richText, media, links }) => {
  return (
    <section className="min-w-full relative ">
      <div className="text-white absolute top-8 lg:top-36 left-1/2 translate-y-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-center gap-10">
        <h1 className="text-xl lg:text-5xl font-medium w-full text-center  ">
          <RichText content={richText} />
        </h1>
        <div className="lg:flex justify-center w-full hidden ">
          {/* search bar */}
          <div className="flex justify-center items-center gap-x-5 w-1/2 mx-auto">
            <input
              className="input-rounded input input-xl w-3/4 lg:w-1/2 text-sm lg:text-base "
              placeholder="كتاب , خدمة , قرطاسية"
            />
            <button className="btn btn-rounded bg-logo-500 text-logo-100 btn-lg hover:bg-logo-400 w-1/4">
              بحث
            </button>
          </div>
        </div>
      </div>
      <Media resource={media} className="w-full object-cover relative media_rapper" />
    </section>
  )
}

export default Hero
