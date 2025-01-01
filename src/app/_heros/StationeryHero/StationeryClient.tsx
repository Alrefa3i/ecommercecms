'use client'

import React from 'react'
import Image from 'next/image'

const StationeryClient = ({ richText }: { richText: any[] }) => {
  let text = richText[0].children[0].text.split('\n')

  return (
    <>
      <div className="container mx-auto max-w-screen-lg flex justify-center items-center text-center ">
        <div className="w-2/3 flex flex-col justify-center items-center h-full lg:items-start gap-3">
          <h1 className="text-5xl font-bold lg:text-3xl">{text[0]}</h1>
          <h3 className="text-2xl font-semibold lg:text-xl">{text[1]}</h3>
        </div>
        <div className="w-1/3 hidden lg:flex lg:flex-col h-full relative justify-center gap-4">
          <Image
            unoptimized
            width={150}
            height={150}
            src="/assets/images/Stationery/tools1.png"
            alt=""
          />
          <Image
            unoptimized
            className="self-center rotate-12"
            width={150}
            height={150}
            src="/assets/images/Stationery/tools3.png"
            alt=""
          />
          <Image
            unoptimized
            loading="lazy"
            className="self-end absolute mr-4"
            width={200}
            height={200}
            src="/assets/images/Stationery/tools2.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default StationeryClient
