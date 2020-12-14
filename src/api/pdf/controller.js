let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
import aws from 'aws-sdk';
var WaterTestDetailsController = require('../water-test-details/controller')

export const generateReport = (req, res, next) => {
  var waterTestDetailsId=req.body.id;
  var certificateURL="";
  ejs.renderFile(path.join(__dirname, "/report-template.ejs"), {
    waterTestDetails: req.body
  }, (err, data) => {
    if (err) {
      res.send("Error in report template "+err);
    } else {
      let options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
          "height": "20mm",
        },
        "footer": {
          "height": "20mm",
        },

      };
      pdf.create(data, options).toBuffer(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          console.log('This is a buffer:', data);

          aws.config.setPromisesDependency();
          aws.config.update({
            "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
            "secretAccessKey": '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',
          });

          const s3 = new aws.S3();
          console.log("here "+req.body.id)

          var params = {
            ACL: 'public-read',
            Bucket: "our-river-our-life-images/certificate",
            Key: `certificate_`+req.body.id,
            Body: data,
            ContentEncoding: "buffer",
            ContentType: "application/pdf"
          };

          s3.upload(params, function(err, data) {

            if (err) {
              console.log(err);
              console.log("Error uploading data: ", data);
            } else {
              certificateURL=data.Location;
              console.log("url "+certificateURL)
              console.log('Data: ',data)
              console.log("data: ", data.Location)
              console.log("succesfully uploaded pdf!")
              params = {"id":req.body.id, "certificate":data.Location, "fieldName":"certificate"}

              WaterTestDetailsController.updateImage({params})
            }

          });
          var  x= "https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_"+waterTestDetailsId;
          res.status(200).json({certificateURL:x})
        }
      }); //pdf create
    }//else
  });
}
export const generateReportWeb = async (req, res, next) => {
  console.log(req);
  console.log("in gen report "+req.id);
  var waterTestDetailsId =req.id;
  var certificateURL="";
  ejs.renderFile(path.join(__dirname, "/report-template.ejs"), {
    waterTestDetails: req
  }, (err, data) => {
    if (err) {
      err.send("Error in report template "+err);
    } else {
      let options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
          "height": "20mm",
        },
        "footer": {
          "height": "20mm",
        },

      };
      await pdf.create(data, options).toBuffer(function (err, data) {
        if (err) {
          data.send(err);
        } else {
          console.log('This is a buffer:', data);

          aws.config.setPromisesDependency();
          aws.config.update({
            "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
            "secretAccessKey": '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',
          });

          const s3 = new aws.S3();
          console.log("here "+req.id)

          var params = {
            ACL: 'public-read',
            Bucket: "our-river-our-life-images/certificate",
            Key: `certificate_`+req.id,
            Body: data,
            ContentEncoding: "buffer",
            ContentType: "application/pdf"
          };

          await s3.upload(params, async function(err, data) {

            if (err) {
              console.log(err);
              console.log("Error uploading data: ", data);
            } else {
              certificateURL=data.Location;
              // console.log("url "+certificateURL)
              // console.log('Data: ',data)
              // console.log("data: ", data.Location)
              console.log("succesfully uploaded pdf!")
              params = {"id":waterTestDetailsId, "certificate":data.Location, "fieldName":"certificate"}
              //console.log(params);
               await WaterTestDetailsController.updateImage({params})
               certificateURL= "https://our-river-our-life-images.s3.amazonaws.com/certificate/certificate_"+waterTestDetailsId;
               // res.send({"certificateURL:"+certificateURL});
               console.log("sue "+certificateURL);
               // return certificateURL;
                // data.send({certificateURL:certificateURL})
            }
 console.log("sue1 "+certificateURL);
          });

 console.log("sue2 "+certificateURL);

            //return certificateURL;
          // res.status(200).json({certificateURL:x})
        }
          res.status(200).json({certificateURL:certificateURL})
         console.log("sue3 "+certificateURL);
      }); //pdf create
 console.log("sue 4"+certificateURL);
      // data.send({"certificateURL:"+certificateURL});
    }//else
     console.log("sue5 "+certificateURL);
  });
}

export const upload = (req, res, next) =>{
  var customOriginalName="";
  var customPath="";
  var customFieldName="";
  var bucketName="";
  var waterTestDetailsId = req.body.waterTestDetailsId;
  var description = req.body.description;

  aws.config.setPromisesDependency();
  aws.config.update({
    "accessKeyId": 'AKIAJ24JCG5UUXOOHKDA',
    "secretAccessKey": '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',
  });

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
export const create = ({ body }, res, next)=>
res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
res.status(200).json([])

export const show = ({ params }, res, next) =>
res.status(200).json({})

export const update = ({ body, params }, res, next) =>
res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
res.status(204).end()
