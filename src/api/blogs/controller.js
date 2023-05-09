import { success, notFound } from '../../services/response/'
import { Blogs } from '.'
import aws from 'aws-sdk'
import fs from 'fs'
var UserController = require('../user/controller')

export const createBlog = async (req, res, next) => {
  Promise.all([uploadFeaturedPhoto(req), uploadAdditionalFeaturedPhotos(req)])
    .then(results => {
      req.body.featuredPhoto = results[0][0]
      req.body.featuredAdditionalPhotos = results[1]
      Blogs.create(JSON.parse(JSON.stringify(req.body)))
        .then(async blogs => {
          var params = { userId: blogs.userId }
          var user = await UserController.getUser({ params })
          blogs.contributorName = user.firstName + ' ' + user.lastName
          return blogs.view()
          // blogs.view(true)
        })
        .then(success(res, 201))
        .catch(next)
    })
}
export const uploadAdditionalFeaturedPhotos = function (req) {
  var customOriginalName = ''
  var customPath = ''
  var customFieldName = ''
  var bucketName = ''

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  return new Promise((resolve, reject) => {
    if (req.files.featuredAdditionalPhotos) {
      var featuredAdditionalPhotos = []
      const promises = req.files.featuredAdditionalPhotos.map((item) => {
        customFieldName = item.fieldname
        customPath = item.path
        bucketName = 'our-river-our-life-images/blogs'

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname
        }

        return uploadToS3(params).then(element => {
          featuredAdditionalPhotos.push({ imageURL: element })
          return featuredAdditionalPhotos
        })
      })

      Promise.all(promises)
        .then(results => {
          resolve(featuredAdditionalPhotos)
        })
        .catch(e => {
          console.error(e)
        })
    } else {
      resolve([])
    }
  })
}
export const uploadFeaturedPhoto = function (req) {
  var customOriginalName = ''
  var customPath = ''
  var customFieldName = ''
  var bucketName = ''

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  return new Promise((resolve, reject) => {
    if (req.files.featuredPhoto) {
      var featuredPhoto = []
      const promises = req.files.featuredPhoto.map((item) => {
        customFieldName = item.fieldname
        customPath = item.path
        bucketName = 'our-river-our-life-images/blogs'

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname
        }

        return uploadToS3(params).then(element => {
          // featuredPhoto.push({imageURL:element});
          // featuredPhoto.imageURL=element;
          featuredPhoto.push({ imageURL: element })

          return featuredPhoto
        })
      })

      Promise.all(promises)
        .then(results => {
          resolve(featuredPhoto)
        })
        .catch(e => {
          console.error(e)
        })
    } else {
      resolve([])
    }
  })
}
export const uploadToS3 = function (params) {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3()
    var responseData = []
    s3.upload(params, function (err, res) {
      if (err) {
        console.log('Error occured while trying to upload Flora to the S3 bucket', err)
        res.send(err)
      } if (res) {
        // console.log("loc "+res.Location);
        resolve(res.Location)
      }
    })
  })
}
export const create = ({ bodymen: { body } }, res, next) =>
  Blogs.create(body)
    .then((blogs) => blogs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = async ({ querymen: { query, select, cursor } }, res, next) =>
  Blogs.count(query)
    .then(count => Blogs.find(query, select, cursor)
      .then(async (blogs) => ({
        count,
        rows: await Promise.all(blogs.map(async (blog) => {
          var params = { userId: blog.userId }
          var user = await UserController.getUser({ params })
          blog.contributorName = user.firstName + ' ' + user.lastName
          return blog.view()
        }))
      }))
    )
    .then(success(res))
    .catch(next)

// Get top 10 Blogs
export const getTop10 = async ({ querymen: { query, select, cursor } }, res, next) =>
  Blogs.count(query)
    .then(count => Blogs.find(query, select, cursor).limit(10)
      .then(async (blogs) => ({
        count,
        rows: await Promise.all(blogs.map(async (blog) => {
          var params = { userId: blog.userId }
          var user = await UserController.getUser({ params })
          blog.contributorName = user.firstName + ' ' + user.lastName
          return blog.view()
        }))
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? blogs.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? Object.assign(blogs, body).save() : null)
    .then((blogs) => blogs ? blogs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? blogs.remove() : null)
    .then(success(res, 204))
    .catch(next)
