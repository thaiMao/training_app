import Sequelize from 'sequelize'
import config from 'config'

const {
  db: {
    sql: { url, options }
  }
} = config

const database = new Sequelize(url, options)

export default database
