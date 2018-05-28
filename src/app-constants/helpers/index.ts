import * as R from 'ramda'

export const API = {
  domain: 'localhost', //TODO conditional dev or prod
  port: 3100,
  protocol: 'https'
}

export enum Protocol {
  http = 'http',
  https = 'https'
}

function createUrl(
  protocol: Protocol,
  port: number,
  domain: string,
  endpoint: string
): string {
  return `${protocol}://${domain}:${port}${endpoint}`
}

export const createAPIEndpoint = R.curry(createUrl)(
  Protocol.https,
  API.port,
  API.domain
)
