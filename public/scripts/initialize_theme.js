/**
 * (c) Fumiya Takaki
 *
 * Licensed under MIT.
 *
 * @license MIT
 */
;(() => {
  const colorScheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const theme = document.cookie.match(/theme=(light|dark)(;|$)/)?.[1] || colorScheme

  document.documentElement.setAttribute('data-theme', theme)
  document.cookie = `theme=${encodeURIComponent(theme)};max-age=${60 * 60 * 24 * 365};path=/`
})()
