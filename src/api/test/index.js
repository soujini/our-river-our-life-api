import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Test, { schema } from './model'

const router = new Router()
const { phoneNumber, name } = schema.tree

/**
 * @api {post} /tests Create test
 * @apiName CreateTest
 * @apiGroup Test
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam phoneNumber Test's phoneNumber.
 * @apiParam name Test's name.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 user access only.
 */
router.post('/',
  body({ phoneNumber, name }),
  create)

/**
 * @api {get} /tests Retrieve tests
 * @apiName RetrieveTests
 * @apiGroup Test
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tests.
 * @apiSuccess {Object[]} rows List of tests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tests/:id Retrieve test
 * @apiName RetrieveTest
 * @apiGroup Test
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /tests/:id Update test
 * @apiName UpdateTest
 * @apiGroup Test
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam phoneNumber Test's phoneNumber.
 * @apiParam name Test's name.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ phoneNumber, name }),
  update)

/**
 * @api {delete} /tests/:id Delete test
 * @apiName DeleteTest
 * @apiGroup Test
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
