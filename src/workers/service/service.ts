import 'worker-loader?name=./service-worker.js!./service-worker.js'

async function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Service worker exists in navigator')
      let registration = await navigator.serviceWorker.register(
        './service-worker.js'
      )
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('No such thing as serviceWorker')
  }
}

export default setupServiceWorker
