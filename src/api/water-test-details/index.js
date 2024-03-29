import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy, createWaterTestDetails, updateWaterTestDetails, searchByDate, updateMobileWaterTestDetails } from './controller'
import { schema } from './model'
import multer from 'multer'
export WaterTestDetails, { schema } from './model'

const router = new Router()
const { userId, generalInformation, waterLevelAndWeather, surroundings, waterTesting, floraPictures, faunaPictures, artworkPictures, groupPictures, activityPictures, riverPictures, surroundingPictures, certificateURL } = schema.tree

const accessTokenSecret = 'youraccesstokensecret'
const jwt = require('jsonwebtoken')

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

router.post('/create-web', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
    name: 'floraFiles', maxCount: 5
  }, {
    name: 'faunaFiles', maxCount: 5
  }, {
    name: 'artworkFiles', maxCount: 5
  }, {
    name: 'groupFiles', maxCount: 5
  }, {
    name: 'activityFiles', maxCount: 5
  }, {
    name: 'riverFiles', maxCount: 5
  },
  {
    name: 'surroundingFiles', maxCount: 5
  }
  ]),
  body({
    userId,
    generalInformation,
    waterLevelAndWeather,
    surroundings,
    waterTesting,
    floraPictures,
    faunaPictures,
    artworkPictures,
    groupPictures,
    activityPictures,
    riverPictures,
    surroundingPictures,
    certificateURL
  }),
  createWaterTestDetails)

/**
* @api {post} /water-test-details Create water test details
* @apiName CreateWaterTestDetails
* @apiGroup WaterTestDetails
* @apiParam userId Water test details's userId.
* @apiParam generalInformation:{name Water test details's generalInformation:{name.
* @apiParam test} Water test details's test}.
* @apiSuccess {Object} waterTestDetails Water test details's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Water test details not found.
*/
router.post('/', authenticateJWT,
  body({
    userId,
    generalInformation,
    waterLevelAndWeather,
    surroundings,
    waterTesting,
    floraPictures,
    faunaPictures,
    artworkPictures,
    groupPictures,
    activityPictures,
    riverPictures,
    surroundingPictures,
    certificateURL
  }),
  create)

/**
* @api {get} /water-test-details Retrieve water test details
* @apiName RetrieveWaterTestDetails
* @apiGroup WaterTestDetails
* @apiUse listParams
* @apiSuccess {Number} count Total amount of water test details.
* @apiSuccess {Object[]} rows List of water test details.
* @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.get('/',
  query(),
  index)

/**
* @api {get} /water-test-details Retrieve water test details
* @apiName RetrieveWaterTestDetails
* @apiGroup WaterTestDetails
* @apiUse listParams
* @apiSuccess {Number} count Total amount of water test details.
* @apiSuccess {Object[]} rows List of water test details.
* @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.get('/searchByDate',
  query(),
  searchByDate)

/**
* @api {get} /water-test-details/:id Retrieve water test details
* @apiName RetrieveWaterTestDetails
* @apiGroup WaterTestDetails
* @apiSuccess {Object} waterTestDetails Water test details's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Water test details not found.
*/
router.get('/:id',
  show)

/**
* @api {put} /water-test-details/:id Update water test details
* @apiName UpdateWaterTestDetails
* @apiGroup WaterTestDetails
* @apiParam userId Water test details's userId.
* @apiParam generalInformation:{name Water test details's generalInformation:{name.
* @apiParam test} Water test details's test}.
* @apiSuccess {Object} waterTestDetails Water test details's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Water test details not found.
*/
// router.put('/:id', authenticateJWT,
//   body({ userId, floraPictures, faunaPictures, artworkPictures, groupPictures, activityPictures, riverPictures, certificateURL }),
//   updateWaterTestDetails)

router.put('/:id', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
    name: 'floraFiles', maxCount: 5
  }, {
    name: 'faunaFiles', maxCount: 5
  }, {
    name: 'artworkFiles', maxCount: 5
  }, {
    name: 'groupFiles', maxCount: 5
  }, {
    name: 'activityFiles', maxCount: 5
  }, {
    name: 'riverFiles', maxCount: 5
  },
  {
    name: 'surroundingFiles', maxCount: 5
  }
  ]),
  body({
    userId,
    generalInformation,
    waterLevelAndWeather,
    surroundings,
    waterTesting,
    floraPictures,
    faunaPictures,
    artworkPictures,
    groupPictures,
    activityPictures,
    riverPictures,
    surroundingPictures,
    certificateURL
  }),
  updateWaterTestDetails)

router.put('/update-mobile/:id', authenticateJWT,
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
    name: 'floraFiles', maxCount: 5
  }, {
    name: 'faunaFiles', maxCount: 5
  }, {
    name: 'artworkFiles', maxCount: 5
  }, {
    name: 'groupFiles', maxCount: 5
  }, {
    name: 'activityFiles', maxCount: 5
  }, {
    name: 'riverFiles', maxCount: 5
  },
  {
    name: 'surroundingFiles', maxCount: 5
  }
  ]),
  body({
    userId,
    generalInformation,
    waterLevelAndWeather,
    surroundings,
    waterTesting,
    floraPictures,
    faunaPictures,
    artworkPictures,
    groupPictures,
    activityPictures,
    riverPictures,
    surroundingPictures,
    certificateURL
  }),
  updateMobileWaterTestDetails)
/**
* @api {delete} /water-test-details/:id Delete water test details
* @apiName DeleteWaterTestDetails
* @apiGroup WaterTestDetails
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Water test details not found.
*/
router.delete('/:id', authenticateJWT,
  destroy)

export default router
