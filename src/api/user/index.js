import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { signIn, signInWeb, auth, index, show, update, destroy } from './controller'
import { schema } from './model'
export User, { schema } from './model'

const router = new Router()
const { phoneNumber, email, userId, firstName, lastName } = schema.tree
const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
  console.log("trying to authenticate the token")
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

/**
 * @api {post} /user  user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam phoneNumber User's phoneNumber.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.post('/auth',
  body({ phoneNumber, email }),
  auth)


/**
 * @api {post} /user Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam phoneNumber User's phoneNumber.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.post('/sign-in',
  body({ phoneNumber }),
  signIn)

  /**
   * @api {post} /user Create user
   * @apiName CreateUser
   * @apiGroup User
   * @apiParam phoneNumber User's phoneNumber.
   * @apiSuccess {Object} user User's data.
   * @apiError {Object} 400 Some parameters may contain invalid values.
   * @apiError 404 User not found.
   */
  router.post('/sign-in-web',
    body({ phoneNumber, email, firstName, lastName }),
    signInWeb)

/**
 * @api {get} /user Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of users.
 * @apiSuccess {Object[]} rows List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', authenticateJWT,
  query(),
  index)

/**
 * @api {get} /user/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.get('/:id',authenticateJWT,
  show)

/**
 * @api {post} /user/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam phoneNumber User's phoneNumber.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.put('/:id',authenticateJWT,
  body({ phoneNumber, email, firstName, lastName }),
  update)

/**
 * @api {delete} /user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete('/:id',authenticateJWT,
  destroy)

export default router
