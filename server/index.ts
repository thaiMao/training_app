/* eslint no-console:0 */

const Loadable = require('react-loadable')
const app = require('./server').default

const PORT = 8080

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
})
