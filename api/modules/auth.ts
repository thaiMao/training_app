import config from 'config'
import jwt from 'express-jwt'

const checkToken = jwt({ secret: config.secrets.JWT_SECRET })

export function protect() {
  return checkToken
}
