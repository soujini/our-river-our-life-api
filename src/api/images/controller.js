import { success, notFound } from '../../services/response/'
import { Images } from '.'

import aws from 'aws-sdk';
import fs from 'fs';


export const upload = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });
  console.log("kirti")
  if(req.files.flora){
    customFieldName = req.files.flora[0].fieldname;
    customPath = req.files.flora[0].path;
    customOriginalName= req.files.flora[0].originalname;
    bucketName="our-rive-our-life-images/flora";
  }
  else if(req.files.fauna){
    customFieldName = req.files.fauna[0].fieldname;
    customPath = req.files.fauna[0].path;
    customOriginalName= req.files.fauna[0].originalname;
    bucketName="our-rive-our-life-images/fauna";
  }
  else if(req.files.artwork){
    customFieldName = req.files.artwork[0].fieldname;
    customPath = req.files.artwork[0].path;
    customOriginalName= req.files.artwork[0].originalname;
    bucketName="our-rive-our-life-images/artwork";
  }
  else if(req.files.groupPicture){
    customFieldName = req.files.groupPicture[0].fieldname;
    customPath = req.files.groupPicture[0].path;
    customOriginalName= req.files.groupPicture[0].originalname;
    bucketName="our-rive-our-life-images/groupPicture";
  }
  else if(req.files.activity){
    customFieldName = req.files.activity[0].fieldname;
    customPath = req.files.activity[0].path;
    customOriginalName= req.files.activity[0].originalname;
    bucketName="our-rive-our-life-images/activity";
  }

  const s3 = new aws.S3();
  var params = {
    ACL: 'public-read',
    Bucket: bucketName,
    Body: fs.createReadStream(customPath),
    Key: `our-rive-our-life-images/${customOriginalName}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
      var params ="";
      fs.unlinkSync(customPath); // Empty temp folder
      const locationUrl = data.Location;
      customOriginalName = "5ed5cd1e1177d200176877a6_filename.png"
      var waterTestDetailsId = customOriginalName.split('_');
      console.log("watertestdetailsid")
      console.log(waterTestDetailsId[0])

      if(customFieldName == 'flora'){
        params = {"id":waterTestDetailsId[0], "flora":locationUrl, "fieldName":"flora"}
      }
      else if(customFieldName == 'fauna'){
        params = {"id":waterTestDetailsId[0], "fauna":locationUrl, "fieldName":"fauna"}
      }
      else if(customFieldName == 'artwork'){
        params = {"id":waterTestDetailsId[0], "artwork":locationUrl, "fieldName":"artwork"}
      }
      else if(customFieldName == 'groupPicture'){
        params = {"id":waterTestDetailsId[0], "fauna":locationUrl, "fieldName":"groupPicture"}
      }
      else if(customFieldName == 'activity'){
        params = {"id":waterTestDetailsId[0], "fauna":locationUrl, "fieldName":"activity"}
      }
      if(params != ""){
        WaterTestDetailsController.updateImage({params})
      }
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
