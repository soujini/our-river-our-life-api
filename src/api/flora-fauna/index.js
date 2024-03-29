import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
// import { master } from '../../services/passport'
import { createFlora, createFauna, index, show, destroy, searchByDate, updateFlora, updateFauna } from './controller'
import { schema } from './model'
import multer from 'multer'
export FloraFauna, { schema } from './model'
const router = new Router()
const { userId, latitude, longitude, location, flora, fauna, commonName, localName, scientificName, contributorName } = schema.tree
const jwt = require('jsonwebtoken')

const accessTokenSecret = 'youraccesstokensecret'

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
/**
 * @api {post} /flora-fauna Create flora fauna
 * @apiName CreateFloraFauna
 * @apiGroup FloraFauna
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam latitude Flora fauna's latitude.
 * @apiParam longitude Flora fauna's longitude.
 * @apiParam location Flora fauna's location.
 * @apiParam flora Flora fauna's flora.
 * @apiParam fauna Flora fauna's fauna.
 * @apiParam commonName Flora fauna's commonName.
 * @apiParam localName Flora fauna's localName.
 * @apiParam scientificName Flora fauna's scientificName.
 * @apiSuccess {Object} floraFauna Flora fauna's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna not found.
 * @apiError 401 master access only.
 */

router.post('/create-flora', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('flora', 10),
  createFlora
)

router.post('/create-fauna', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('fauna', 10),
  createFauna
)

router.put('/update-flora/:id', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('flora', 10),
  updateFlora
)

router.put('/update-fauna/:id', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('fauna', 10),
  updateFauna
)

// router.post('/',
//   // master(),
//   body({ userId, latitude, longitude, location, flora, fauna, commonName, localName, scientificName, contributorName }),
//   create)

/**
 * @api {get} /flora-fauna Retrieve flora faunas
 * @apiName RetrieveFloraFaunas
 * @apiGroup FloraFauna
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of flora faunas.
 * @apiSuccess {Object[]} rows List of flora faunas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  // master(),
  query(),
  index)

router.get('/searchByDate',
  query(),
  searchByDate)

/**
 * @api {get} /flora-fauna/:id Retrieve flora fauna
 * @apiName RetrieveFloraFauna
 * @apiGroup FloraFauna
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} floraFauna Flora fauna's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Flora fauna not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  // master(),
  show)

// /**
//  * @api {put} /flora-fauna/:id Update flora fauna
//  * @apiName UpdateFloraFauna
//  * @apiGroup FloraFauna
//  * @apiPermission master
//  * @apiParam {String} access_token master access token.
//  * @apiParam latitude Flora fauna's latitude.
//  * @apiParam longitude Flora fauna's longitude.
//  * @apiParam location Flora fauna's location.
//  * @apiParam flora Flora fauna's flora.
//  * @apiParam fauna Flora fauna's fauna.
//  * @apiParam commonName Flora fauna's commonName.
//  * @apiParam localName Flora fauna's localName.
//  * @apiParam scientificName Flora fauna's scientificName.
//  * @apiSuccess {Object} floraFauna Flora fauna's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Flora fauna not found.
//  * @apiError 401 master access only.
//  */
// router.put('/:id',
//   // master(),
//   body({ userId, latitude, longitude, location, flora, fauna, commonName, localName, scientificName, contributorName }),
//   update)

/**
 * @api {delete} /flora-fauna/:id Delete flora fauna
 * @apiName DeleteFloraFauna
 * @apiGroup FloraFauna
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Flora fauna not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  // master(),
  destroy)

export default router
