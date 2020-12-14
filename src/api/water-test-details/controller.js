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
//

export const uploadToS3 = function(params) {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3();
    var responseData=[];
    s3.upload(params, function (err, res) {
      if (err) {
        console.log('Error occured while trying to upload Flora to the S3 bucket', err);
        res.send(err);
      }if(res){
        // console.log("loc "+res.Location);
        resolve(res.Location);
      }
    });
  });
}

// function urlToBase64(url) {
//   return new Promise((resolve, reject) => {
//     request.get(url, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         resolve("data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64'));
//       } else {
//         reject(response);
//       }
//     });
//   })
// }

export const uploadFlora =  function(req) {
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.flora){
      var flora=[];
      let promises = req.files.flora.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/flora";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          flora.push({imageURL:element});
          return flora;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(flora);
      })
      .catch(e => {
        console.error(e);
      })
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

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.fauna){
      var fauna=[];
      let promises = req.files.fauna.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/fauna";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          fauna.push({imageURL:element});
          return fauna;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(fauna);
      })
      .catch(e => {
        console.error(e);
      })
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

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.artwork){
      var artwork=[];
      let promises = req.files.artwork.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/artwork";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          artwork.push({imageURL:element});
          return artwork;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(artwork);
      })
      .catch(e => {
        console.error(e);
      })
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

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.groupPicture){
      var groupPicture=[];
      let promises = req.files.groupPicture.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/groupPicture";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          groupPicture.push({imageURL:element});
          return groupPicture;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(groupPicture);
      })
      .catch(e => {
        console.error(e);
      })
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

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.activity){
      var activity=[];
      let promises = req.files.activity.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/activity";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          activity.push({imageURL:element});
          return activity;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(activity);
      })
      .catch(e => {
        console.error(e);
      })
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

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if(req.files.river){
      var river=[];
      let promises = req.files.river.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/river";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          river.push({imageURL:element});
          return river;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(river);
      })
      .catch(e => {
        console.error(e);
      })
    }
    else{
      resolve([]);
    }
  });
}
export const createWaterTestDetails = async(req, res, next) =>{
  Promise.all([uploadFlora(req), uploadFauna(req),uploadArtwork(req),uploadGroupPicture(req), uploadActivity(req), uploadRiver(req)])
  .then(results => {
    req.body.flora = results[0];
    req.body.fauna = results[1];
    req.body.artwork = results[2];
    req.body.groupPicture = results[3];
    req.body.activity = results[4];
    req.body.river = results[5];
    console.log(req.body.waterLevelAndWeather);
    console.log(typeof(req.body.waterLevelAndWeather));
    console.log(JSON.stringify(req.body.waterLevelAndWeather));
    req.body.waterLevelAndWeather = JSON.stringify(req.body.waterLevelAndWeather);
    console.log((JSON.stringify(req.body)));
    console.log(typeof(JSON.stringify(req.body)));
    WaterTestDetails.create(JSON.parse(JSON.stringify(req.body)))
    .then((waterTestDetails) => waterTestDetails.view(true))
    .then(success(res, 201))
    .catch(next)

  });
}


export const create = (req, res, next) =>{
WaterTestDetails.create(req)
.then((waterTestDetails) => waterTestDetails.view(true))
.then(success(res, 201))
.catch(next)
}

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
