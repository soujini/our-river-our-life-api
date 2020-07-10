let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
// var html = fs.readFileSync(__dirname +'/report-template.ejs', 'utf8');
import aws from 'aws-sdk';

export const generateReport = (req, res, next) => {
  console.log("in generate report ")
  console.log(req)
  ejs.renderFile(path.join(__dirname, "/report-template.ejs"), {
    waterTestDetails: req
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

          var params = {
            ACL: 'public-read',
            Bucket: "our-river-our-life-images/certificate",
            Key: `file1`,
            Body: data,
            ContentEncoding: "buffer",
            ContentType: "application/pdf"
          };

          s3.upload(params, function(err, data) {
            if (err) {
              console.log(err);
              console.log("Error uploading data: ", data);
            } else {
              console.log('Data: ',data)
              console.log("data: ", data.Location);
              console.log("succesfully uploaded pdf!");
            }

          });
        }
      }); //pdf create
    }//else
    res.send("File created successfully");
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
      if(params != ""){
        WaterTestDetailsController.updateImage({params})
      }
      res.status(200).send("Image uploaded successfully");
    }
  });
}
export const create = ({ body }, res, next)=>
res.status(201).json(body)

// export const create = ({ body }, res, next) =>{
//   var options = {
//       format: "A3",
//       orientation: "portrait",
//       border: "10mm",
//       // type: 'pdf',
//       timeout: '100000'
//   };
//
//   var users = [
//       {
//           name:"Shyam",
//           age:"26"
//       },
//       {
//           name:"Navjot",
//           age:"26"
//       },
//       {
//           name:"Vitthal",
//           age:"26"
//       }
//
//   ]
//   var document = {
//       html: html,
//       data: {
//           users: users
//       },
//       path: __dirname +"/output.pdf"
//   };
//
//   console.log("souji "+document);
//   // pdf.create(document, options)
//   //     .then(res => {
//   //       console.log("sue");
//   //         console.log(res)
//   //     })
//   //     .catch(error => {
//   //         console.error(error)
//   //     });
//
//       pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//         if (err) return console.log(err);
//         console.log("sueeee "+res); // { filename: '/app/businesscard.pdf' }
//       });
//       res.status(201).json({'message':'PDF Created successfully'});
//        // res.send('Phone Number is incorrect');
// }


//res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
res.status(200).json([])

export const show = ({ params }, res, next) =>
res.status(200).json({})

export const update = ({ body, params }, res, next) =>
res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
res.status(204).end()
