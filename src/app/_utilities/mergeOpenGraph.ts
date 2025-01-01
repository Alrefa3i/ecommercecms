import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Baitalelm',
  title: 'مكتبة بيت العلم',
  description:
    'فريق متكامل في الخدمات الطباعية والحلول التكنولوجية, والمواد التعليمية. لنضع كل خبراتنا العلمية والتربوية والإنسانية في نشر العلم والكتاب بين فئات المجتمع كافة.',
  images: [
    {
      url: '/logoFull.webp',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
