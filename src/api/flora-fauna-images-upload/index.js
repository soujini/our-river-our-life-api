import { Router } from 'express'
import multer from 'multer'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export FloraFaunaImagesUpload, { schema } from './model'

const router = new Router()
const { flora, fauna } = schema.tree

/**
 * @api {post} /flora-fauna-images-upload Upload flora fauna images upload
 * @apiName UploadFloraFaunaImagesUpload
 * @apiGroup FloraFaunaImagesUpload
 * @apiParam flora Flora fauna images upload's flora.
 * @apiParam fauna Flora fauna images upload's fauna.
 * @apiSuccess {Object} floraFaunaImagesUpload Flora fauna images upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna images upload not found.
 */


router.post('/upload',
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    body({ flora, fauna })
  ),
  upload)

/**
 * @api {post} /flora-fauna-images-upload Create flora fauna images upload
 * @apiName CreateFloraFaunaImagesUpload
 * @apiGroup FloraFaunaImagesUpload
 * @apiParam flora Flora fauna images upload's flora.
 * @apiParam fauna Flora fauna images upload's fauna.
 * @apiSuccess {Object} floraFaunaImagesUpload Flora fauna images upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna images upload not found.
 */
router.post('/',
  body({ flora, fauna }),
  create)

/**
 * @api {get} /flora-fauna-images-upload Retrieve flora fauna images uploads
 * @apiName RetrieveFloraFaunaImagesUploads
 * @apiGroup FloraFaunaImagesUpload
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of flora fauna images uploads.
 * @apiSuccess {Object[]} rows List of flora fauna images uploads.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /flora-fauna-images-upload/:id Retrieve flora fauna images upload
 * @apiName RetrieveFloraFaunaImagesUpload
 * @apiGroup FloraFaunaImagesUpload
 * @apiSuccess {Object} floraFaunaImagesUpload Flora fauna images upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna images upload not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /flora-fauna-images-upload/:id Update flora fauna images upload
 * @apiName UpdateFloraFaunaImagesUpload
 * @apiGroup FloraFaunaImagesUpload
 * @apiParam flora Flora fauna images upload's flora.
 * @apiParam fauna Flora fauna images upload's fauna.
 * @apiSuccess {Object} floraFaunaImagesUpload Flora fauna images upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna images upload not found.
 */
router.put('/:id',
  body({ flora, fauna }),
  update)

/**
 * @api {delete} /flora-fauna-images-upload/:id Delete flora fauna images upload
 * @apiName DeleteFloraFaunaImagesUpload
 * @apiGroup FloraFaunaImagesUpload
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flora fauna images upload not found.
 */
router.delete('/:id',
  destroy)

export default router
