import { success, notFound } from '../../services/response/'
import { FishSanctuaries } from '.'
import aws from 'aws-sdk'
import fs from 'fs'
import { errorHandler } from '../../services/error'
const logger = require('../../logger').default
var UserController = require('../user/controller')

export const uploadToS3 = function (params) {
  return new Promise((resolve) => {
    const s3 = new aws.S3()
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

export const searchByDate = (req, res, next) => {
  const query = { createdAt: { $gte: new Date(req.query.start), $lt: new Date(req.query.end) } }
  var select
  var cursor
  FishSanctuaries.count(query)
    .then(count => FishSanctuaries.find(query, select, cursor)
      .then(async (fishSanctuaries) => ({
        count,
        rows: await Promise.all(fishSanctuaries.map(async (fishSanctuary) => {
          var params = { userId: fishSanctuary.userId }
          var user = await UserController.getUser({ params })
          if (user != null) {
            fishSanctuary.contributorName = user.firstName != null && user.firstName !== '' ? user.firstName : '' + ' ' + user.lastName != null && user.lastName !== '' ? user.lastName : ''
          }
          return fishSanctuary.view()
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

// export const deleteFromBucket = function () {
//   var params = {
//     ACL: 'public-read',
//     Bucket: bucketName,
//     Body: fs.createReadStream(item.path),
//     Key: item.originalname // url name
//   }

//   return new Promise((resolve, reject) => {
//     const s3 = new aws.S3()
//     var responseData = []
//     s3.deleteObject(params, function (err, res) {
//       if (err) {
//         console.log('Error occured while trying to delete image from the S3 bucket', err)
//         res.send(err)
//       } if (res) {
//         // console.log("loc "+res.Location);
//         resolve(res.Location)
//       }
//     })
//   })
// }

export const deleteSanctuaryPictures = function (res) {
  var bucketName = 'our-river-our-life-images/fish-sanctuary'
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  // let fileName =

  // let url = "https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/species/species_1666769752635"
  const params = {
    // Bucket: process.env.AWS_BUCKET_NAME,
    Bucket: bucketName,
    Key: 'our-river-our-life-images/fish-sanctuary/filename.fileExtension'
  }

  // https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/species/species_1666769752635
  s3.deleteObject(params, (error, data) => {
    if (error) {
      res.status(500).send(error)
    }
    res.status(200).send('Sanctuary file has been deleted successfully')
  })
}

export const deleteSpeciesPictures = function () {

}
export const uploadSanctuaryPictures = function (req) {
  var bucketName = ''

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  return new Promise((resolve) => {
    // console.log(req.files.sanctuaryPictures.length);
    var sanctuaryPictures = []
    if (req.files.sanctuaryFiles !== undefined) {
      const promises = req.files.sanctuaryFiles.map(async (item) => {
        bucketName = 'our-river-our-life-images/fish-sanctuary'

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname
        }

        const element = await uploadToS3(params)
        sanctuaryPictures.push({ imageURL: element })
        return sanctuaryPictures
      })

      Promise.all(promises)
        .then(() => {
          resolve(sanctuaryPictures)
        })
        .catch((error) => {
          errorHandler(error).then((err) => {
            logger.error('uploadSanctuaryPictures: Error uploading Sanctuary pictures')
            return error.status(err.error[0].status).send(err)
          })
        })
    } else {
      resolve([])
    }
  })
}
export const uploadSpeciesPictures = function (req) {
  var bucketName = ''

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  return new Promise((resolve) => {
    var fishInformation = []
    if (req.files.speciesFiles) {
      const promises = req.files.speciesFiles.map(async (item) => {
        bucketName = 'our-river-our-life-images/species'

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname
        }

        const element = await uploadToS3(params)
        fishInformation.push({ imageURL: element })
        return fishInformation
      })

      Promise.all(promises)
        .then(() => {
          resolve(fishInformation)
        })
        .catch((error) => {
          errorHandler(error).then((err) => {
            logger.error('uploadSpeciesPictures: Error uploading Species pictures')
            return error.status(err.error[0].status).send(err)
          })
        })
    } else {
      resolve([])
    }
  })
}
export const createFishSanctuary = async (req, res, next) => {
  // if(req.body['locationDetails']['sanctuaryPictures'] != undefined){
  req.body.locationDetails.sanctuaryPictures = JSON.parse(req.body.locationDetails.sanctuaryPictures)
  // }
  // if(req.body['locationDetails']['speciesPictures'] != undefined){
  req.body.speciesPictures = JSON.parse(req.body.speciesPictures)
  // }

  Promise.all([uploadSanctuaryPictures(req), uploadSpeciesPictures(req)])
    .then(results => {
      for (var i = 0; i < results[0].length; i++) {
        req.body.locationDetails.sanctuaryPictures[i].imageURL = results[0][i].imageURL
      }

      for (var j = 0; j < results[1].length; j++) {
        req.body.speciesPictures[j].imageURL = results[1][j].imageURL
      }

      FishSanctuaries.create(JSON.parse(JSON.stringify(req.body)))
        .then((fishSanctuaries) => fishSanctuaries.view(true))
        .then(success(res, 201))
        .catch((error) => {
          errorHandler(error, res).then((err) => {
            logger.error('createFishSanctuary: Error creating a FishSanctuary')
            return res.status(err.error[0].status).send(err)
          })
        })
    })
}

export const updateFishSanctuary = async (req, res, next) => {
  // if (req.body['locationDetails']['speciesPictures'] != undefined) {
  req.body.locationDetails.sanctuaryPictures = JSON.parse(req.body.locationDetails.sanctuaryPictures)
  // }
  // if (req.body['locationDetails']['speciesPictures'] != undefined) {
  req.body.speciesPictures = JSON.parse(req.body.speciesPictures)
  // }

  Promise.all([uploadSanctuaryPictures(req), uploadSpeciesPictures(req)])
    .then(results => {
      for (var i = 0; i < results[0].length; i++) {
        req.body.locationDetails.sanctuaryPictures[i].imageURL = results[0][i].imageURL
      }

      for (var j = 0; j < results[1].length; j++) {
        req.body.speciesPictures[j].imageURL = results[1][j].imageURL
      }
      FishSanctuaries.findById({ _id: req.params.id }).exec()
        .then(notFound(res))
        .then((fishSanctuaries) => fishSanctuaries ? Object.assign(fishSanctuaries, JSON.parse(JSON.stringify(req.body))).save() : null)
        .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.view(true) : null)
        .then(success(res))
        .catch((error) => {
          errorHandler(error, res).then((err) => {
            logger.error('updateFishSanctuary: Error updating a FishSanctuary')
            return res.status(err.error[0].status).send(err)
          })
        })
    })
}

export const create = ({ bodymen: { body } }, res, next) =>
  FishSanctuaries.create(body)
    .then((fishSanctuaries) => fishSanctuaries.view(true))
    .then(success(res, 201))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('create: Error creating a fish sanctuary')
        return res.status(err.error[0].status).send(err)
      })
    })

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FishSanctuaries.count(query)
    .then(count => FishSanctuaries.find(query, select, cursor)
      .then((fishSanctuaries) => ({
        count,
        rows: fishSanctuaries.map((fishSanctuaries) => fishSanctuaries.view())
      }))
    )
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('index: Error an index')
        return res.status(err.error[0].status).send(err)
      })
    })

export const show = ({ params }, res, next) =>
  FishSanctuaries.findById(params.id)
    .then(notFound(res))
    .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.view() : null)
    .then(success(res))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('show: Error showing fish sanctaury')
        return res.status(err.error[0].status).send(err)
      })
    })

export const update = (req, res) => {
  // FishSanctuaries.findById('620cfbbe7ee6030018681377')
  //   .then(notFound(res))
  //   .then((fishSanctuaries) => fishSanctuaries ? Object.assign(fishSanctuaries, (req.body)).save() : null)
  //   .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.view(true) : null)
  // .then(success(res, 201))
  //  .catch((error) => {
  // errorHandler(error, res).then((err) => {
  //   logger.error('destroy: Error deleting fish sanctuary')
  //   return res.status(err.error[0].status).send(err)
  // })
}

export const destroy = ({ params }, res, next) =>
  FishSanctuaries.findById(params.id)
    .then(notFound(res))
    .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.remove() : null)
    .then(success(res, 204))
    .catch((error) => {
      errorHandler(error, res).then((err) => {
        logger.error('destroy: Error deleting fish sanctuary')
        return res.status(err.error[0].status).send(err)
      })
    })
