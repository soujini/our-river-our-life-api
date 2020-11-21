import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'
// var PDFController = require('../pdf/controller')
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

export const uploadFiles = async (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";


  var responseData = [];
  var responseDataFlora = [];
  var responseDataFauna = [];
  var responseDataArtwork = [];
  var responseDataGroupPicture = [];
  var responseDataActivity = [];
  var responseDataRiver = [];

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  console.log("length");
  console.log(req.files.length);

  if(req.files.flora){
    console.log("in flora");
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

       s3.upload(params, function (err, data) {
        if (err) {
          console.log('Error occured while trying to upload Flora to the S3 bucket', err);
           res.send(err);
        }if(res){
          responseDataFlora.push(data);
          console.log("1");
          console.log(data);
          console.log(responseDataFlora);
          console.log(responseDataFlora.length);
          if(responseDataFlora.length > 0){
            console.log("here");
            // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});

            var flora=[];
            responseDataFlora.forEach(function(element){
              flora.push(element.Location);
              console.log("pushing");
              req.body.flora=flora;
            });

             console.log("Asti");
             console.log(req.body.flora);
            // fs.unlinkSync(customPath); //
          }
        }
      });
    });
  }
  // if(req.files.fauna){
  //   console.log("in fauna");
  //   req.files.fauna.map(async(item) => {
  //     customFieldName = item.fieldname;
  //     customPath = item.path;
  //     // customOriginalName= item.originalname;
  //     bucketName="our-river-our-life-images/fauna";
  //
  //     var params = {
  //       Bucket: bucketName,
  //       Key: item.originalname,
  //       Body: fs.createReadStream(item.path),
  //       ACL: 'public-read'
  //     };
  //      s3.upload(params, function (err, data) {
  //       if (err) {
  //         console.log('Error occured while trying to upload Fauna to the S3 bucket', err);
  //          res.send(err);
  //       }else{
  //         responseDataFauna.push(data);
  //         if(responseDataFauna.length > 0){
  //           // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
  //
  //           var fauna=[];
  //           responseDataFauna.forEach(function(element){
  //             fauna.push(element.Location)
  //           });
  //           req.body.fauna=fauna;
  //           //fs.unlinkSync(customPath); //
  //         }
  //       }
  //     });
  //   });
  // }
  // if(req.files.artwork){
  //   req.files.artwork.map(async(item) => {
  //     customFieldName = item.fieldname;
  //     customPath = item.path;
  //     // customOriginalName= item.originalname;
  //     bucketName="our-river-our-life-images/artwork";
  //
  //     var params = {
  //       Bucket: bucketName,
  //       Key: item.originalname,
  //       Body: fs.createReadStream(item.path),
  //       ACL: 'public-read'
  //     };
  //     await s3.upload(params, function (err, data) {
  //       if (err) {
  //         // res.json({ "error": true, "Message": err});
  //       }else{
  //         responseDataArtwork.push(data);
  //         if(responseDataArtwork.length > 0){
  //           // res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
  //
  //           var artwork=[];
  //           responseDataArtwork.forEach(function(element){
  //             artwork.push(element.Location)
  //           });
  //           req.body.artwork=artwork;
  //           //fs.unlinkSync(customPath); //
  //         }
  //       }
  //     });
  //   });
  // }
  // if(req.files.groupPicture){
  //   req.files.groupPicture.map(async(item) => {
  //     customFieldName = item.fieldname;
  //     customPath = item.path;
  //     // customOriginalName= item.originalname;
  //     bucketName="our-river-our-life-images/groupPicture";
  //
  //     var params = {
  //       Bucket: bucketName,
  //       Key: item.originalname,
  //       Body: fs.createReadStream(item.path),
  //       ACL: 'public-read'
  //     };
  //     await s3.upload(params, function (err, data) {
  //       if (err) {
  //         // res.json({ "error": true, "Message": err});
  //       }else{
  //         responseDataGroupPicture.push(data);
  //         if(responseDataGroupPicture.length > 0){
  //           //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
  //
  //           var groupPicture=[];
  //           responseDataGroupPicture.forEach(function(element){
  //             groupPicture.push(element.Location)
  //           });
  //           req.body.groupPicture=groupPicture;
  //           //fs.unlinkSync(customPath); //
  //         }
  //       }
  //     });
  //   });
  // }
  // if(req.files.activity){
  //   req.files.activity.map(async(item) => {
  //     customFieldName = item.fieldname;
  //     customPath = item.path;
  //     // customOriginalName= item.originalname;
  //     bucketName="our-river-our-life-images/activity";
  //
  //     var params = {
  //       Bucket: bucketName,
  //       Key: item.originalname,
  //       Body: fs.createReadStream(item.path),
  //       ACL: 'public-read'
  //     };
  //     await s3.upload(params, function (err, data) {
  //       if (err) {
  //         // res.json({ "error": true, "Message": err});
  //       }else{
  //         responseDataActivity.push(data);
  //         if(responseDataActivity.length > 0){
  //           //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
  //
  //           var activity=[];
  //           responseDataActivity.forEach(function(element){
  //             activity.push(element.Location)
  //           });
  //           req.body.activity=activity;
  //           //fs.unlinkSync(customPath); //
  //         }
  //       }
  //     });
  //   });
  // }
  // if(req.files.river){
  //   await req.files.river.map(async(item) => {
  //     customFieldName = item.fieldname;
  //     customPath = item.path;
  //     // customOriginalName= item.originalname;
  //     bucketName="our-river-our-life-images/river";
  //
  //     var params = {
  //       Bucket: bucketName,
  //       Key: item.originalname,
  //       Body: fs.createReadStream(item.path),
  //       ACL: 'public-read'
  //     };
  //     s3.upload(params, function (err, data) {
  //       if (err) {
  //         // res.json({ "error": true, "Message": err});
  //       }else{
  //         responseDataRiver.push(data);
  //         if(responseDataRiver.length > 0){
  //           //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
  //
  //           var river=[];
  //           responseDataRiver.forEach(function(element){
  //             river.push(element.Location)
  //           });
  //           req.body.activity=activity;
  //           //fs.unlinkSync(customPath);
  //         }
  //
  //       }
  //     });
  //   });
  // }
  console.log("sue");
  console.log(req.body);
}

export const createWaterTestDetails = async(req, res, next) =>{



  const file = req.files;
  if(req.files){
    var a = await uploadFiles(req);
    console.log("wah");
    console.log(a);
    // console.log(req.body);
    res.status(200).send("Images uploaded successfully");

    //Create Water Test Details
    // console.log(flora);
    // console.log(fauna);
    // console.log(artwork);
    // console.log(groupPicture);
    // console.log(activity);
    // console.log(river);
    //create here
  }

  else{//No files
    //params without files
  }


  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.log('Error occured while trying to upload to S3 bucket', err);
  //     res.status(500).send(err);
  //   }
  //
  //   if (res) {
  //     var params ="";
  //     fs.unlinkSync(customPath); // Empty temp folder
  //     const locationUrl = data.Location;
  //     // customOriginalName = "5ed5cd1e1177d200176877a6_filename.png"
  //     // var waterTestDetailsId = customOriginalName.split('_');
  //
  //     if(customFieldName == 'flora'){
  //       params = {"id":waterTestDetailsId, "flora":locationUrl, "fieldName":"flora", "description":description}
  //     }
  //     else if(customFieldName == 'fauna'){
  //       params = {"id":waterTestDetailsId, "fauna":locationUrl, "fieldName":"fauna", "description":description}
  //     }
  //     else if(customFieldName == 'artwork'){
  //       params = {"id":waterTestDetailsId, "artwork":locationUrl, "fieldName":"artwork", "description":description}
  //     }
  //     else if(customFieldName == 'groupPicture'){
  //       params = {"id":waterTestDetailsId, "groupPicture":locationUrl, "fieldName":"groupPicture", "description":description}
  //     }
  //     else if(customFieldName == 'activity'){
  //       params = {"id":waterTestDetailsId, "activity":locationUrl, "fieldName":"activity", "description":description}
  //     }
  //     else if(customFieldName == 'river'){
  //       params = {"id":waterTestDetailsId, "river":locationUrl, "fieldName":"river", "description":description}
  //     }
  //     if(params != ""){
  //       WaterTestDetailsController.updateImage({params})
  //     }
  //     res.status(200).send("Image uploaded successfully");
  //   }
  // });
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
