///<reference path="typings.d.ts" />
import chalk from 'chalk'
import config from 'config'
import { connectNoSqlDb } from 'db'
import express from 'express'
import { graphQLRouter } from 'routes/graphql'
import { graphiqlExpress } from 'apollo-server-express'
import { createServer } from 'https'
import { setupMiddleware } from 'middleware'
import { protect, errorHandler } from 'modules'
import * as routes from 'routes'
import { setupRouters, setupRoutes } from 'routes/setup'
import Db from 'db/sql/db-push'
import NotificationManager from 'notification'

// TODO Import getDevelopmentCertificate dynamically
import getDevelopmentCertificate from 'devcert-with-localhost'
const devCertOptions = { installCertutil: false }

function startAndListen(app: any, port: number) {
  return new Promise(resolve => {
    app.listen(port, () => {
      console.log(`API Server is listening on port ${port}`)
      resolve()
    })
  })
}

function createApp() {
  return express()
}

function setupErrorHandler(app: any) {
  app.use(errorHandler)
  return app
}

async function getDevelopmentSSL() {
  try {
    return await getDevelopmentCertificate('Training App', devCertOptions)
  } catch (err) {
    console.log('Failed to get dev cert: ', err)
  }
}

function createHttpsServer(app: any, ssl: any) {
  return createServer(ssl, app)
}

class ApiServer {
  static port: number = 3100
  app: any
  db: any
  public httpsServer: any
  notifications: any = null

  constructor() {
    debugger
    this.db = new Db()
  }

  private startApi() {
    this.app = createApp()
    setupMiddleware(this.app)
    connectNoSqlDb(config)
    setupErrorHandler(this.app)
    setupRouters(this.app)
    setupRoutes(this)
    this.createServer()
  }

  private createServer() {
    getDevelopmentCertificate('Trainingaapp', devCertOptions)
      .then((ssl: any) => {
        this.httpsServer = createHttpsServer(this.app, ssl)
      })
      .catch((err: any) => console.log('dev cert failed:', err))
  }

  public listen() {
    startAndListen(this.httpsServer, ApiServer.port)
  }

  public async start() {
    debugger
    await this.db.start()
    try {
      this.notifications = new NotificationManager(this)
    } catch (err) {
      console.log('Some error', err)
    }

    await this.startApi()
    process.stdout.write(chalk.magenta('💻  API has started!'))
  }
}

export default ApiServer
