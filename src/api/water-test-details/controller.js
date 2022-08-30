import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'
// var PDFController = require('../pdf/controller')
import aws from 'aws-sdk';
import fs from 'fs';
var UserController = require('../user/controller')
var PDFController = require('../pdf/controller')

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

export const uploadToS3 = function (params) {
  return new Promise((resolve, reject) => {
    const s3 = new aws.S3();
    var responseData = [];
    s3.upload(params, function (err, res) {
      if (err) {
        console.log('Error occured while trying to upload Flora to the S3 bucket', err);
        res.send(err);
      } if (res) {
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

export const uploadFlora = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.floraFiles) {
      var flora = [];
      let promises = req.files.floraFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/flora";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };
        console.log(item.originalname);

        return uploadToS3(params).then(element => {
          flora.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });
}
export const uploadFauna = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.faunaFiles) {
      var fauna = [];
      let promises = req.files.faunaFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/fauna";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          fauna.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });
}
export const uploadArtwork = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.artworkFiles) {
      var artwork = [];
      let promises = req.files.artworkFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/artwork";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          artwork.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });
}
export const uploadGroupPicture = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.groupFiles) {
      var groupPicture = [];
      let promises = req.files.groupFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/groupPicture";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          groupPicture.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });

}
export const uploadActivity = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.activityFiles) {
      var activity = [];
      let promises = req.files.activityFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/activity";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          activity.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });
}
export const uploadRiver = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.riverFiles) {
      var river = [];
      let promises = req.files.riverFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/river";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          river.push({ imageURL: element });
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
    else {
      resolve([]);
    }
  });
}
export const uploadSurrounding = function (req) {
  var customOriginalName = "";
  var customPath = "";
  var customFieldName = "";
  var bucketName = "";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  return new Promise((resolve, reject) => {
    if (req.files.surroundingFiles) {
      var surrounding = [];
      let promises = req.files.surroundingFiles.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName = "our-river-our-life-images/surrounding";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          surrounding.push({ imageURL: element });
          return surrounding;
        });
      });

      Promise.all(promises)
        .then(results => {
          resolve(surrounding);
        })
        .catch(e => {
          console.error(e);
        })
    }
    else {
      resolve([]);
    }
  });
}
export const createWaterTestDetails = async (req, res, next) => {
  req.body['riverPictures'] = JSON.parse(req.body['riverPictures']);
  req.body['surroungingPictures'] = JSON.parse(req.body['surroungingPictures']);
  req.body['floraPictures'] = JSON.parse(req.body['floraPictures']);
  req.body['faunaPictures'] = JSON.parse(req.body['faunaPictures']);
  req.body['groupPictures'] = JSON.parse(req.body['groupPictures']);
  req.body['activityPictures'] = JSON.parse(req.body['activityPictures']);
  req.body['artworkPictures'] = JSON.parse(req.body['artworkPictures']);

  Promise.all([uploadFlora(req), uploadFauna(req), uploadArtwork(req), uploadGroupPicture(req), uploadActivity(req), uploadRiver(req), uploadSurrounding(req)])
    .then(results => {
      req.body.flora = results[0];
      req.body.fauna = results[1];
      req.body.artwork = results[2];
      req.body.groupPicture = results[3];
      req.body.activity = results[4];
      req.body.river = results[5];
      req.body.surrounding = results[6];
      // req.body.waterTesting=JSON.parse(JSON.stringify(req.body.waterTesting));
      // console.log("souj");
      //
      // req.body.waterTesting= { pH: '12', waterTemperature: '43', dissolvedOxygen: '33' },
      // req.body.waterTesting = JSON.stringify(req.body.waterTesting);
      //     console.log(req.body.waterTesting);
      WaterTestDetails.create(JSON.parse(JSON.stringify(req.body)))
        .then((waterTestDetails) => waterTestDetails.view(true))
        .then(success(res, 201))
        .catch(next)
    });
}


export const create = (req, res, next) => {
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
export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  WaterTestDetails.count(query)
    .then(count => WaterTestDetails.find(query, select, cursor)
      .then(async (waterTestDetails) => ({
        count,
        rows: await Promise.all(waterTestDetails.map(async (waterTestDetail) => {
          var params = { "userId": waterTestDetail['userId'] };
          var userId = waterTestDetail['userId'];
          var user = await UserController.getUser({ params });
          if (user != null) {
            waterTestDetail.contributorName = user.firstName != null && user.firstName != '' ? user.firstName : '' + ' ' + user.lastName != null && user.lastName != '' ? user.lastName : '';
          }
          return waterTestDetail.view();
        }))
      }))
    )
    .then(success(res))
    .catch(next)
}


export const show = ({ params }, res, next) => {
  WaterTestDetails.findById(params.id)
    .then(notFound(res))
    .then((waterTestDetails) => waterTestDetails ? waterTestDetails.view() : null)
    .then(success(res))
    .catch(next)
}

export const updateImage = async ({ params }, res, next) => {
  WaterTestDetails.findById(params.id, function (err, waterTestDetails) {
    if (waterTestDetails) {

      if (params.fieldName == 'flora') {
        waterTestDetails.flora.push({ imageURL: params.flora, description: params.description });
      }
      else if (params.fieldName == 'fauna') {
        waterTestDetails.fauna.push({ imageURL: params.fauna, description: params.description });
      }
      else if (params.fieldName == 'artwork') {
        waterTestDetails.artwork.push({ imageURL: params.artwork, description: params.description });
      }
      else if (params.fieldName == 'groupPicture') {
        waterTestDetails.groupPicture.push({ imageURL: params.groupPicture, description: params.description });
      }
      else if (params.fieldName == 'activity') {
        waterTestDetails.activity.push({ imageURL: params.activity, description: params.description });
      }
      else if (params.fieldName == 'river') {
        waterTestDetails.river.push({ imageURL: params.river, description: params.description });
      }
      else if (params.fieldName == 'surrounding') {
        waterTestDetails.river.push({ imageURL: params.surrounding, description: params.description });
      }
      else if (params.fieldName == 'certificate') {
        waterTestDetails.certificateURL = params.certificate;
      }
      waterTestDetails.save()
    }
    else {
      console.log('Water test details id is incorrect');
    }
  });
}

export const update = ({ bodymen: { body }, params }, res, next) => {
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
