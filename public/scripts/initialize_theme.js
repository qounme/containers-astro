// テーマの初期化
;(() => {
  const colorScheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const theme = localStorage.getItem('theme') || colorScheme

  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
})()
