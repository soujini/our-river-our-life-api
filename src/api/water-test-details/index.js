import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, updateImage, createWaterTestDetails } from './controller'
import { schema } from './model'
export WaterTestDetails, { schema } from './model'
import multer from 'multer'

const router = new Router()
const { userId, contributorName, generalInformation,waterLevelAndWeather,surroundings,waterTesting, flora, fauna, artwork, groupPicture, activity, river, surrounding,certificateURL } = schema.tree

const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');

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

router.post('/create-web',authenticateJWT,
multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
  name: 'flora', maxCount: 5
}, {
  name: 'fauna', maxCount: 5
}, {
  name: 'artwork', maxCount: 5
}, {
  name: 'groupPicture', maxCount: 5
}, {
  name: 'activity', maxCount: 5
}, {
  name: 'river', maxCount: 5
},
{
  name: 'surrounding', maxCount: 5
}
]),
body({
  userId,
  generalInformation,
  waterLevelAndWeather,
  surroundings,
  waterTesting,
  flora,
  fauna,
  artwork,
  groupPicture,
  activity,
  river,
  surrounding,
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
router.post('/',authenticateJWT,
body({
  userId,
  generalInformation,
  waterLevelAndWeather,
  surroundings,
  waterTesting,
  flora,
  fauna,
  artwork,
  groupPicture,
  activity,
  river,
  surrounding,
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
* @api {get} /water-test-details/:id Retrieve water test details
* @apiName RetrieveWaterTestDetails
* @apiGroup WaterTestDetails
* @apiSuccess {Object} waterTestDetails Water test details's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Water test details not found.
*/
router.get('/:id',authenticateJWT,
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
router.put('/:id',authenticateJWT,
body({ userId, flora, fauna, artwork, groupPicture, activity, river, certificateURL }),
update)

/**
* @api {delete} /water-test-details/:id Delete water test details
* @apiName DeleteWaterTestDetails
* @apiGroup WaterTestDetails
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Water test details not found.
*/
router.delete('/:id',authenticateJWT,
destroy)

export default router
