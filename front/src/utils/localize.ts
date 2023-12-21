export const localizePath = (locale: string, defaultLocale: string, slug: string) => {
  if (slug?.startsWith('/')) {
    if (locale === defaultLocale) {
      return `${slug}`
    }
    return `${locale}/${slug}`
  }

  if (locale === defaultLocale) {
    return `/${slug}`
  }
  return `/${locale}/${slug}`
}
