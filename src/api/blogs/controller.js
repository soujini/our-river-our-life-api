import { success, notFound } from '../../services/response/'
import { Blogs } from '.'
import aws from 'aws-sdk';
import fs from 'fs';

export const createBlog = (req,res,next)=>{
  Promise.all([uploadFeaturedPhoto(req), uploadAdditionalFeaturedPhotos(req)])
  .then(results => {
    console.log("create");
    console.log(results[0]);
    console.log(results[1]);
    req.body.featuredPhoto = {imageURL: results[0]};
    req.body.featuredAdditionalPhotos = {imageURL : results[1]};
    Blogs.create(JSON.parse(JSON.stringify(req.body)))
    .then((waterTestDetails) => waterTestDetails.view(true))
    .then(success(res, 201))
    .catch(next)
  });

}
export const uploadAdditionalFeaturedPhotos =  function(req) {
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
    if(req.files.additionalFeaturedPhotos){
      var additionalFeaturedPhotos=[];
      let promises = req.files.additionalFeaturedPhotos.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/blogs";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          additionalFeaturedPhotos.push({imageURL:element});
          return additionalFeaturedPhotos;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(additionalFeaturedPhotos);
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
export const uploadFeaturedPhoto =  function(req) {
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
    if(req.files.featuredPhoto){
      var featuredPhoto=[];
      let promises = req.files.featuredPhoto.map((item) => {
        customFieldName = item.fieldname;
        customPath = item.path;
        bucketName="our-river-our-life-images/blogs";

        var params = {
          ACL: 'public-read',
          Bucket: bucketName,
          Body: fs.createReadStream(item.path),
          Key: item.originalname,
        };

        return uploadToS3(params).then(element => {
          // featuredPhoto.push({imageURL:element});
          featuredPhoto.imageURL=element;
          return featuredPhoto;
        });
      });

      Promise.all(promises)
      .then(results => {
        resolve(featuredPhoto);
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
export const create = ({ bodymen: { body } }, res, next) =>
  Blogs.create(body)
    .then((blogs) => blogs.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Blogs.count(query)
    .then(count => Blogs.find(query, select, cursor)
      .then((blogs) => ({
        count,
        rows: blogs.map((blogs) => blogs.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? blogs.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? Object.assign(blogs, body).save() : null)
    .then((blogs) => blogs ? blogs.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Blogs.findById(params.id)
    .then(notFound(res))
    .then((blogs) => blogs ? blogs.remove() : null)
    .then(success(res, 204))
    .catch(next)
