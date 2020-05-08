import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Test, { schema } from './model'

const router = new Router()
const { name, phone, email } = schema.tree

/**
 * @api {post} /test Create test
 * @apiName CreateTest
 * @apiGroup Test
 * @apiParam name Test's name.
 * @apiParam phone Test's phone.
 * @apiParam email Test's email.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.post('/',
  body({ name, phone, email }),
  create)

/**
 * @api {get} /test Retrieve tests
 * @apiName RetrieveTests
 * @apiGroup Test
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tests.
 * @apiSuccess {Object[]} rows List of tests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /test/:id Retrieve test
 * @apiName RetrieveTest
 * @apiGroup Test
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /test/:id Update test
 * @apiName UpdateTest
 * @apiGroup Test
 * @apiParam name Test's name.
 * @apiParam phone Test's phone.
 * @apiParam email Test's email.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 */
router.put('/:id',
  body({ name, phone, email }),
  update)

/**
 * @api {delete} /test/:id Delete test
 * @apiName DeleteTest
 * @apiGroup Test
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test not found.
 */
router.delete('/:id',
  destroy)

export default router
