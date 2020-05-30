import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { login, create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Login, { schema } from './model'

const router = new Router()
const { phoneNumber } = schema.tree

/**
 * @api {post} /login login
 * @apiName Login
 * @apiGroup Login
 * @apiParam phoneNumber Login's phoneNumber.
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 */
router.post('/login',
  body({ phoneNumber }),
  login)

/**
 * @api {post} /login Create login
 * @apiName CreateLogin
 * @apiGroup Login
 * @apiParam phoneNumber Login's phoneNumber.
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 */
router.post('/',
  body({ phoneNumber }),
  create)

/**
 * @api {get} /login Retrieve logins
 * @apiName RetrieveLogins
 * @apiGroup Login
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of logins.
 * @apiSuccess {Object[]} rows List of logins.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /login/:id Retrieve login
 * @apiName RetrieveLogin
 * @apiGroup Login
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /login/:id Update login
 * @apiName UpdateLogin
 * @apiGroup Login
 * @apiParam phoneNumber Login's phoneNumber.
 * @apiSuccess {Object} login Login's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Login not found.
 */
router.put('/:id',
  body({ phoneNumber }),
  update)

/**
 * @api {delete} /login/:id Delete login
 * @apiName DeleteLogin
 * @apiGroup Login
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Login not found.
 */
router.delete('/:id',
  destroy)

export default router
