import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { createFishSanctuary, create, index, show, update, destroy } from './controller'
import { schema } from './model'
export FishSanctuaries, { schema } from './model'
import multer from 'multer'

const router = new Router()
const { userId,locationDetails, habitatCharacteristics, managementActions, fishInformation, culturalHistoricalSignificance } = schema.tree
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
router.post('/create-fish-sanctuary',authenticateJWT,
multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).fields([{
  name: 'sanctuaryPictures', maxCount: 5
}, {
  name: 'fishInformation', maxCount: 5
},
]),
body({
  userId,
  locationDetails,
  habitatCharacteristics,
  managementActions,
  fishInformation,
  culturalHistoricalSignificance
}),
createFishSanctuary)

/**
 * @api {post} /fish-sanctuaries Create fish sanctuaries
 * @apiName CreateFishSanctuaries
 * @apiGroup FishSanctuaries
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam locationDetails Fish sanctuaries's locationDetails.
 * @apiParam habitatCharacteristics Fish sanctuaries's habitatCharacteristics.
 * @apiParam managementActions Fish sanctuaries's managementActions.
 * @apiParam fishInformation Fish sanctuaries's fishInformation.
 * @apiParam culturalHistoricalSignificance Fish sanctuaries's culturalHistoricalSignificance.
 * @apiSuccess {Object} fishSanctuaries Fish sanctuaries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fish sanctuaries not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ locationDetails, habitatCharacteristics, managementActions, fishInformation, culturalHistoricalSignificance }),
  create)

/**
 * @api {get} /fish-sanctuaries Retrieve fish sanctuaries
 * @apiName RetrieveFishSanctuaries
 * @apiGroup FishSanctuaries
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of fish sanctuaries.
 * @apiSuccess {Object[]} rows List of fish sanctuaries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /fish-sanctuaries/:id Retrieve fish sanctuaries
 * @apiName RetrieveFishSanctuaries
 * @apiGroup FishSanctuaries
 * @apiSuccess {Object} fishSanctuaries Fish sanctuaries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fish sanctuaries not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /fish-sanctuaries/:id Update fish sanctuaries
 * @apiName UpdateFishSanctuaries
 * @apiGroup FishSanctuaries
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam locationDetails Fish sanctuaries's locationDetails.
 * @apiParam habitatCharacteristics Fish sanctuaries's habitatCharacteristics.
 * @apiParam managementActions Fish sanctuaries's managementActions.
 * @apiParam fishInformation Fish sanctuaries's fishInformation.
 * @apiParam culturalHistoricalSignificance Fish sanctuaries's culturalHistoricalSignificance.
 * @apiSuccess {Object} fishSanctuaries Fish sanctuaries's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fish sanctuaries not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ locationDetails, habitatCharacteristics, managementActions, fishInformation, culturalHistoricalSignificance }),
  update)

/**
 * @api {delete} /fish-sanctuaries/:id Delete fish sanctuaries
 * @apiName DeleteFishSanctuaries
 * @apiGroup FishSanctuaries
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Fish sanctuaries not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
