import * as R from 'ramda'

const API_URL = 'http://localhost:3000'
const USER_URL = `${API_URL}/user`

function setContent(type: string) {
  return {
    'content-type': type
  }
}

function setFetchOptions(
  method: 'GET' | 'POST',
  headers: HeadersInit,
  body: BodyInit
) {
  return R.mergeAll([{ method }, { headers }, { body }])
}

const curriedSetFetchOptions = R.curry(setFetchOptions)
const postOptions = curriedSetFetchOptions('POST')
const postJSONOptions = postOptions(setContent('application/json'))

function invokeFetch(url: string, options: RequestInit) {
  return fetch(url, options)
}

const curriedInvokeFetch = R.curry(invokeFetch)
const fetchUser = curriedInvokeFetch(USER_URL)

export default {
  postJSONOptions,
  fetchUser
}
