import mongoose from 'mongoose'
;(mongoose as any).Promise = global.Promise

const connect = (config: any) => {
  return mongoose.connect(config.db.url)
}

export default connect
