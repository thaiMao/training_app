import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import React from 'react'
import { hydrate, render } from 'react-dom'
import App from 'App'

const renderApp = async () => {
  await Loadable.preloadReady()

  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('App', () => {
    renderApp()
  })
}
