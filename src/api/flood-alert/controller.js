import { success, notFound } from '../../services/response/'
import { FloodAlert } from '.'
import aws from 'aws-sdk';
import fs from 'fs';

export const upload = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="our-river-our-life-images/floodAlert";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  const file = req.files;
  console.log(req.files);


  // if(req && req.files){

  // if(req.files.photos){
  //   customFieldName = req.files.photos[0].fieldname;
  //   customPath = req.files.photos[0].path;
  //   customOriginalName= req.files.photos[0].originalname;
  //   bucketName="our-river-our-life-images/floodAlert";
  // }

  const s3 = new aws.S3();
  var responseData = [];
  file.map((item) => {
    var params = {
      Bucket: bucketName,
      Key: item.originalname,
      Body: fs.createReadStream(item.path),
      ACL: 'public-read'
    };
    s3.upload(params, function (err, data) {
      if (err) {
        res.json({ "error": true, "Message": err});
      }else{
        responseData.push(data);
        if(responseData.length == file.length){
          res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
          create();
          //create function
        }
      }
    });
  });
  // });
  // var params = {
  //   ACL: 'public-read',
  //   Bucket: bucketName,
  //   Body: fs.createReadStream(customPath),
  //   Key: `${customOriginalName}`
  // };

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.log('Error occured while trying to upload to S3 bucket', err);
  //      res.status(500).send(err);
  //   }
  //
  //   if (res) {
  //     var params ="";
  //     fs.unlinkSync(customPath); // Empty temp folder
  //     const locationUrl = data.Location;
  //
  //       //WaterTestDetailsController.updateImage({params})
  //     res.status(200).send("Image uploaded successfully");
  //   }
  // });
  // });
}

// export const create = ({ bodymen: { body } }, res, next) =>
// FloodAlert.create(body)
// .then((floodAlert) => floodAlert.view(true))
// .then(success(res, 201))
// .catch(next)

export const create = ({ bodymen: { body } }, res, next) => {
  console.log(body.location);
  console.log(body.photos);
  upload(body.photos);
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
FloodAlert.count(query)
.then(count => FloodAlert.find(query, select, cursor)
.then((floodAlerts) => ({
  count,
  rows: floodAlerts.map((floodAlert) => floodAlert.view())
}))
)
.then(success(res))
.catch(next)

export const show = ({ params }, res, next) =>
FloodAlert.findById(params.id)
.then(notFound(res))
.then((floodAlert) => floodAlert ? floodAlert.view() : null)
.then(success(res))
.catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
FloodAlert.findById(params.id)
.then(notFound(res))
.then((floodAlert) => floodAlert ? Object.assign(floodAlert, body).save() : null)
.then((floodAlert) => floodAlert ? floodAlert.view(true) : null)
.then(success(res))
.catch(next)

export const destroy = ({ params }, res, next) =>
FloodAlert.findById(params.id)
.then(notFound(res))
.then((floodAlert) => floodAlert ? floodAlert.remove() : null)
.then(success(res, 204))
.catch(next)
