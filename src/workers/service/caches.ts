const CACHE_VERSION = 16
const CACHE_PREFIX = `TRA-v${CACHE_VERSION}`

export const ALL_CACHES: any = {
  fallbackImages: cacheName('FALLBACK_IMAGES'),
  prefetch: cacheName('PREFETCH'),
  fallback: cacheName('FALLBACK'),
  menu: cacheName('MENU')
}

function cacheName(name: string) {
  return `${CACHE_PREFIX}-${name}`
}

export const ALL_CACHES_LIST = Object.keys(ALL_CACHES).map(k => ALL_CACHES[k])

/**
 * Delete all caches other than those whose names are
 * provided in a list
 *
 * @public
 * @param {string[]} cacheNamesToKeep names of caches to keep
 * @return {Promise}
 */
export function removeUnusedCaches(cacheNamesToKeep: any) {
  return caches.keys().then(function(cacheNames): any {
    let toDelete = cacheNames.reduce((list: any, thisCache: any) => {
      if (cacheNamesToKeep.indexOf(thisCache) === -1)
        return list.concat(thisCache)
      return list
    }, [])
    if (toDelete.length > 0) {
      console.log('SW: Deleting old caches', toDelete)
      return Promise.all(toDelete.map((c: any) => caches.delete(c)))
    } else {
      return Promise.resolve()
    }
  })
}

////////////////////
// PREFETCH CACHE //
////////////////////
const ASSET_MANIFEST_URL = `${self.location.protocol}//${
  self.location.host
}/asset-manifest.json`
console.log('ASSET_MANIFEST_URL: ', ASSET_MANIFEST_URL)
const RESOURCES_TO_PRECACHE = [
  /^app.*\.js$/,
  /^main\.js$/,
  /^manifest\.js$/,
  /^app\.css$/,
  /^web-app-manifest\.json$/,
  /^img\/[\w0-9\-_]+.(png|jpg|gif|bmp)$/
]

/**
 * Check whether a given filename represents a resource
 * that should be precached
 *
 * @private
 * @param {string} fileName
 * @return {boolean}
 */
function _shouldPrecacheFile(fileName: string) {
  console.log('_shouldPrecacheFile: ', fileName)
  for (let i = 0; i < RESOURCES_TO_PRECACHE.length; i++) {
    if (RESOURCES_TO_PRECACHE[i].test(fileName)) return true
  }

  return false
}

export function precacheStaticAssets() {
  return fetch(ASSET_MANIFEST_URL)
    .then(response => response.json())
    .then(assetManifestJson => {
      // get the canonical names of the assets
      let assetNames = Object.keys(assetManifestJson)
        .filter(_shouldPrecacheFile) // figure out what to keep
        .map(k => {
          let raw = assetManifestJson[k]
          if (raw.startsWith('.')) {
            return raw.substring(1)
          } else {
            return `https://localhost:8080${raw}`
          }
        }) // get the full filenames
      // open (get or create) the prefetch cache
      assetNames.push(`https://localhost:8080/`)
      return caches.open(ALL_CACHES.prefetch).then(cache => {
        console.log('assetNames: ', assetNames, 'cache: ', cache)
        // add everything we're allowed to pre-cache in install event
        return cache.addAll(assetNames).catch(err => console.log(err, 'hey'))
      })
    })
}

export function precacheMenu() {
  // TODO import from fetch.ts
  const API_URL = 'http://localhost:3000'
  const USER_URL = `${API_URL}/user`

  const requestMenu = new Request(USER_URL)

  return caches.open(ALL_CACHES.menu).then(cache => {
    console.log('precacheMenu: ', requestMenu)
    // add menu pre-cache in install event
    return cache.add(requestMenu)
  })
}
