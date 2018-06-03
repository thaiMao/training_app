import { curry } from 'ramda'
import { Protocol } from 'app-constants/helpers'

function endpoint(protocol: Protocol, domain: string, endpoint: string) {
  return `${protocol}://${domain}${endpoint}`
}

export const createEndpoint = curry(endpoint)

export function createMethod(fetched: Promise<Response>) {
  return function() {
    return fetched.then((res: any) => res.json()).catch(err => console.log(err))
  }
}
