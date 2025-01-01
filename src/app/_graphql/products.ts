import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { PRODUCT_CATEGORIES } from './categories'
import { META } from './meta'

export const PRODUCTS = `
  query Products {
    Products(limit: 100) {
      docs {
        id
        title
        _price
        SKU
        author
        publisher
        ${PRODUCT_CATEGORIES}
        ${META}
        slug
      }
    }
  }
`
export const SAMPLE_PRODUCTS = `query GetProductsByCategories {
  Products(where: { categories: { in: ["671cc09491acdb67d00ba75b", "671cc08291acdb67d00ba747", "671cc06091acdb67d00ba733"] } }) {
    docs {
        id
        title
        _price
        SKU
        author
        publisher
        ${PRODUCT_CATEGORIES}
        ${META}
        slug
      }
   }
}
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        _price
        SKU
        author
        publisher
        ${PRODUCT_CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
     

      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
