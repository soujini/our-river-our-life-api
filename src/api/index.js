import { Router } from 'express'
import user from './user'
import waterTestDetails from './water-test-details'
import images from './images'
import pdf from './pdf'
import floodAlert from './flood-alert'
import floraFauna from './flora-fauna'
import blogs from './blogs'

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
router.use('/flora-fauna', floraFauna)
router.use('/blogs', blogs)

export default router
