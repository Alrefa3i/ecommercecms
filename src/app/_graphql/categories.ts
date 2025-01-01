export const PRODUCT_CATEGORIES = `categories {
  title
  id
  description
  breadcrumbs {
    id
    label
  }
  
}`

export const CATEGORIES = `
query Categories {
  Categories(limit: 300) {
    docs {
      title
      id
      description
      media {
      alt
      width
      height
      url
      }
      breadcrumbs {
        id
        label
      }
      
    }
  }
}`

export const CATEGORY = `
query Category($slug: String) {
  Categories(where: { slug: { equals: $slug}}, limit: 1) {
    docs {
      title
      id
      description
      media {
      alt
      width
      height
      url
      }
      breadcrumbs {
        id
        label
      }
      
    }
    ChildCategories: Categories(where: { parent: { equals: $slug}}) {
      docs {
          title
          id
          description
          media {
          alt
          width
          height
          url
          }
          breadcrumbs {
            id
            label
          }
          
        }
      }
  }
}`
