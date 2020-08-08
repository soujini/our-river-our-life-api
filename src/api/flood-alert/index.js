import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { update, create, index, show, update, destroy } from './controller'
import { schema } from './model'
export FloodAlert, { schema } from './model'
import multer from 'multer'

const router = new Router()
const { location, latitude, longitude, date, time, images, experience } = schema.tree

// var upload = multer({ dest: 'temp/' })

// router.post('/upload',
// multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
//   name: 'file', maxCount: 10
// }]),
// upload)

router.post('/upload',
multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 }}).array('photos', 10),
  upload
)

/**
 * @api {post} /flood-alert Create flood alert
 * @apiName CreateFloodAlert
 * @apiGroup FloodAlert
 * @apiParam location Flood alert's location.
 * @apiParam latitude Flood alert's latitude.
 * @apiParam longitude Flood alert's longitude.
 * @apiParam date Flood alert's date.
 * @apiParam time Flood alert's time.
 * @apiParam images Flood alert's images.
 * @apiParam experience Flood alert's experience.
 * @apiSuccess {Object} floodAlert Flood alert's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flood alert not found.
 */
router.post('/',
  body({ location, latitude, longitude, date, time, images, experience }),
  create)

/**
 * @api {get} /flood-alert Retrieve flood alerts
 * @apiName RetrieveFloodAlerts
 * @apiGroup FloodAlert
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of flood alerts.
 * @apiSuccess {Object[]} rows List of flood alerts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /flood-alert/:id Retrieve flood alert
 * @apiName RetrieveFloodAlert
 * @apiGroup FloodAlert
 * @apiSuccess {Object} floodAlert Flood alert's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flood alert not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /flood-alert/:id Update flood alert
 * @apiName UpdateFloodAlert
 * @apiGroup FloodAlert
 * @apiParam location Flood alert's location.
 * @apiParam latitude Flood alert's latitude.
 * @apiParam longitude Flood alert's longitude.
 * @apiParam date Flood alert's date.
 * @apiParam time Flood alert's time.
 * @apiParam images Flood alert's images.
 * @apiParam experience Flood alert's experience.
 * @apiSuccess {Object} floodAlert Flood alert's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flood alert not found.
 */
router.put('/:id',
  body({ location, latitude, longitude, date, time, images, experience }),
  update)

/**
 * @api {delete} /flood-alert/:id Delete flood alert
 * @apiName DeleteFloodAlert
 * @apiGroup FloodAlert
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flood alert not found.
 */
router.delete('/:id',
  destroy)

export default router
