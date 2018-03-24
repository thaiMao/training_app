import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const connect = (config: any) => {
  return mongoose.connect(config.db.url, {
    useMongoClient: true
  })
}

export default connect
