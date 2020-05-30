import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

export const login = ({ user }, res, next) =>{
console.log(user)
  sign(user.phoneNumber)
    .then((token) => ({ token, user: user.view(true) }))
    .then(success(res, 201))
    .catch(next)
  }

  export const create = ({ bodymen: { body } }, res, next) =>
    Test.create(body)
      .then((test) => test.view(true))
      .then(success(res, 201))
      .catch((err) => {
        /* istanbul ignore else */
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).json({
            valid: false,
            param: 'phone',
            message: 'Phone number already registered'
          })
        } else {
          next(err)
        }
      })
