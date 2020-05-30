import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, login } from './controller'
import { schema } from './model'
export User, { schema } from './model'

const router = new Router()
const { phoneNumber, id } = schema.tree


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
  create)

/**
 * @api {get} /user Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of users.
 * @apiSuccess {Object[]} rows List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
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
router.get('/:id',
  show)

/**
 * @api {put} /user/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam phoneNumber User's phoneNumber.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.put('/:id',
  body({ phoneNumber }),
  update)

/**
 * @api {delete} /user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  destroy)

export default router
