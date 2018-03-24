import config from 'config'

const { db: { sql: { url, dialect } } } = config

let sequelizeConfig: any = { url, dialect }
sequelizeConfig.production = sequelizeConfig
sequelizeConfig.test = sequelizeConfig
sequelizeConfig.development = sequelizeConfig

export default sequelizeConfig
