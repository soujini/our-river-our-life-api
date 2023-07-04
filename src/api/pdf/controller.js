import aws from 'aws-sdk'
import * as htmlToPdf from 'html-pdf-node'
const ejs = require('ejs')
// var pdf = require('html-pdf')
const path = require('path')

var WaterTestDetailsController = require('../water-test-details/controller')

export const generateReport = (req, res, next) => {
  if (req.body.id === undefined || req.body.id === '') {
    res.status(400).json({ error: 'Missing params id' })
  }
  console.log('In generate report ' + req.body.id)
  var waterTestDetailsId = req.body.id
  var params1 = { id: waterTestDetailsId }

  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  const s3 = new aws.S3()

  var options = {
    height: '11.25in',
    width: '8.5in',
    header: {
      height: '20mm'
    },
    footer: {
      height: '20mm'
    },
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null'
      }
    }
  }

  return WaterTestDetailsController.getWaterTestDetailsById({ params1 })
    .then((waterTestDetails) => {
      console.log('generateReport: Successfully retrieved water test details ')
      console.log(__dirname)
      return renderFile(waterTestDetails)
        .then((html) => {
          const file = { content: html }
          return htmlToPdf.generatePdf(file, options)
            .then((pdfBuffer) => {
              // to display pdf in the response
              // res.setHeader('Content-Type', 'application/pdf')
              // res.setHeader('Content-Disposition', 'attachment; filename=pdfFile.pdf')
              // res.send(pdfBuffer)

              var params1 = {
                ACL: 'public-read',
                Bucket: 'our-river-our-life-images/certificate',
                Key: 'certificate_' + waterTestDetailsId,
                Body: pdfBuffer,
                ContentEncoding: 'buffer',
                ContentType: 'application/pdf'
              }

              return s3.upload(params1, function (err, data) {
                if (err) {
                  console.log(err)
                  res.send('Error uploading data: ', err)
                } else {
                  // var certificateURL = data.Location
                  console.log('Succesfully uploaded pdf!')
                  var url = 'https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_' + waterTestDetailsId
                  var params = { id: waterTestDetailsId, certificate: url, fieldName: 'certificate' }
                  WaterTestDetailsController.updateImage({ params })
                    .then((wtd) => {
                      res.status(200).json({ certificateURL: wtd.certificateURL })
                    })
                }
              })
            }).catch((error) => {
              res.statusCode = 500
              res.send('Error generating report: ' + error)
            })
        })
    })
}

const renderFile = (data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(path.join(__dirname, '/report-template.ejs'), { waterTestDetails: data }, (err, result) => {
      if (err) {
        // logger.error(err)
        reject(err)
      }
      resolve(result)
    })
  })
}
