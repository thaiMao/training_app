import config from 'config'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import { User } from 'resources'

const checkToken = expressJwt({ secret: config.secrets.JWT_SECRET })

export const signin = (req: any, res: any, next: any) => {
  const token = signToken(req.user)
  res.json({ token: token })
}

export const decodeToken = () => (req: any, res: any, next: any) => {
  if (config.disableAuth) {
    return next()
  }

  if (req.query && req.query.hasOwnProperty()) {
    req.headers.authorization = ''
  }

  checkToken(req, res, next)
}

export const getFreshUser = () => (req: any, res: any, next: any) => {
  return User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        res.status(401).send('Unauthorized')
      } else {
        // update req.user with fresh user from
        // stale token data
        req.user = user
        next()
      }
    })
    .catch(error => next(error))
}

export const verifyUser = () => (req: any, res: any, next: any) => {
  const username = req.body.username
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

  // look user up in the DB so we can check
  // if the passwords match for the username
  User.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        res.status(401).send('No user with the given username')
      } else {
        // checking the passwords here
        if (!(user as any).authenticate(password)) {
          res.status(401).send('Wrong password')
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user
          next()
        }
      }
    })
    .catch((error: any) => next(error))
}

export const signToken = (id: any) =>
  jwt.sign({ id }, config.secrets.JWT_SECRET, { expiresIn: config.expireTime })

export function protect() {
  return checkToken
}
