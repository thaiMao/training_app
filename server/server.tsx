/* eslint no-console:0 */
import express from 'express'
import { Capture } from 'react-loadable'
import morgan from 'morgan'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { getBundles } from 'react-loadable/webpack'
import App from 'App'
import stats from 'dist/loadable.json'
import store, { sagaMiddleware } from 'store'
import { fetchPerson } from 'actions/data'
import { TYPES } from 'actions/types'
import serialize from 'serialize-javascript'
//import qs from 'qs'
// import xssFilters from 'xss-filters'

const app = express()
app.use(helmet())
app.use('/', morgan('tiny'))
app.use(express.static('dist'))
debugger
app.use((req: any, res: any) => {
  //const params: any = qs.parse(req.query)
  debugger
  sagaMiddleware
    .run(fetchPerson, TYPES.FETCH_STAR_WARS_REQUEST)
    .done.then(() => {
      const preloadedState = store.getState()
      debugger

      let modules: any = []
      const context: any = {}
      const html = renderToString(
        <Capture report={(moduleName: any) => modules.push(moduleName)}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Capture>
      )
      debugger
      const bundles = getBundles(stats, modules)
      if ((context as any).url) {
        res.redirect(301, (context as any).url)
      }
      debugger
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="utf-8" />
          <title>Training App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="theme-color" content="#2d89ef" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link href="web-app-manifest.json" rel="manifest" />
          <link href="asset-manifest.json" rel="manifest" />
        </head>
        
        <body>
          <div id="app">
            ${html}
          </div>
          <script type="text/javascript" src="manifest.bundle.js"></script>
          ${bundles
            .map((bundle: any) => `<script src="${bundle.file}"></script>`)
            .join('\n')}
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
          </script>
          <script type="text/javascript" src="main.bundle.js"></script></body>
        </body>
        
        </html>
      `)
      res.end()
    })
    .catch((err: any) => {
      debugger
    })
})

export default app
