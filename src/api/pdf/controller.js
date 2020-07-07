let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
// var html = fs.readFileSync(__dirname +'/report-template.ejs', 'utf8');
import aws from 'aws-sdk';

// let students = [
//   {name: "Joy",
//   email: "joy@example.com",
//   city: "New York",
//   country: "USA"},
//   {name: "John",
//   email: "John@example.com",
//   city: "San Francisco",
//   country: "USA"},
//   {name: "Clark",
//   email: "Clark@example.com",
//   city: "Seattle",
//   country: "USA"},
//   {name: "Watson",
//   email: "Watson@example.com",
//   city: "Boston",
//   country: "USA"},
//   {name: "Tony",
//   email: "Tony@example.com",
//   city: "Los Angels",
//   country: "USA"
// }];

let waterTestDetails = {

"userId":"5edb45983b3f8d191876a8f3",

"generalInformation":{
"activityDate":"",
"testerName":"Aravind A",
"location":"Bengaluru",
"latitude":12.9716,
"longitude":77.5946
},
"waterLevelAndWeather":{
"airTemperature":28,
"waterLevel":"High",
"weather":"Heavy Rain"
},
"surroundings":["factory", "river"],
"waterTesting":{
"waterTemperature":"26",
"pH":"6.5",
"dissolvedOxygen":"1",
"hardness":"2",
"nitrate":"10",
"nitrite":"8",
"chlorine":"6",
"alkalinity":"5",
"iron":"6",
"bacteria":"2",
"turbidity":"2"
}
};

export const generateReport = ({ body }, res, next) => {
  ejs.renderFile(path.join(__dirname, "/report-template.ejs"), {
    students: students
  }, (err, data) => {
    if (err) {
      res.send(err);
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
          // var params = {
          //   ACL: 'public-read',
          //   Bucket: "our-river-our-life-images/certificate",
          // };
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
            res.send("File created successfully");
          });

        }
      }); //pdf create
    }//else
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
