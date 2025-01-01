'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'

type Props = {
  richText: { [k: string]: unknown }[]
  media?: string | Media
  links?: any
}
const BookHero = ({ richText, media, links }: Props) => {
  let text = richText[0].children[0].text.split('\n')

  return (
    <div className="container mx-auto max-w-screen-lg flex justify-center items-center ">
      <div className="w-2/3 flex flex-col justify-center items-center h-full lg:items-start gap-3">
        <h1 className="text-5xl font-bold lg:text-3xl">{text[0]}</h1>
        <h3 className="text-2xl font-semibold lg:text-xl">{text[1]}</h3>
      </div>
      <div className="w-1/3 hidden lg:block">
        <Image
          width={320}
          height={320}
          unoptimized
          src="/assets/images/Books/booksHero.png"
          alt=""
        />
      </div>
    </div>
  )
}
export default BookHero
