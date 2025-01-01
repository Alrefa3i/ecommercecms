import payload from 'payload'
import type { FieldHook } from 'payload/types'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const isArabic = (str: string): boolean => /[\u0600-\u06FF\u0750-\u077F]/.test(str)

const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (typeof value === 'string' && isArabic(value)) {
      return format(Math.random().toString(36)).substring(1)
    }
    payload.logger.info('formatSlug', { operation, value, originalDoc, data })

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }

export default formatSlug
