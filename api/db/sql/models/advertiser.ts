import database from './db'
import Sequelize from 'sequelize'

const Advertiser = database.define('Advertiser', {
  name: Sequelize.TEXT,
  age: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

export default Advertiser
