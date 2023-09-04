import { success, notFound } from '../../services/response/'
import { FloodAlert } from '.'
import aws from 'aws-sdk'
import fs from 'fs'
import { errorHandler } from '../../services/error'
const logger = require('../../logger').default
var UserController = require('../user/controller')

export const createAlert = (req, res, next) => {
  var bucketName = 'our-river-our-life-images/floodAlert'

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  const file = req.files
  if (req.files?.length > 0) {
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
              photos.push(element.Location)
            })

            var params = {
              location: req.body.location,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              date: req.body.activityDate,
              time: req.body.activityTime,
              experience: req.body.experience,
              photos: photos
            }
            if (params !== '') {
              FloodAlert.create(params)
                .then((floodAlert) => floodAlert.view(true))
                .then(success(res, 201))
                .catch((error) => {
                  errorHandler(error, res).then((err) => {
                    logger.error('createAlert: Error creating a flood alert')
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
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      date: req.body.date,
      time: req.body.time,
      experience: req.body.experience
    }
    FloodAlert.create(params)
      .then((floodAlert) => {
        return floodAlert.view(true)
      })
      .then(success(res, 201))
      .catch((error) => {
        errorHandler(error, res).then((err) => {
          logger.error('createAlert: Error creating a flood alert')
          return res.status(err.error[0].status).send(err)
        })
      })
  }
}

export const updateAlert = ({ bodymen: { body }, params }, res, next) =>
  FloodAlert.findById(params.id)
    .then(notFound(res))
    .then((floodAlert) => floodAlert ? Object.assign(floodAlert, body).save() : null)
    .then((floodAlert) => floodAlert ? floodAlert.view(true) : null)
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('updateAlert: Error updating a flood alert')
        return res.status(err.error[0].status).send(err)
      })
    })

export const deleteAlert = ({ params }, res, next) =>
  FloodAlert.findById(params.id)
    .then(notFound(res))
    .then((floodAlert) => floodAlert ? floodAlert.remove() : null)
    .then(success(res, 204))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('deleteAlert: Error deleting a flood alert')
        return res.status(err.error[0].status).send(err)
      })
    })

export const searchByDate = (req, res, next) => {
  const query = { createdAt: { $gte: new Date(req.query.start), $lt: new Date(req.query.end) } }
  var select
  var cursor
  FloodAlert.count(query)
    .then(count => FloodAlert.find(query, select, cursor)
      .then(async (floodAlerts) => ({
        count,
        rows: await Promise.all(floodAlerts.map(async (floodAlert) => {
          var params = { userId: floodAlert.userId }
          var user = await UserController.getUser({ params })
          if (user != null) {
            floodAlert.contributorName = user.firstName != null && user.firstName !== '' ? user.firstName : '' + ' ' + user.lastName != null && user.lastName !== '' ? user.lastName : ''
          }
          return floodAlert.view()
        }))
      }))
    )
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('searchByDate: Error search by date')
        return res.status(err.error[0].status).send(err)
      })
    })
}

export const create = ({ bodymen: { body } }, res, next) =>
  FloodAlert.create(body)
    .then((floodAlert) => floodAlert.view(true))
    .then(success(res, 201))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('createAlert: Error creating a flood alert')
        return res.status(err.error[0].status).send(err)
      })
    })

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  FloodAlert.count(query)
    .then(count => FloodAlert.find(query, select, cursor)
      .then((floodAlerts) => ({
        count,
        rows: floodAlerts.map((floodAlert) => floodAlert.view())
      }))
    )
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('list: Error fetching the list for flood alerts')
        return res.status(err.error[0].status).send(err)
      })
    })

export const show = ({ params }, res, next) =>
  FloodAlert.findById(params.id)
    .then(notFound(res))
    .then((floodAlert) => floodAlert ? floodAlert.view() : null)
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('createAlert: Error showing a flood alert')
        return res.status(err.error[0].status).send(err)
      })
    })
