/* eslint-disable no-alert, no-console, no-restricted-globals, no-debugger */
import {
  ALL_CACHES,
  ALL_CACHES_LIST,
  precacheStaticAssets,
  precacheMenu,
  removeUnusedCaches
} from './caches.ts'

const currentCache = ALL_CACHES.prefetch

const INDEX_HTML_PATH = '/'
const INDEX_HTML_URL = new URL(INDEX_HTML_PATH, self.location).toString()

// TODO setup and use a CDN url
const userFallbackImage = 'https://localhost:8080/dist/images/fallback.png'

self.addEventListener('install', event => {
  console.log('install service worker')

  event.waitUntil(
    caches.open(currentCache).then(() =>
      Promise.all([
        precacheMenu(),
        // cache.add(userFallbackImage),
        precacheStaticAssets()
      ])
    )
  )
  // event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  console.log('activate service worker')
  // self.clients.claim()
  // TODO remove any caches that retired service worker was using
  event.waitUntil(removeUnusedCaches(ALL_CACHES_LIST))
})

function fetchImageOrFallback(fetchEvent) {
  return fetch(fetchEvent.request, {
    mode: 'no-cors',
    credentials: 'omit' // in case cors wild card header
  })
    .then(response => {
      if (!response.ok) {
        return caches.match(userFallbackImage, {
          currentName: currentCache
        })
      }
      return response
    })
    .catch(() => caches.match(userFallbackImage, { currentName: currentCache }))
}

self.addEventListener('fetch', event => {
  console.log('intercept a network request')

  const acceptHeader = event.request.headers.get('accept')
  const requestUrl = new URL(event.request.url)
  const { pathname } = requestUrl

  const isHTMLRequest =
    event.request.headers.get('accept').indexOf('text/html') === 1
  const isLocal = new URL(event.request.url).origin === location.origin

  if (isHTMLRequest && isLocal) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(INDEX_HTML_URL, {
          cacheName: ALL_CACHES.prefetch
        })
      )
    )
    return
  }

  // Handle app.js and app.manifest.bundle

  event.respondWith(
    caches
      .match(pathname, { cacheName: ALL_CACHES.prefetch })
      .then(response => {
        if (response) return response

        if (acceptHeader.indexOf('image/*') >= 0) {
          if (requestUrl.pathname.indexOf('/images/') === 0) {
            return fetchImageOrFallback(event)
          }
        }

        caches.open(currentCache).then(cache => {
          console.log('Hey: ', cache)
        })

        return fetch(event.request)
      })
      .catch(err => console.log('Fetch Error: ', err))
  )
})