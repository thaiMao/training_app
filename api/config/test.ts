import * as sql from 'config/database/sql'

export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'yeezy350boost'
  },
  db: {
    url: 'mongodb://admin:admin@ds259258.mlab.com:59258/test0',
    sql
  }
}
