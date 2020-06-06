import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Images, { schema } from './model'

const router = new Router()
const { flora, fauna, artwork, groupPicture, activity } = schema.tree
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
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
* @api {post} /flora-fauna-images-upload Upload flora fauna images upload
* @apiName UploadFloraFaunaImagesUpload
* @apiGroup FloraFaunaImagesUpload
* @apiParam flora Flora fauna images upload's flora.
* @apiParam fauna Flora fauna images upload's fauna.
* @apiSuccess {Object} floraFaunaImagesUpload Flora fauna images upload's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Flora fauna images upload not found.
*/

router.post('/upload',authenticateJWT,
multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
  name: 'flora', maxCount: 1
}, {
  name: 'fauna', maxCount: 1
}, {
  name: 'artwork', maxCount: 1
}, {
  name: 'groupPicture', maxCount: 1
}, {
  name: 'activity', maxCount: 1
}]),
upload)

/**
 * @api {post} /images Create images
 * @apiName CreateImages
 * @apiGroup Images
 * @apiParam flora Images's flora.
 * @apiParam fauna Images's fauna.
 * @apiParam artwork Images's artwork.
 * @apiParam groupPicture Images's groupPicture.
 * @apiParam activity Images's activity.
 * @apiSuccess {Object} images Images's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Images not found.
 */
router.post('/',
  body({ flora, fauna, artwork, groupPicture, activity }),
  create)

/**
 * @api {get} /images Retrieve images
 * @apiName RetrieveImages
 * @apiGroup Images
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of images.
 * @apiSuccess {Object[]} rows List of images.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /images/:id Retrieve images
 * @apiName RetrieveImages
 * @apiGroup Images
 * @apiSuccess {Object} images Images's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Images not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /images/:id Update images
 * @apiName UpdateImages
 * @apiGroup Images
 * @apiParam flora Images's flora.
 * @apiParam fauna Images's fauna.
 * @apiParam artwork Images's artwork.
 * @apiParam groupPicture Images's groupPicture.
 * @apiParam activity Images's activity.
 * @apiSuccess {Object} images Images's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Images not found.
 */
router.put('/:id',
  body({ flora, fauna, artwork, groupPicture, activity }),
  update)

/**
 * @api {delete} /images/:id Delete images
 * @apiName DeleteImages
 * @apiGroup Images
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Images not found.
 */
router.delete('/:id',
  destroy)

export default router
