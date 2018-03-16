import { mergeDeep } from 'immutable'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

const baseConfig = {
  port: 3000,
  secrets: {
    JWT_SECRET: 'worstkeptsecret'
  },
  db: {
    url: 'mongodb://localhost/exercises'
  },
  disableAuth: false,
  expireTime: '30d'
}

let envConfig = {}

switch (env) {
  case 'development':
  case 'dev':
    envConfig = require('./development').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./test').config
    break
  case 'prod':
  case 'production':
    envConfig = require('./production').config
    break
  default:
    envConfig = require('./development').config
}

export default mergeDeep(baseConfig, envConfig)
