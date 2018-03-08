import config from '../../../config'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export const removeModel = (modelName: any) => {
  const model = mongoose.model(modelName)
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve()
    }
    model.remove((err: any) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export const dropDb = () => {
  return mongoose
    .connect(config.db.url, {
      useMongoClient: true
    })
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
}
