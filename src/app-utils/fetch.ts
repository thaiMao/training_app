import * as R from 'ramda'
import { USER_URL, PUSH_MESSAGE_URL } from 'app-constants'

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
  return fetch(url, options).catch(err =>
    console.log('Fetch failed to api', err)
  )
}

const curriedInvokeFetch = R.curry(invokeFetch)
const fetchUser = curriedInvokeFetch(USER_URL)
const sendPushMessage = curriedInvokeFetch(PUSH_MESSAGE_URL)

export default {
  postJSONOptions,
  fetchUser,
  sendPushMessage
}
