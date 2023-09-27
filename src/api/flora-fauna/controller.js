import { success, notFound } from '../../services/response/'
import { FloraFauna } from '.'
import aws from 'aws-sdk'
import fs from 'fs'
import { errorHandler } from '../../services/error'
const logger = require('../../logger').default
var UserController = require('../user/controller')

export const createFlora = (req, res, next) => {
  var bucketName = 'our-river-our-life-images/flora'
  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const file = req.files

  if (req.files.length > 0) {
    const s3 = new aws.S3()
    var responseData = []

    file.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: item.originalname,
        Body: fs.createReadStream(item.path),
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      }
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ error: true, Message: err })
        } else {
          responseData.push(data)
          if (responseData.length === file.length) {
            // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var photos = []
            responseData.forEach(function (element) {
              photos.push({
                imageURL: element.Location
              })
            })

            var params = {
              userId: req.body.userId,
              location: req.body.location,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              commonName: req.body.commonName,
              localName: req.body.localName,
              scientificName: req.body.scientificName,
              flora: photos
            }
            if (params !== '') {
              FloraFauna.create(params)
                .then((floodAlert) => floodAlert.view(true))
                .then(success(res, 201))
                .catch((error) => {
                  errorHandler(error, res).then((err) => {
                    logger.error('createFlora: Error creating a flora')
                    return res.status(err.error[0].status).send(err)
                  })
                })
            }
          }
        }
      })
    })
  } else {
    // var photos=[];
    var params = {
      userId: req.body.userId,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      commonName: req.body.commonName,
      localName: req.body.localName,
      scientificName: req.body.scientificName
      // "flora":photos,
    }
    FloraFauna.create(params)
      .then((floodAlert) => floodAlert.view(true))
      .then(success(res, 201))
      .catch((error) => {
        errorHandler(error, res).then((err) => {
          logger.error('FloraFauna: Error creating a flora')
          return res.status(err.error[0].status).send(err)
        })
      })
  }
}

export const updateFlora = (req, res, next) => {
  var bucketName = 'our-river-our-life-images/flora'
  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const file = req.files

  if (req.files.length > 0) {
    const s3 = new aws.S3()
    var responseData = []

    file.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: item.originalname,
        Body: fs.createReadStream(item.path),
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      }
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ error: true, Message: err })
        } else {
          responseData.push(data)
          if (responseData.length === file.length) {
            // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var photos = []
            responseData.forEach(function (element) {
              photos.push({
                imageURL: element.Location
              })
            })

            var params = {
              userId: req.body.userId,
              location: req.body.location,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              commonName: req.body.commonName,
              localName: req.body.localName,
              scientificName: req.body.scientificName,
              flora: photos
            }
            if (params !== '') {
              FloraFauna.findById(req.params.id)
                .then(notFound(res))
                .then((floraFauna) => floraFauna ? Object.assign(floraFauna, params).save() : null)
                .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
                .then(success(res))
                .catch((error) => {
                  errorHandler(error, res).then((err) => {
                    logger.error('updateFlora: Error updating a flora')
                    return res.status(err.error[0].status).send(err)
                  })
                })
            }
          }
        }
      })
    })
  } else {
    // var photos=[];
    var params = {
      userId: req.body.userId,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      commonName: req.body.commonName,
      localName: req.body.localName,
      scientificName: req.body.scientificName
      // "flora":photos,
    }
    FloraFauna.findById(req.params.id)
      .then(notFound(res))
      .then((floraFauna) => floraFauna ? Object.assign(floraFauna, params).save() : null)
      .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
      .then(success(res))
      .catch((error) => {
        errorHandler(error, res).then((err) => {
          logger.error('updateFlora: Error updating a flora')
          return res.status(err.error[0].status).send(err)
        })
      })
  }
}

export const updateFauna = (req, res, next) => {
  var bucketName = 'our-river-our-life-images/fauna'
  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const file = req.files

  if (req.files.length > 0) {
    const s3 = new aws.S3()
    var responseData = []

    file.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: item.originalname,
        Body: fs.createReadStream(item.path),
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      }
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ error: true, Message: err })
        } else {
          responseData.push(data)
          if (responseData.length === file.length) {
            // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var photos = []
            responseData.forEach(function (element) {
              photos.push({
                imageURL: element.Location
              })
            })

            var params = {
              userId: req.body.userId,
              location: req.body.location,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              commonName: req.body.commonName,
              localName: req.body.localName,
              scientificName: req.body.scientificName,
              fauna: photos
            }
            if (params !== '') {
              FloraFauna.findById(req.params.id)
                .then(notFound(res))
                .then((floraFauna) => floraFauna ? Object.assign(floraFauna, params).save() : null)
                .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
                .then(success(res))
                .catch((error) => {
                  errorHandler(error, res).then((err) => {
                    logger.error('updateFauna: Error updating a fauna')
                    return res.status(err.error[0].status).send(err)
                  })
                })
            }
          }
        }
      })
    })
  } else {
    // var photos=[];
    var params = {
      userId: req.body.userId,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      commonName: req.body.commonName,
      localName: req.body.localName,
      scientificName: req.body.scientificName
      // "flora":photos,
    }
    FloraFauna.findById(req.params.id)
      .then(notFound(res))
      .then((floraFauna) => floraFauna ? Object.assign(floraFauna, params).save() : null)
      .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
      .then(success(res))
      .catch((error) => {
        errorHandler(error, res).then((err) => {
          logger.error('updateFauna: Error updating a fauna')
          return res.status(err.error[0].status).send(err)
        })
      })
  }
}

export const createFauna = (req, res, next) => {
  var bucketName = 'our-river-our-life-images/fauna'

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const file = req.files

  if (req.files.length > 0) {
    const s3 = new aws.S3()
    var responseData = []

    file.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: item.originalname,
        Body: fs.createReadStream(item.path),
        ACL: 'public-read'
      }
      s3.upload(params, function (err, data) {
        if (err) {
          res.json({ error: true, Message: err })
        } else {
          responseData.push(data)
          if (responseData.length === file.length) {
            // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var photos = []
            responseData.forEach(function (element) {
              // photos.push(element.Location)
              photos.push({
                imageURL: element.Location
              })
            })

            var params = {
              userId: req.body.userId,
              location: req.body.location,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              commonName: req.body.commonName,
              localName: req.body.localName,
              scientificName: req.body.scientificName,
              fauna: photos
            }
            if (params !== '') {
              FloraFauna.create(params)
                .then((floodAlert) => floodAlert.view(true))
                .then(success(res, 201))
                .catch((error) => {
                  errorHandler(error, res).then((err) => {
                    logger.error('createFauna: Error creating a fauna')
                    return res.status(err.error[0].status).send(err)
                  })
                })
            }
          }
        }
      })
    })
  } else {
    var params = {
      userId: req.body.userId,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      commonName: req.body.commonName,
      localName: req.body.localName,
      scientificName: req.body.scientificName
      // "fauna":photos,
    }
    FloraFauna.create(params)
      .then((floodAlert) => floodAlert.view(true))
      .then(success(res, 201))
      .catch((error) => {
        errorHandler(error, res).then((err) => {
          logger.error('createFauna: Error creating a fauna')
          return res.status(err.error[0].status).send(err)
        })
      })
  }
}

// export const create = ({ bodymen: { body } }, res, next) =>
//   FloraFauna.create(body)
//     .then((floraFauna) => floraFauna.view(true))
//     .then(success(res, 201))
//       .catch((error) => {
//   errorHandler(error, res).then((err) => {
//     logger.error('createFlora: Error creating a flora fauna')
//     return res.status(err.error[0].status).send(err)
//   })
// })

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  FloraFauna.count(query)
    .then(count => FloraFauna.find(query, select, cursor)
      .then(async (floraFaunas) => ({
        count,
        rows: await Promise.all(floraFaunas.map(async (floraFauna) => {
          var params = { userId: floraFauna.userId }
          var user = await UserController.getUser({ params })
          if (user != null) {
            floraFauna.contributorName = user.firstName + ' ' + user.lastName
          }
          return floraFauna.view()
        }))
      }))
    )
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('index: Error an index')
        return res.status(err.error[0].status).send(err)
      })
    })
}

export const show = ({ params }, res, next) =>
  FloraFauna.findById(params.id)
    .then(notFound(res))
    .then((floraFauna) => floraFauna ? floraFauna.view() : null)
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('show: Error showing a flora fauna')
        return res.status(err.error[0].status).send(err)
      })
    })

// export const update = ({ bodymen: { body }, params }, res, next) =>
//   FloraFauna.findById(params.id)
//     .then(notFound(res))
//     .then((floraFauna) => floraFauna ? Object.assign(floraFauna, body).save() : null)
//     .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
//     .then(success(res))
//       .catch((error) => {
//   errorHandler(error, res).then((err) => {
//     logger.error('createFlora: Error updating a flora fauna')
//     return res.status(err.error[0].status).send(err)
//   })
// })

export const destroy = ({ params }, res, next) =>
  FloraFauna.findById(params.id)
    .then(notFound(res))
    .then((floraFauna) => floraFauna ? floraFauna.remove() : null)
    .then(success(res, 204))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('destroy: Error deleting a flora fauna')
        return res.status(err.error[0].status).send(err)
      })
    })

export const searchByDate = (req, res, next) => {
  const query = { createdAt: { $gte: new Date(req.query.start), $lt: new Date(req.query.end) } }
  var select
  var cursor
  FloraFauna.count(query)
    .then(count => FloraFauna.find(query, select, cursor)
      .then(async (floraFaunas) => ({
        count,
        rows: await Promise.all(floraFaunas.map(async (floraFauna) => {
          var params = { userId: floraFauna.userId }
          var user = await UserController.getUser({ params })
          if (user != null) {
            floraFauna.contributorName = user.firstName != null && user.firstName !== '' ? user.firstName : '' + ' ' + user.lastName != null && user.lastName !== '' ? user.lastName : ''
          }
          return floraFauna.view()
        }))
      }))
    )
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('searchByDate: Error search by date of flora fauna')
        return res.status(err.error[0].status).send(err)
      })
    })
}
