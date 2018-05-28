export { default as Advertiser } from './advertiser'
export { default as PushSubscription } from './push-subscription'

import * as fs from 'fs'
import * as path from 'path'
import Sequelize from 'sequelize'

function removeNonModelFiles(file: any) {
  return file.indexOf('.') !== 0 && file !== 'index.ts'
}

function getDatabaseModels(sequelize: any) {
  let db: any = {}
  let modelFiles = fs
    .readdirSync('api/db/sql/models') //TODO set programatically
    .filter(removeNonModelFiles)

  modelFiles.forEach(file => {
    let model = sequelize.import(path.join('..', 'db/sql/models', file)) //TODO set programatically
    db[model.name] = model
  })

  Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
    db[modelName].sync()
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize
  return db
}

export default getDatabaseModels
