import { success, notFound } from '../../services/response/'
import { FishSanctuaries } from '.'
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

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
export const uploadSanctuaryPictures = function(req) {
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
    // console.log(req.files.sanctuaryPictures.length);
    var sanctuaryPictures=[];
    if(req.files.sanctuaryFiles){

      let promises = req.files.sanctuaryFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/fish-sanctuary";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          sanctuaryPictures.push({imageURL:element});
          return sanctuaryPictures;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(sanctuaryPictures);
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
export const uploadSpeciesPictures = function(req) {
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
      var fishInformation=[];
    if(req.files.speciesFiles){
      console.log(req.files.speciesFiles);

      let promises = req.files.speciesFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/species";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          fishInformation.push({imageURL:element});
          return fishInformation;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(fishInformation);
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
export const createFishSanctuary = async(req, res, next) =>{
  Promise.all([uploadSanctuaryPictures(req),uploadSpeciesPictures(req)])
    // , uploadFishInformation(req)
  .then(results => {
    console.log("SOUJANYA0");
console.log(results[1]);
    console.log("SOUJANYA1");
    // req.body.sanctuaryPictures = results[1];
    // req.body.fishInformation = results[2];
     console.log(results[1]);
     console.log("SOUJANYA2");
      console.log(results[2]);
    // req.body.waterTesting=JSON.parse(JSON.stringify(req.body.waterTesting));
    // console.log("souj");
    //
    // req.body.waterTesting= { pH: '12', waterTemperature: '43', dissolvedOxygen: '33' },
    // req.body.waterTesting = JSON.stringify(req.body.waterTesting);
    //     console.log(req.body.waterTesting);


    FishSanctuaries.create(JSON.parse(JSON.stringify(req.body)))
    .then((fishSanctuaries) => fishSanctuaries.view(true))
    .then(success(res, 201))
    .catch(next)
  });
}
export const create = ({ bodymen: { body } }, res, next) =>
  FishSanctuaries.create(body)
    .then((fishSanctuaries) => fishSanctuaries.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FishSanctuaries.count(query)
    .then(count => FishSanctuaries.find(query, select, cursor)
      .then((fishSanctuaries) => ({
        count,
        rows: fishSanctuaries.map((fishSanctuaries) => fishSanctuaries.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  FishSanctuaries.findById(params.id)
    .then(notFound(res))
    .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  FishSanctuaries.findById(params.id)
    .then(notFound(res))
    .then((fishSanctuaries) => fishSanctuaries ? Object.assign(fishSanctuaries, body).save() : null)
    .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  FishSanctuaries.findById(params.id)
    .then(notFound(res))
    .then((fishSanctuaries) => fishSanctuaries ? fishSanctuaries.remove() : null)
    .then(success(res, 204))
    .catch(next)
