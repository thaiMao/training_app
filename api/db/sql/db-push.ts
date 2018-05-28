import chalk from 'chalk'
import fs from 'fs'
import * as path from 'path'
import Sequelize from 'sequelize'
import database from 'db/sql/new-database'
import getDatabaseModels from 'db/sql/models'

const PROJECT_ROOT_PATH = path.join(__dirname, '..', '..')

function getNewDb(resolve: any, reject: any): void {
  let sequelize = database
  resolve(sequelize)
}

function handleSyncError(err: any) {
  process.stderr.write('Problem synchronizing database', err)
}

class PushDb {
  private open() {
    return new Promise(getNewDb)
  }

  private _models: any = null
  db: any

  get models(): any {
    if (this._models === null) {
      this._models = getDatabaseModels(this.db)
    }
    return this._models
  }

  public transaction(callback: any) {
    return this.db.transaction(callback)
  }

  public async start() {
    this.db = await this.connectToDatabase()
    process.stdout.write(chalk.blue('📦  Updating database'))
    await this.db.sync({ force: true }).catch(handleSyncError)
    process.stdout.write(chalk.blue('   Database update complete ✅'))
  }

  private async connectToDatabase() {
    const conn: any = await this.open()
    await conn.authenticate()
    try {
      return conn
    } catch (err) {
      process.stderr.write(
        chalk.red(' - Problem authenticating to database\n', err)
      )
      process.exit(1)
    }
  }
}

export default PushDb
