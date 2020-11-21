import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'
// var PDFController = require('../pdf/controller')
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

// export const uploadFiles = async (req, res, next) =>{
//   // var customOriginalName="";
//   // var customPath="";
//   // var customFieldName="";
//   // var bucketName="";
//   //
//   //
//   // var responseData = [];
//   //
//   // aws.config.setPromisesDependency();
//   // aws.config.update({
//   //   "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//   //   "secretAccessKey": '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',
//   // });
//
//   Promise.all([uploadFlora(req), uploadFauna(req),uploadArtwork(req),uploadGroupPicture(req), uploadActivity(req), uploadRiver(req)])
//   .then(results => {
//     // const total = results.reduce((p, c) => p + c);
//
//     console.log(`Results: ${results}`);
//     // console.log(`Total: ${total}`);
//   });
// }

export const uploadFlora = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {
    if(req.files.flora){
      req.files.flora.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/flora";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload Flora to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            if(responseData.length > 0){
              var flora=[];
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                flora.push(element.Location);
                req.body.flora=flora;
              });
              resolve(req.body.flora);
              // fs.unlinkSync(customPath); //
            }
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const uploadFauna = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {
    if(req.files.fauna){
      req.files.fauna.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/fauna";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload Fauna to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            if(responseData.length > 0){
              var fauna=[];
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                fauna.push(element.Location);
                req.body.fauna=fauna;
              });
              resolve(req.body.fauna);
              // fs.unlinkSync(customPath); //
            }
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const uploadArtwork = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {
    if(req.files.artwork){
      req.files.artwork.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/artwork";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload Artwork to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            if(responseData.length > 0){
              var artwork=[];
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                artwork.push(element.Location);
                req.body.artwork=artwork;
              });
              resolve(req.body.artwork);
              // fs.unlinkSync(customPath); //
            }
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const uploadGroupPicture = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {
    if(req.files.groupPicture){
      req.files.groupPicture.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/groupPicture";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload Group Picture to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            if(responseData.length > 0){
              var groupPicture=[];
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                groupPicture.push(element.Location);
                req.body.groupPicture=groupPicture;
              });
              resolve(req.body.groupPicture);
              // fs.unlinkSync(customPath); //
            }
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const uploadActivity = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {
    if(req.files.activity){
      req.files.activity.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/activity";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload Activity to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            if(responseData.length > 0){
              var activity=[];
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                activity.push(element.Location);
                req.body.activity=activity;
              });
              resolve(req.body.activity);
              // fs.unlinkSync(customPath); //
            }
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const uploadRiver = function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var responseData = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  return new Promise((resolve, reject) => {

    if(req.files.river){
      req.files.river.map(async(item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/river";

        const s3 = new aws.S3();
        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        s3.upload(params, function (err, res) {
          if (err) {
            console.log('Error occured while trying to upload River to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData.push(res);
            var river=[];
            if(responseData.length > 0){

              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                river.push(element.Location);
              });

              // fs.unlinkSync(customPath); //
            }
            resolve(river);
          }
        });
      });
    }
    else{
      resolve([]);
    }
  });
}
export const createWaterTestDetails = async(req, res, next) =>{
  Promise.all([uploadFlora(req), uploadFauna(req),uploadArtwork(req),uploadGroupPicture(req), uploadActivity(req), uploadRiver(req)])
  .then(results => {
    // const total = results.reduce((p, c) => p + c);
    results.map(res=>{
      console.log(res);
      //push image to req.body
      //create water test WaterTestDetails
      //upload certificate URL
    })
    // console.log(`Results: ${results}`);
    // console.log(`Total: ${total}`);
  });
}


export const create = ({ bodymen: { body } }, res, next) =>
WaterTestDetails.create(body)
.then((waterTestDetails) => waterTestDetails.view(true))
.then(success(res, 201))
.catch(next)

// export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
//   WaterTestDetails.count(query)
//   .then(count => WaterTestDetails.find(query, select, cursor)
//   .then((waterTestDetails) => ({
//     count,
//     rows: waterTestDetails.map((waterTestDetail) => waterTestDetail.view())
//   }))
// )
// .then(success(res))
// .catch(next)
// }
export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  WaterTestDetails.count(query)
  .then(count => WaterTestDetails.find(query, select, cursor)
  .then(async(waterTestDetails) => ({
    count,
    rows:  await Promise.all(waterTestDetails.map(async(waterTestDetail) => {
      var params = {"userId":waterTestDetail['userId']};
      var userId  = waterTestDetail['userId'];
      var user = await UserController.getUser({params});
      console.log("found user");
      waterTestDetail.contributorName = user.firstName + ' ' +user.lastName;
      return waterTestDetail.view();
    }))
  }))
)
.then(success(res))
.catch(next)
}


export const show = ({ params }, res, next) =>{
  WaterTestDetails.findById(params.id)
  .then(notFound(res))
  .then((waterTestDetails) => waterTestDetails ? waterTestDetails.view() : null)
  .then(success(res))
  .catch(next)
}

export const updateImage = ({ params }, res, next) =>{
  WaterTestDetails.findById(params.id, function(err, waterTestDetails){
    if(waterTestDetails){

      if(params.fieldName == 'flora'){
        waterTestDetails.flora.push({imageURL:params.flora, description:params.description});
      }
      else if(params.fieldName == 'fauna'){
        waterTestDetails.fauna.push({imageURL:params.fauna, description:params.description});
      }
      else if(params.fieldName == 'artwork'){
        waterTestDetails.artwork.push({imageURL:params.artwork, description:params.description});
      }
      else if(params.fieldName == 'groupPicture'){
        waterTestDetails.groupPicture.push({imageURL:params.groupPicture, description:params.description});
      }
      else if(params.fieldName == 'activity'){
        waterTestDetails.activity.push({imageURL:params.activity, description:params.description});
      }
      else if(params.fieldName == 'river'){
        waterTestDetails.river.push({imageURL:params.river, description:params.description});
      }
      else if(params.fieldName == 'certificate'){
        waterTestDetails.certificateURL = params.certificate;
      }
      waterTestDetails.save()
    }
    else{
      console.log('Water test details id is incorrect');
    }
  });
}

export const update = ( { bodymen: { body }, params }, res, next) =>{
  WaterTestDetails.findById(params.id)
  .then(notFound(res))
  .then((waterTestDetails) => waterTestDetails ? Object.assign(waterTestDetails, req).save() : null)
  .then((waterTestDetails) => waterTestDetails ? waterTestDetails.view(true) : null)
  .then(success(res))
  .catch(next)
}

export const destroy = ({ params }, res, next) =>
WaterTestDetails.findById(params.id)
.then(notFound(res))
.then((waterTestDetails) => waterTestDetails ? waterTestDetails.remove() : null)
.then(success(res, 204))
.catch(next)
