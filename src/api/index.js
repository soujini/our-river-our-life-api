import { Router } from 'express'
import waterTestDetails from './water-test-details'
import user from './user'
import images from './images'
import pdf from './pdf'
import floodAlert from './flood-alert'
import floodAlert from './flood-alert'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.use('/water-test-details', waterTestDetails)
router.use('/user', user)
router.use('/images', images)
router.use('/pdf', pdf)
router.use('/flood-alert', floodAlert)
router.use('/flood-alert', floodAlert)

export default router
