import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Test2, { schema } from './model'

const router = new Router()
const { phoneNumber } = schema.tree

/**
 * @api {post} /test2 Create test 2
 * @apiName CreateTest2
 * @apiGroup Test2
 * @apiParam phoneNumber Test 2's phoneNumber.
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 */
router.post('/',
  body({ phoneNumber }),
  create)

/**
 * @api {get} /test2 Retrieve test 2 s
 * @apiName RetrieveTest2S
 * @apiGroup Test2
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of test 2 s.
 * @apiSuccess {Object[]} rows List of test 2 s.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /test2/:id Retrieve test 2
 * @apiName RetrieveTest2
 * @apiGroup Test2
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /test2/:id Update test 2
 * @apiName UpdateTest2
 * @apiGroup Test2
 * @apiParam phoneNumber Test 2's phoneNumber.
 * @apiSuccess {Object} test2 Test 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test 2 not found.
 */
router.put('/:id',
  body({ phoneNumber }),
  update)

/**
 * @api {delete} /test2/:id Delete test 2
 * @apiName DeleteTest2
 * @apiGroup Test2
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test 2 not found.
 */
router.delete('/:id',
  destroy)

export default router
