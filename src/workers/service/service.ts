import 'worker-loader?name=./service-worker.js!./service-worker.js'
import VAPID from '../../../private/vapid.json'
import urlBase64ToUintArray from './web-push'
import { PUSH_SUBSCRIPTION_URL } from 'app-constants'

let subscribeOptions = {
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUintArray(VAPID.publicKey)
}

async function setupServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      let registration = await navigator.serviceWorker.register(
        './service-worker.js'
      )

      let pushSubscription = await registration.pushManager.subscribe(
        subscribeOptions
      )

      return fetch('https://localhost:3100/push-subscription', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(pushSubscription)
      }).then(() => null)
    } catch (error) {
      console.log('Front end - Error posting push subscription')
    }
  } else {
    console.log('No such thing as serviceWorker')
  }
}

export default setupServiceWorker
