self.addEventListener('install', event => {
  console.log('install service worker')
})

self.addEventListener('activate', event => {
  console.log('activate service worker')
})

self.addEventListener('fetch', event => {
  console.log('intercept a network request')
})
