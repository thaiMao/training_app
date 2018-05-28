import chalk from 'chalk'
import * as path from 'path'
const webpush = require('web-push')

let VAPID

if (process.env.VAPID) {
  VAPID = JSON.parse(process.env.VAPID)
} else {
  let pth = path.join('..', 'private', 'vapid')
  try {
    //VAPID = require(pth) TODO not working
    VAPID = require('../private/vapid')
  } catch (error) {
    process.stderr.write(
      chalk.bgRed.white('ERROR!: VAPID keys could not be loaded')
    )
    process.stderr.write(
      chalk.red(
        `  ↪ Expected to find keys in ${pth}.json\n    Make sure to run `
      ) +
        chalk.yellow('npm run prepvapid') +
        chalk.red(' which should create this file for you')
    )
    process.exit(1)
  }
}

let PushSubscription: any = null

webpush.setVapidDetails(
  'mailto:maot.tm@gmail.com',
  VAPID.publicKey,
  VAPID.privateKey
)

class NotificationManager {
  api: any

  constructor(api: any) {
    this.api = api
    PushSubscription = this.api.db.models['PushSubscription']
  }

  push({ title, body }: any) {
    return PushSubscription.findAll()
      .then((subscriptions: any) => {
        subscriptions.forEach((subs: any) => {
          let record = subs.get({ plain: true })
          record.keys = JSON.parse(record.keys)

          return webpush
            .sendNotification(
              record,
              JSON.stringify({
                notification: {
                  title,
                  body
                }
              })
            )
            .catch((err: any) => {
              if (err.statusCode === 410) {
                console.log('deleteSubscriptionFromDatabase ', subs.id)
                subs.destroy()
              } else {
                console.log('Subscription is no longer valid: ', err)
              }
            })
        })
      })
      .then(() => this)
  }
  pushWithDelay(delay: any, info: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        let pushPromise = this.push(info)
        resolve(pushPromise)
      }, delay)
    })
  }
}

export default NotificationManager
