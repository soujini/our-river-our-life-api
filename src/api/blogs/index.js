import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Blogs, { schema } from './model'

const router = new Router()
const { templateType, userId, featuredTitle, featuredDescription, featuredPhoto, featuredAdditionalPhotos, featuredVideo, featuredAdditionalVideos } = schema.tree

/**
 * @api {post} /blogs Create blogs
 * @apiName CreateBlogs
 * @apiGroup Blogs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam templateType Blogs's templateType.
 * @apiParam userId Blogs's userId.
 * @apiParam featuredTitle Blogs's featuredTitle.
 * @apiParam featuredDescription Blogs's featuredDescription.
 * @apiParam featuredPhoto Blogs's featuredPhoto.
 * @apiParam featuredAdditionalPhotos Blogs's featuredAdditionalPhotos.
 * @apiParam featuredVideo Blogs's featuredVideo.
 * @apiParam featuredAdditionalVideos Blogs's featuredAdditionalVideos.
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ templateType, userId, featuredTitle, featuredDescription, featuredPhoto, featuredAdditionalPhotos, featuredVideo, featuredAdditionalVideos }),
  create)

/**
 * @api {get} /blogs Retrieve blogs
 * @apiName RetrieveBlogs
 * @apiGroup Blogs
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of blogs.
 * @apiSuccess {Object[]} rows List of blogs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /blogs/:id Retrieve blogs
 * @apiName RetrieveBlogs
 * @apiGroup Blogs
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /blogs/:id Update blogs
 * @apiName UpdateBlogs
 * @apiGroup Blogs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam templateType Blogs's templateType.
 * @apiParam userId Blogs's userId.
 * @apiParam featuredTitle Blogs's featuredTitle.
 * @apiParam featuredDescription Blogs's featuredDescription.
 * @apiParam featuredPhoto Blogs's featuredPhoto.
 * @apiParam featuredAdditionalPhotos Blogs's featuredAdditionalPhotos.
 * @apiParam featuredVideo Blogs's featuredVideo.
 * @apiParam featuredAdditionalVideos Blogs's featuredAdditionalVideos.
 * @apiSuccess {Object} blogs Blogs's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blogs not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ templateType, userId, featuredTitle, featuredDescription, featuredPhoto, featuredAdditionalPhotos, featuredVideo, featuredAdditionalVideos }),
  update)

/**
 * @api {delete} /blogs/:id Delete blogs
 * @apiName DeleteBlogs
 * @apiGroup Blogs
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Blogs not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
