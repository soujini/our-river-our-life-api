import { success, notFound } from '../../services/response/'
import { FloodAlert } from '.'
import aws from 'aws-sdk';
import fs from 'fs';

export const createAlert = (req, res, next) =>{
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

  if(file.length > 0){
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
            //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var photos=[];
            responseData.forEach(function(element){
              photos.push(element.Location)
            });

            var params = {
              "location":req.body.location,
              "latitude":req.body.latitude,
              "longitude":req.body.longitude,
              "date":req.body.activityDate,
              "time":req.body.activityTime,
              "experience":req.body.experience,
              "photos":photos
            };
            if(params != ""){
              FloodAlert.create(params)
              .then((floodAlert) => floodAlert.view(true))
              .then(success(res, 201))
              .catch(next)
            }
          }
        }
      });
    });
  }
  else{
    var params = {
      "location":req.body.location,
      "latitude":req.body.latitude,
      "longitude":req.body.longitude,
      "date":req.body.date,
      "time":req.body.time,
      "experience":req.body.experience,
    };
    FloodAlert.create(params)
    .then((floodAlert) => floodAlert.view(true))
    .then(success(res, 201))
    .catch(next)
  }
}

export const create = ({ bodymen: { body } }, res, next) =>
FloodAlert.create(body)
.then((floodAlert) => floodAlert.view(true))
.then(success(res, 201))
.catch(next)


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
