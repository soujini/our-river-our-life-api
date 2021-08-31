import { success, notFound } from '../../services/response/'
import { FishSanctuaries } from '.'
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')

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
    console.log("SOUJINI");
    console.log(req.files.sanctuaryPictures);
    console.log(req.files.sanctuaryPictures.length);
    if(req.files.sanctuaryPictures.imageURL){
      var sanctuaryPictures=[];
      let promises = req.files.sanctuaryPictures.imageURL.map((item) => {
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
    if(req.files.fishInformation){
      var fishInformation=[];
      let promises = req.files.speciesPictures.map((item) => {
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
  Promise.all([uploadSanctuaryPictures(req)])
    // , uploadFishInformation(req)
  .then(results => {

    console.log("SOUJANYA");
    // req.body.sanctuaryPictures = results[1];
    // req.body.fishInformation = results[2];
     console.log(results[1]);
     // console.log(results[2]);
    console.log(req.body);
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
