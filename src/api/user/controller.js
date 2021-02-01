import { success, notFound } from '../../services/response/'
import { User } from '.'
import aws from 'aws-sdk';
import fs from 'fs';

var ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

export const create = ({ bodymen: { body } }, res, next) =>{
User.create(body)
.then((user) => user.view(true))
.then(success(res, 201))
.catch(next)
}
export const auth = ({ bodymen: { body } }, res, next) =>{
  // Filter user from the users array by username and password
  if(body.phoneNumber != null)
  {
    User.findOne({phoneNumber: body.phoneNumber}, function(err,user){
      if(user){
        // Generate an access token
        const accessToken = jwt.sign({ phoneNumber: user.phoneNumber }, accessTokenSecret);
        res.json({
          user,
          accessToken
        });
      }
      else{
        res.send('Phone Number is incorrect');
      }
    });
  }
  else{
    User.findOne({email: body.email}, function(err,user){
      if(user){
        // Generate an access token
        const accessToken = jwt.sign({ email: user.email }, accessTokenSecret);
        res.json({
          user,
          accessToken
        });
      }
      else{
        res.send('Email is incorrect');
      }
    });
  }
}
export const signIn = ({ bodymen: { body } }, res, next) =>{
  User.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber},{new: true, upsert: true })
  .then((user) => (user.view(true)))
  .then(success(res, 201))
  .catch(next)
}
export const signInWeb = ({ bodymen: { body } }, res, next) => {
  User.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber, email:body.email, firstName:body.firstName, lastName:body.lastName},{new: true, upsert: true })
  .then((user) => (user.view(true)))
  .then(success(res, 201))
  .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  User.count(query)
  .then(count => User.find(query, select, cursor)
  .then((users) => ({
    count,
    rows: users.map((user) => user.view())
  }))
)
.then(success(res))
.catch(next)
}
export const getUser = async ({ params }, res, next) =>{
  console.log("userId "+params.userId);
  var user = await User.findById(params.userId);
  return user;
}
export const show = ({ params }, res, next) => {
User.findById(params.id)
.then(notFound(res))
.then((user) => user ? user.view() : null)
.then(success(res))
.catch(next)
}
export const update = ({ bodymen: { body }, params }, res, next) =>{
  User.findById(params.id)
  .then(notFound(res))
  .then((user) => user ? Object.assign(user, body).save() : null)
  .then((user) => user ? user.view(true) : null)
  .then(success(res))
  .catch(next)
}
export const updateProfile = (req, res, next) =>{
  var customOriginalName="avatar_"+req.body.id+"_"+Date.now();
  var customPath="";
  var customFieldName="";
  var bucketName="our-river-our-life-images/users";

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

  const file = req.files;
  if(req.files.length > 0){
    const s3 = new aws.S3();
    var responseData = [];

    file.map((item) => {
      var params = {
        Bucket: bucketName,
        Key: customOriginalName,
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
            var avatarURL=[];
            responseData.forEach(function(element){
              avatarURL.push(element.Location)
            });

            var params1 = {
              email:req.body.email,
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              phoneNumber:req.body.phoneNumber,
              avatarURL:avatarURL
            };
            var id = req.body.id;
            if(params1 != ""){
              User.findById(id)
              .then(notFound(res))
              .then((user) => user ? Object.assign(user, params1).save() : null)
              .then((user) => user ? user.view(true) : null)
              .then(success(res))
              .catch(next)
            }
          }
        }
      });
    });
  }
  else{
    var id = req.body.id;
    var params1 = {
      email:req.body.email,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      phoneNumber:req.body.phoneNumber,
    };
    User.findById(id)
    .then(notFound(res))
    .then((user) => user ? Object.assign(user, params1).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
  }
}
export const destroy = ({ params }, res, next) =>
User.findById(params.id)
.then(notFound(res))
.then((user) => user ? user.remove() : null)
.then(success(res, 204))
.catch(next)
