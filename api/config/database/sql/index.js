const Sequelize = require('sequelize')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

const getUrl = e => {
  if (e === 'test' || e === 'testing') {
    return 'postgres://dimyihln:una8-JtjtmwLTPVJUQf_k_XLNSecb4mY@horton.elephantsql.com:5432/dimyihln'
  } else if (e === 'dev' || e === 'development') {
    return 'postgres://pfamegvv:erxqOPc5RdMIgTnBqAQFM8DtTXRAfn4p@horton.elephantsql.com:5432/pfamegvv'
  } else if (e === 'prod' || e === 'production') {
    return 'prod'
  }
  return null
}

module.exports = {
  url: getUrl(env),
  options: {
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: Sequelize.Op
  },
  dialect: 'postgres'
}
