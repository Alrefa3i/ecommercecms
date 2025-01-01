import { PRODUCT } from './products'

export const ORDERS = `
  query Orders {
    Orders(limit: 300) {
      docs {
        id
        orderedBy
        SadadPaymentID
        
      }
    }
  }
`

export const ORDER = `
  query Order($id: String ) {
    Orders(where: { id: { equals: $id}}) {
      docs {
        id
        orderedBy
        SadadPaymentID
        items {
          product ${PRODUCT}
          title
          priceJSON
        }
        status
        location
      }
    }
  }
`
