import { success, notFound } from '../../services/response/'
import { Images } from '.'
var WaterTestDetailsController = require('../water-test-details/controller')

import aws from 'aws-sdk';
import fs from 'fs';


export const upload = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var waterTestDetailsId = req.body.waterTestDetailsId;
  var description = req.body.description;

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIA4UTPTWGNMBJWA7UL',
    "secretAccessKey": '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',
  });

  // if(req && req.files){

  if(req.files.flora){
    customFieldName = req.files.flora[0].fieldname;
    customPath = req.files.flora[0].path;
    customOriginalName= req.files.flora[0].originalname;
    bucketName="our-river-our-life-images/flora";

  }
  else if(req.files.fauna){
    customFieldName = req.files.fauna[0].fieldname;
    customPath = req.files.fauna[0].path;
    customOriginalName= req.files.fauna[0].originalname;
    bucketName="our-river-our-life-images/fauna";
  }
  else if(req.files.artwork){
    customFieldName = req.files.artwork[0].fieldname;
    customPath = req.files.artwork[0].path;
    customOriginalName= req.files.artwork[0].originalname;
    bucketName="our-river-our-life-images/artwork";
  }
  else if(req.files.groupPicture){
    customFieldName = req.files.groupPicture[0].fieldname;
    customPath = req.files.groupPicture[0].path;
    customOriginalName= req.files.groupPicture[0].originalname;
    bucketName="our-river-our-life-images/groupPicture";
  }
  else if(req.files.activity){
    customFieldName = req.files.activity[0].fieldname;
    customPath = req.files.activity[0].path;
    customOriginalName= req.files.activity[0].originalname;
    bucketName="our-river-our-life-images/activity";
  }
  else if(req.files.river){
    customFieldName = req.files.river[0].fieldname;
    customPath = req.files.river[0].path;
    customOriginalName= req.files.river[0].originalname;
    bucketName="our-river-our-life-images/river";
  }

  const s3 = new aws.S3();
  var params = {
    ACL: 'public-read',
    Bucket: bucketName,
    Body: fs.createReadStream(customPath),
    Key: `${customOriginalName}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
       res.status(500).send(err);
    }

    if (res) {
      var params ="";
      fs.unlinkSync(customPath); // Empty temp folder
      const locationUrl = data.Location;
      // customOriginalName = "5ed5cd1e1177d200176877a6_filename.png"
      // var waterTestDetailsId = customOriginalName.split('_');

      if(customFieldName == 'flora'){
        params = {"id":waterTestDetailsId, "flora":locationUrl, "fieldName":"flora", "description":description}
      }
      else if(customFieldName == 'fauna'){
        params = {"id":waterTestDetailsId, "fauna":locationUrl, "fieldName":"fauna", "description":description}
      }
      else if(customFieldName == 'artwork'){
        params = {"id":waterTestDetailsId, "artwork":locationUrl, "fieldName":"artwork", "description":description}
      }
      else if(customFieldName == 'groupPicture'){
        params = {"id":waterTestDetailsId, "groupPicture":locationUrl, "fieldName":"groupPicture", "description":description}
      }
      else if(customFieldName == 'activity'){
        params = {"id":waterTestDetailsId, "activity":locationUrl, "fieldName":"activity", "description":description}
      }
      else if(customFieldName == 'river'){
        params = {"id":waterTestDetailsId, "river":locationUrl, "fieldName":"river", "description":description}
      }
      if(params != ""){
        WaterTestDetailsController.updateImage({params})
      }
      res.status(200).send("Image uploaded successfully");
    }
  });
}

export const create = ({ bodymen: { body } }, res, next) =>
  Images.create(body)
    .then((images) => images.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Images.count(query)
    .then(count => Images.find(query, select, cursor)
      .then((images) => ({
        count,
        rows: images.map((images) => images.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Images.findById(params.id)
    .then(notFound(res))
    .then((images) => images ? images.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Images.findById(params.id)
    .then(notFound(res))
    .then((images) => images ? Object.assign(images, body).save() : null)
    .then((images) => images ? images.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Images.findById(params.id)
    .then(notFound(res))
    .then((images) => images ? images.remove() : null)
    .then(success(res, 204))
    .catch(next)
