import expressJwt from 'express-jwt'

const jwtSecret = 'worstkeptsecret'

const checkToken = expressJwt({ secret: jwtSecret })

export function protect() {
  return {}
}
