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

export const uploadToS3 = async function(params) {
  console.log(params);
  const s3 = new aws.S3();
  var responseData=[];
  await s3.upload(params, function (err, res) {
  if (err) {
    console.log('Error occured while trying to upload Flora to the S3 bucket', err);
    res.send(err);
  }if(res){
    console.log(res.Location);
    return res.Location;
    // responseData.push(res);
    // console.log(res);
    //   flora.push(res.Location);
    // if(responseData.length > 0){
    //   // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //   responseData.forEach(function(element){
    //     console.log("in push");
    //     flora.push(element.Location);
    //   });
    //   // fs.unlinkSync(customPath); //
    // }
  }
});
}

export const uploadFlora =  function(req) {
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
      var flora=[];
      req.files.flora.map((item) => {
        console.log("in item");
        customFieldName = item.fieldname;
        customPath = item.path;
        // customOriginalName= item.originalname;
        bucketName="our-river-our-life-images/flora";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };


        // flora.push(item.originalname);
        var a = uploadToS3(params);
        console.log(a);
        flora.push(a);
          console.log("pushed");
        //   s3.upload(params, function (err, res) {
        //   console.log("in uppload");
        //   if (err) {
        //     console.log('Error occured while trying to upload Flora to the S3 bucket', err);
        //     res.send(err);
        //   }if(res){
        //     responseData=[];
        //     responseData.push(res);
        //     console.log(res);
        //       flora.push(res.Location);
        //     // if(responseData.length > 0){
        //     //   // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
        //     //   responseData.forEach(function(element){
        //     //     console.log("in push");
        //     //     flora.push(element.Location);
        //     //   });
        //     //   // fs.unlinkSync(customPath); //
        //     // }
        //   }
        // });
        // console.log("done with s3 upload");
      });
      console.log("done with map");
      resolve(flora);

    }
    else{
      resolve([]);
    }
  });
}


export const uploadFlora1 = function(req) {
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

  return new Promise(async (resolve, reject) => {
    if(req.files.flora){
      var flora=[];
      const promises = await req.files.flora.map(async (item) => {
        console.log("in item");
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
        // flora=[];
         await s3.upload(params, async function (err, res) {
          console.log("in uppload");
          if (err) {
            console.log('Error occured while trying to upload Flora to the S3 bucket', err);
            res.send(err);
          }if(res){
            responseData=[];
            responseData.push(res);
            if(responseData.length > 0){
              // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
              responseData.forEach(function(element){
                console.log("in push");
                flora.push(element.Location);

                // req.body.flora=flora;
              });
              // return(flora);
              // fs.unlinkSync(customPath); //
            }
          }
          // console.log("upload done");
          // console.log(flora);
        });
        return flora;
      });
      const results = await Promise.all(promises);
      console.log(results);
      // console.log("flora 4" +flora);
      // console.log("in resolve");
       resolve(results);
    }
    else{
      resolve([]);
    }
  });
}
// export const uploadFauna = function(req) {
//   var customOriginalName="";
//   var customPath="";
//   var customFieldName="";
//   var bucketName="";
//   var responseData = [];
//
//   aws.config.setPromisesDependency();
//   aws.config.update({
//     "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//     "secretAccessKey": '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',
//   });
//
//   return new Promise((resolve, reject) => {
//     if(req.files.fauna){
//       req.files.fauna.map(async(item) => {
//         var fauna=[];
//         customFieldName = item.fieldname;
//         customPath = item.path;
//         // customOriginalName= item.originalname;
//         bucketName="our-river-our-life-images/fauna";
//
//         const s3 = new aws.S3();
//         var params = {
//           ACL: 'public-read',
//           Bucket: bucketName,
//           Body: fs.createReadStream(item.path),
//           Key: item.originalname,
//         };
//
//         s3.upload(params, function (err, res) {
//           if (err) {
//             console.log('Error occured while trying to upload Fauna to the S3 bucket', err);
//             res.send(err);
//           }if(res){
//             responseData.push(res);
//             if(responseData.length > 0){
//               // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
//               responseData.forEach(function(element){
//                 fauna.push(element.Location);
//                 // req.body.fauna=fauna;
//               });
//               resolve(fauna);
//               // fs.unlinkSync(customPath); //
//             }
//           }
//         });
//       });
//     }
//     else{
//       resolve([]);
//     }
//   });
// }
// export const uploadArtwork = function(req) {
//   var customOriginalName="";
//   var customPath="";
//   var customFieldName="";
//   var bucketName="";
//   var responseData = [];
//
//   aws.config.setPromisesDependency();
//   aws.config.update({
//     "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//     "secretAccessKey": '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',
//   });
//
//   return new Promise((resolve, reject) => {
//     if(req.files.artwork){
//       req.files.artwork.map(async(item) => {
//         var artwork=[];
//         customFieldName = item.fieldname;
//         customPath = item.path;
//         // customOriginalName= item.originalname;
//         bucketName="our-river-our-life-images/artwork";
//
//         const s3 = new aws.S3();
//         var params = {
//           ACL: 'public-read',
//           Bucket: bucketName,
//           Body: fs.createReadStream(item.path),
//           Key: item.originalname,
//         };
//
//         s3.upload(params, function (err, res) {
//           if (err) {
//             console.log('Error occured while trying to upload Artwork to the S3 bucket', err);
//             res.send(err);
//           }if(res){
//             responseData.push(res);
//             if(responseData.length > 0){
//               // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
//               responseData.forEach(function(element){
//                 artwork.push(element.Location);
//                 // _artwork.push(element.Location);
//               });
//               resolve(artwork);
//               // fs.unlinkSync(customPath); //
//             }
//           }
//         });
//       });
//     }
//     else{
//       resolve([]);
//     }
//   });
// }
// export const uploadGroupPicture = function(req) {
//   var customOriginalName="";
//   var customPath="";
//   var customFieldName="";
//   var bucketName="";
//   var responseData = [];
//
//   aws.config.setPromisesDependency();
//   aws.config.update({
//     "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//     "secretAccessKey": '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',
//   });
//
//   return new Promise((resolve, reject) => {
//     if(req.files.groupPicture){
//       req.files.groupPicture.map(async(item) => {
//         var groupPicture=[];
//         // var _groupPicture=[];
//         customFieldName = item.fieldname;
//         customPath = item.path;
//         // customOriginalName= item.originalname;
//         bucketName="our-river-our-life-images/groupPicture";
//
//         const s3 = new aws.S3();
//         var params = {
//           ACL: 'public-read',
//           Bucket: bucketName,
//           Body: fs.createReadStream(item.path),
//           Key: item.originalname,
//         };
//
//         s3.upload(params, function (err, res) {
//           if (err) {
//             console.log('Error occured while trying to upload Group Picture to the S3 bucket', err);
//             res.send(err);
//           }if(res){
//             responseData.push(res);
//             if(responseData.length > 0){
//               // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
//               responseData.forEach(function(element){
//                 groupPicture.push(element.Location);
//                 // _groupPicture.push(element.Location);
//               });
//               resolve(groupPicture);
//               // fs.unlinkSync(customPath); //
//             }
//           }
//         });
//       });
//     }
//     else{
//       resolve([]);
//     }
//   });
// }
// export const uploadActivity = function(req) {
//   var customOriginalName="";
//   var customPath="";
//   var customFieldName="";
//   var bucketName="";
//   var responseData = [];
//
//   aws.config.setPromisesDependency();
//   aws.config.update({
//     "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//     "secretAccessKey": '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',
//   });
//
//   return new Promise((resolve, reject) => {
//     if(req.files.activity){
//       req.files.activity.map(async(item) => {
//         var activity=[];
//         // var _activity=[];
//         customFieldName = item.fieldname;
//         customPath = item.path;
//         // customOriginalName= item.originalname;
//         bucketName="our-river-our-life-images/activity";
//
//         const s3 = new aws.S3();
//         var params = {
//           ACL: 'public-read',
//           Bucket: bucketName,
//           Body: fs.createReadStream(item.path),
//           Key: item.originalname,
//         };
//
//         s3.upload(params, function (err, res) {
//           if (err) {
//             console.log('Error occured while trying to upload Activity to the S3 bucket', err);
//             res.send(err);
//           }if(res){
//             responseData.push(res);
//             if(responseData.length > 0){
//               // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
//               responseData.forEach(function(element){
//                 activity.push(element.Location);
//                 // _activity.push(element.Location);
//               });
//               resolve(activity);
//               // fs.unlinkSync(customPath); //
//             }
//           }
//         });
//       });
//     }
//     else{
//       resolve([]);
//     }
//   });
// }
// export const uploadRiver = async function(req) {
//   var customOriginalName="";
//   var customPath="";
//   var customFieldName="";
//   var bucketName="";
//   var responseData = [];
//
//   aws.config.setPromisesDependency();
//   aws.config.update({
//     "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
//     "secretAccessKey": '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',
//   });
//
//
//   return new Promise(async (resolve, reject) => {
//     // console.log("souj");
//       // console.log(req.files.river);
//     if(req.files.river){
//       var river = [];
//       await Promise.all(req.files.river.map(async(item) => {
//         console.log("in promise "+river.length);
//         // var _river=[];
//         customFieldName = item.fieldname;
//         customPath = item.path;
//         // customOriginalName= item.originalname;
//         bucketName="our-river-our-life-images/river";
//
//         const s3 = new aws.S3();
//         var params = {
//           ACL: 'public-read',
//           Bucket: bucketName,
//           Body: fs.createReadStream(item.path),
//           Key: item.originalname,
//         };
//
//         s3.upload(params, function (err, res) {
//
//           if (err) {
//             console.log('Error occured while trying to upload River to the S3 bucket', err);
//             res.send(err);
//           }if(res){
//
//             responseData.push(res);
//             console.log("Response data "+responseData);
//               console.log("Response data "+responseData.length);
//
//             if(responseData.length > 0 && responseData.length < responseData.length){
//
//               // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
//               responseData.forEach(function(element){
//                 // console.log("push");
//                 river.push(element.Location);
//                 // _river.push(element.Location);
//               });
//
//               // fs.unlinkSync(customPath); //
//             }
//
//           }
//
//
//         });
//
//
//
//       }));
//       console.log(river);
//    resolve(river);
//
//     }
//     else{
//       resolve([]);
//     }
//   });
// }
export const createWaterTestDetails = async(req, res, next) =>{
  // Promise.all([uploadFlora(req), uploadFauna(req),uploadArtwork(req),uploadGroupPicture(req), uploadActivity(req), uploadRiver(req)])
  Promise.all([uploadFlora(req)])

  .then(results => {
    // const total = results.reduce((p, c) => p + c);
    results.map(res=>{
      console.log("RESULTS");
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
