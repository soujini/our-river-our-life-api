import { success, notFound } from '../../services/response/'
import { FloraFauna } from '.'
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

export const createFlora = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="our-river-our-life-images/flora";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  const file = req.files;
  if(req.files.length > 0){
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
              photos.push({
                "imageURL" : element.Location
              })
            });

            var params = {
              "userId":req.body.userId,
              "location":req.body.location,
              "latitude":req.body.latitude,
              "longitude":req.body.longitude,
              "commonName":req.body.commonName,
              "localName":req.body.localName,
              "scientificName":req.body.scientificName,
              "flora":photos,
            };
            if(params != ""){
              FloraFauna.create(params)
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
      "userId":req.body.userId,
      "location":req.body.location,
      "latitude":req.body.latitude,
      "longitude":req.body.longitude,
      "commonName":req.body.commonName,
      "localName":req.body.localName,
      "scientificName":req.body.scientificName,
      "flora":photos,
    };
    FloraFauna.create(params)
    .then((floodAlert) => floodAlert.view(true))
    .then(success(res, 201))
    .catch(next)
  }
}
export const createFauna = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="our-river-our-life-images/fauna";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  const file = req.files;
  if(req.files.length > 0){
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
              //photos.push(element.Location)
              photos.push({
                "imageURL" : element.Location
              })
            });

            var params = {
              "userId":req.body.userId,
              "location":req.body.location,
              "latitude":req.body.latitude,
              "longitude":req.body.longitude,
              "commonName":req.body.commonName,
              "localName":req.body.localName,
              "scientificName":req.body.scientificName,
              "fauna":photos,
            };
            if(params != ""){
              FloraFauna.create(params)
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
      "userId":req.body.userId,
      "location":req.body.location,
      "latitude":req.body.latitude,
      "longitude":req.body.longitude,
      "commonName":req.body.commonName,
      "localName":req.body.localName,
      "scientificName":req.body.scientificName,
      "fauna":photos,
    };
    FloraFauna.create(params)
    .then((floodAlert) => floodAlert.view(true))
    .then(success(res, 201))
    .catch(next)
  }
}

export const create = ({ bodymen: { body } }, res, next) =>
  FloraFauna.create(body)
    .then((floraFauna) => floraFauna.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FloraFauna.count(query)
    .then(count => FloraFauna.find(query, select, cursor)
      .then((floraFaunas) => ({
        count,
        rows: floraFaunas.map((floraFauna) => {
          var params = {"userId":floraFauna['userId']}
          console.log("ffff");
          console.log(floraFauna['userId']);
          var userId  = floraFauna['userId'];

          var user = UserController.getUser(params);
          console.log(user);
          floraFauna.contributorName = user.firstName + ' ' +user.lastName;
          return floraFauna.view()
        })
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  FloraFauna.findById(params.id)
    .then(notFound(res))
    .then((floraFauna) => floraFauna ? floraFauna.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  FloraFauna.findById(params.id)
    .then(notFound(res))
    .then((floraFauna) => floraFauna ? Object.assign(floraFauna, body).save() : null)
    .then((floraFauna) => floraFauna ? floraFauna.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  FloraFauna.findById(params.id)
    .then(notFound(res))
    .then((floraFauna) => floraFauna ? floraFauna.remove() : null)
    .then(success(res, 204))
    .catch(next)
