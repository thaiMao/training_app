///<reference path="typings.d.ts" />
/* eslint no-console:0 */
import express from 'express'
import { Capture } from 'react-loadable'
import morgan from 'morgan'
import helmet from 'helmet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { getBundles } from 'react-loadable/webpack'
import App from 'App'
import stats from '../dist/react-loadable.json'

const app = express()

app.use(helmet())
app.use('/', morgan('tiny'))
app.use(express.static('dist'))

app.use((req, res) => {
  console.log('request url: ', req.url)
  let modules: any = []
  const context: any = {}
  const html = ReactDOMServer.renderToString(
    <Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Capture>
  )

  console.log('modules: ', modules)

  const bundles = getBundles(stats, modules)

  if (context.url) {
    res.redirect(301, context.url)
  }

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
      <script type="text/javascript" src="main.bundle.js"></script></body>
    </body>
    
    </html>
  `)
  res.end()
})

export default app
