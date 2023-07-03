import { parseAsync } from '@babel/core'
import aws from 'aws-sdk'
import { logger } from 'handlebars'
const ejs = require('ejs')
const pdf = require('html-pdf')
const path = require('path')
var WaterTestDetailsController = require('../water-test-details/controller')

// export const generateReportWeb = (req, res, next) => {
//   console.log("IN GEN REP WEB")
//   console.log(req.body);
//   var waterTestDetailsId = req.body.id;
//   var certificateURL = "";
//   ejs.renderFile(path.join(__dirname, "/report-template.ejs"), {
//     waterTestDetails: req.body
//   }, (err, data) => {
//     if (err) {
//       console.log("IN ERROR")
//       res.send("Error in report template " + err);
//     } else {
//       let options = {
//         "height": "11.25in",
//         "width": "8.5in",
//         "header": {
//           "height": "20mm",
//         },
//         "footer": {
//           "height": "20mm",
//         },

//       };
//       pdf.create(data, options).toBuffer(function (err, data) {
//         if (err) {
//           console.log("IN ERR2")
//           res.send(err);
//         } else {
//           console.log("GETTING DATA")
//           console.log('This is a buffer:', data);

//           aws.config.setPromisesDependency();
//           aws.config.update({
//             "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
//             "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
//           });

//           const s3 = new aws.S3();
//           console.log("here " + req.body.id)

//           var params = {
//             ACL: 'public-read',
//             Bucket: "our-river-our-life-images/certificate",
//             Key: `certificate_` + req.body.id,
//             Body: data,
//             ContentEncoding: "buffer",
//             ContentType: "application/pdf"
//           };

//           s3.upload(params, function (err, data) {

//             if (err) {
//               console.log(err);
//               console.log("Error uploading data: ", data);
//             } else {
//               console.log("woohoosdsdsd");
//               certificateURL = data.Location;
//               console.log("url " + certificateURL)
//               console.log('Data: ', data)
//               console.log("data: ", data.Location)
//               console.log("succesfully uploaded pdf!")
//               params = { "id": req.body.id, "certificate": data.Location, "fieldName": "certificate" }

//               WaterTestDetailsController.updateImage({ params })
//             }

//           });
//           var x = "https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_" + waterTestDetailsId;
//           res.status(200).json({ certificateURL: x })
//         }
//       }); //pdf create
//     }//else
//   });
// }
// export const generateReport = async (req, res, next) => {
//   console.log('In generate report ' + req.body.id)
//   var waterTestDetailsId = req.body.id
//   var params1 = { id: waterTestDetailsId }
//   var content = await WaterTestDetailsController.getWaterTestDetailsById({ params1 })
//   console.log('Water Test Details: ' + JSON.stringify(content))
//   ejs.renderFile(path.join(__dirname, '/report-template.ejs'), {
//     waterTestDetails: content
//   }, async (err, data) => {
//     if (err) {
//       res.send('Error in report template ' + err)
//     } else {
//       var options = {
//         height: '11.25in',
//         width: '8.5in',
//         header: {
//           height: '20mm'
//         },
//         footer: {
//           height: '20mm'
//         },
//         childProcessOptions: {
//           env: {
//             OPENSSL_CONF: '/dev/null'
//           }
//         }
//       }
//       pdf.create(data, options).toBuffer(function (err, data) {
//         if (err) {
//           res.send(err)
//           console.log(err)
//         } else {
//           aws.config.setPromisesDependency()
//           aws.config.update({
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//           })
//           const s3 = new aws.S3()
//           var params = {
//             ACL: 'public-read',
//             Bucket: 'our-river-our-life-images/certificate',
//             Key: 'certificate_' + req.body.id,
//             Body: data,
//             ContentEncoding: 'buffer',
//             ContentType: 'application/pdf'
//           }

//           s3.upload(params, function (err, data) {
//             if (err) {
//               console.log(err)
//               console.log('Error uploading data: ', data)
//             } else {
//               // var certificateURL = data.Location
//               console.log('Succesfully uploaded pdf!')
//               var url = 'https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_' + waterTestDetailsId
//               params = { id: req.body.id, certificate: url, fieldName: 'certificate' }
//               WaterTestDetailsController.updateImage({ params })
//               res.status(200).json({ certificateURL: url })
//             }
//           })
//         }
//       })
//     }
//   })
// }

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
      console.log('generateReport: Successfully retrieved water test details ' + JSON.stringify(waterTestDetails))
      ejs.renderFile(path.join(__dirname, '/report-template.ejs'), {
        waterTestDetails: waterTestDetails
      }, (err, data) => {
        if (err) {
          res.send('Error in report template ' + err)
        } else {
          var test = 'Souju'
          // res.send(test);
          pdf.create(data, options).toBuffer(function (err, buffer) {
            if (err) {
              console.log('Error creating PDF: ' + err)
              res.statusCode = 500;
              res.send(err);
            } else {
              var params = {
                ACL: 'public-read',
                Bucket: 'our-river-our-life-images/certificate',
                Key: 'certificate_' + waterTestDetailsId,
                Body: data,
                ContentEncoding: 'buffer',
                ContentType: 'application/pdf'
              }
              // res.type('application/pdf');
              res.statusCode = 200;
              res.send({ success: true });
              // res.status(200).json(params)
              // res.send(params)
              // res.send('ajksakjhdakjhdas3u27346')
              // s3.upload(params, function (err, buffer) {
              //   if (err) {
              //     console.log(err)
              //     console.log('Error uploading data: ', data)
              //   } else {
              //     // var certificateURL = data.Location
              //     console.log('Succesfully uploaded pdf!')
              //     var url = 'https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_' + waterTestDetailsId
              //     params = { id: '649a71da9d819c140420bfaddd', certificate: url, fieldName: 'certificate' }
              //     // WaterTestDetailsController.updateImage({ params })
              //     res.status(200).json({ certificateURL: url })
              //   }
              // })
            }
          })
        }
      })
    })
    .catch((error) => {
      res.send(error.message)
    })
}
export const test = () => {
  console.log('Testing')
  return Promise.resolve('askdhjaksjd')
}
export const createPDF = async (data, waterTestDetailsId) => {

}
