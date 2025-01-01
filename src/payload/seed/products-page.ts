import type { Page } from '../payload-types'

export const productsPage: Omit<Page, 'updatedAt' | 'createdAt' | 'id'> = {
  title: 'المنتجات',
  slug: 'products',
  _status: 'published',
  meta: {
    title: 'تسوق منتجاتنا',
    description: 'تسوق كل شيء من السلع والخدمات إلى الأصول الرقمية والمحتوى المحمي.',
  },
  hero: {
    type: 'lowImpact',
    media: null,
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'جميع المنتجات',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'This page displays all or some of the products of your store ranging from goods and services to digital assets and gated content. Each product is complete with a dynamic page layout builder for a completely custom shopping experience that is under your full control.',
          },
        ],
      },
    ],
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'All products',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'The products below are displayed in an "Archive" layout building block which is an extremely powerful way to display docs on a page. It can be auto-populated by collection, filtered by category, and much more.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      limit: 10,
      categories: [],
    },
  ],
}
