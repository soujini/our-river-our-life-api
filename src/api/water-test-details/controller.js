import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'
// var PDFController = require('../pdf/controller')
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

export const createWaterTestDetails = (req, res, next) =>{
  console.log("in create");
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  const file = req.files;
  console.log("length ");
  console.log(req);
  console.log(req.files);
  if(req.files){
    const s3 = new aws.S3();
    var responseData = [];

    // req.files.flora.map((item) => {
    //   customFieldName = item.fieldname;
    //   // customPath = item.path;
    //   // customOriginalName= item.originalname;
    //   bucketName="our-river-our-life-images/flora";
    //
    //   var params = {
    //     Bucket: bucketName,
    //     Key: item.originalname,
    //     Body: fs.createReadStream(item.path),
    //     ACL: 'public-read'
    //   };
    //
    //   s3.upload(params, function (err, data) {
    //     if (err) {
    //       res.json({ "error": true, "Message": err});
    //     }else{
    //       responseData.push(data);
    //       if(responseData.length == file.length){
    //         //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //
    //         var flora=[];
    //         responseData.forEach(function(element){
    //           flora.push(element.Location)
    //         });
    //         var params ="";
    //         fs.unlinkSync(customPath); //
    //       }
    //     }
    //   });
    // });
    // req.files.fauna.map((item) => {
    //   customFieldName = item.fieldname;
    //   // customPath = item.path;
    //   // customOriginalName= item.originalname;
    //   bucketName="our-river-our-life-images/fauna";
    //
    //   var params = {
    //     Bucket: bucketName,
    //     Key: item.originalname,
    //     Body: fs.createReadStream(item.path),
    //     ACL: 'public-read'
    //   };
    //   s3.upload(params, function (err, data) {
    //     if (err) {
    //       res.json({ "error": true, "Message": err});
    //     }else{
    //       responseData.push(data);
    //       if(responseData.length == file.length){
    //         //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //
    //         var fauna=[];
    //         responseData.forEach(function(element){
    //           fauna.push(element.Location)
    //         });
    //         var params ="";
    //         fs.unlinkSync(customPath); //
    //       }
    //     }
    //   });
    // });
    req.files.artwork.map((item) => {
      console.log("in artwork map ");
      console.log(item);
      customFieldName = item.fieldname;
      // customPath = item.path;
      // customOriginalName= item.originalname;
      bucketName="our-river-our-life-images/artwork";

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

            var artwork=[];
            responseData.forEach(function(element){
              console.log("souji ma "+element.Location);
              artwork.push(element.Location)
            });
            var params ="";
            fs.unlinkSync(customPath); //
          }
        }
      });
    });
    // req.files.groupPicture.map((item) => {
    //   customFieldName = item.fieldname;
    //   // customPath = item.path;
    //   // customOriginalName= item.originalname;
    //   bucketName="our-river-our-life-images/groupPicture";
    //
    //   var params = {
    //     Bucket: bucketName,
    //     Key: item.originalname,
    //     Body: fs.createReadStream(item.path),
    //     ACL: 'public-read'
    //   };
    //   s3.upload(params, function (err, data) {
    //     if (err) {
    //       res.json({ "error": true, "Message": err});
    //     }else{
    //       responseData.push(data);
    //       if(responseData.length == file.length){
    //         //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //
    //         var groupPicture=[];
    //         responseData.forEach(function(element){
    //           groupPicture.push(element.Location)
    //         });
    //         var params ="";
    //         fs.unlinkSync(customPath); //
    //       }
    //     }
    //   });
    // });
    // req.files.activity.map((item) => {
    //   customFieldName = item.fieldname;
    //   // customPath = item.path;
    //   // customOriginalName= item.originalname;
    //   bucketName="our-river-our-life-images/activity";
    //
    //   var params = {
    //     Bucket: bucketName,
    //     Key: item.originalname,
    //     Body: fs.createReadStream(item.path),
    //     ACL: 'public-read'
    //   };
    //   s3.upload(params, function (err, data) {
    //     if (err) {
    //       res.json({ "error": true, "Message": err});
    //     }else{
    //       responseData.push(data);
    //       if(responseData.length == file.length){
    //         //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //
    //         var activity=[];
    //         responseData.forEach(function(element){
    //           activity.push(element.Location)
    //         });
    //         var params ="";
    //         fs.unlinkSync(customPath); //
    //       }
    //     }
    //   });
    // });
    // req.files.river.map((item) => {
    //   customFieldName = item.fieldname;
    //   // customPath = item.path;
    //   // customOriginalName= item.originalname;
    //   bucketName="our-river-our-life-images/river";
    //
    //   var params = {
    //     Bucket: bucketName,
    //     Key: item.originalname,
    //     Body: fs.createReadStream(item.path),
    //     ACL: 'public-read'
    //   };
    //   s3.upload(params, function (err, data) {
    //     if (err) {
    //       res.json({ "error": true, "Message": err});
    //     }else{
    //       responseData.push(data);
    //       if(responseData.length == file.length){
    //         //res.json({ "error": false, "message": "File Uploaded SuceesFully", data: responseData});
    //
    //         var river=[];
    //         responseData.forEach(function(element){
    //           river.push(element.Location)
    //         });
    //         var params ="";
    //         fs.unlinkSync(customPath);
    //       }
    //     }
    //   });
    // });

    // console.log(flora);
    // console.log(fauna);
    console.log(artwork);
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
