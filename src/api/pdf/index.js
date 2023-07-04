import { Router } from 'express'
import { generateReport } from './controller'

const router = new Router()

/**
 * @api {post} /pdf Create pdf
 * @apiName CreatePdf
 * @apiGroup Pdf
 * @apiSuccess {Object} pdf Pdf's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pdf not found.
 */
router.post('/generateReport',
  generateReport)

export default router
