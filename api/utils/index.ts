import { DEVELOPMENT_URL, PRODUCTION_URL } from 'constant'

function isProd() {
  return (
    process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'
  )
}

function getCorsOptions(origin: string) {
  return Object.freeze({
    origin,
    optionsSuccessStatus: 200
  })
}

function getUrl(isProd: boolean): string {
  return isProd ? PRODUCTION_URL : DEVELOPMENT_URL
}

export default {
  getCorsOptions,
  getUrl,
  isProd
}
