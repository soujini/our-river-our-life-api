import { success, notFound } from '../../services/response/'
import { FloraFaunaImagesUpload } from '.'
var WaterTestDetailsController = require('../water-test-details/controller')

import aws from 'aws-sdk';
import fs from 'fs';


export const upload = (req, res, next) =>{
  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  console.log("kirti")
  console.log(req)

  const s3 = new aws.S3();
  var params = {
    ACL: 'public-read',
    Bucket: 'flora-fauna',
    Body: fs.createReadStream(req.file.path),
    Key: `flora-fauna/${req.file.originalname}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
        var params ="";
      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;
      req.file.originalname = "5ed5cd1e1177d200176877a6_filename.png"
      var id = req.file.originalname.split('_');

      if(req.file.fieldname == 'flora'){
        params = {"id":id[0], "flora":locationUrl}
      }
      else{
          params = {"id":id[0], "fauna":locationUrl}
      }
      if(params != ""){
        WaterTestDetailsController.updateImage({params})
      }
    }
  });
}

export const create = ({ bodymen: { body } }, res, next) =>
FloraFaunaImagesUpload.create(body)
.then((floraFaunaImagesUpload) => floraFaunaImagesUpload.view(true))
.then(success(res, 201))
.catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
FloraFaunaImagesUpload.count(query)
.then(count => FloraFaunaImagesUpload.find(query, select, cursor)
.then((floraFaunaImagesUploads) => ({
  count,
  rows: floraFaunaImagesUploads.map((floraFaunaImagesUpload) => floraFaunaImagesUpload.view())
}))
)
.then(success(res))
.catch(next)

export const show = ({ params }, res, next) =>
FloraFaunaImagesUpload.findById(params.id)
.then(notFound(res))
.then((floraFaunaImagesUpload) => floraFaunaImagesUpload ? floraFaunaImagesUpload.view() : null)
.then(success(res))
.catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
FloraFaunaImagesUpload.findById(params.id)
.then(notFound(res))
.then((floraFaunaImagesUpload) => floraFaunaImagesUpload ? Object.assign(floraFaunaImagesUpload, body).save() : null)
.then((floraFaunaImagesUpload) => floraFaunaImagesUpload ? floraFaunaImagesUpload.view(true) : null)
.then(success(res))
.catch(next)

export const destroy = ({ params }, res, next) =>
FloraFaunaImagesUpload.findById(params.id)
.then(notFound(res))
.then((floraFaunaImagesUpload) => floraFaunaImagesUpload ? floraFaunaImagesUpload.remove() : null)
.then(success(res, 204))
.catch(next)
