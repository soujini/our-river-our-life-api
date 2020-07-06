// var pdf = require("pdf-creator-node");
var fs = require('fs');
var pdf = require('html-pdf');
// Read HTML Template
let ejs = require("ejs");
var html = fs.readFileSync(__dirname +'/pdf.html', 'utf8');

let students = [
   {name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA"},
   {name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA"},
   {name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA"},
   {name: "Watson",
    email: "Watson@example.com",
    city: "Boston",
    country: "USA"},
   {name: "Tony",
    email: "Tony@example.com",
    city: "Los Angels",
    country: "USA"
}];

export const generateReport = ({ body }, res, next) =>{
  ejs.renderFile(path.join(__dirname +"/report-template.ejs"), {students: students}, (err, data) => {
if (err) {
      res.send(err);
} else {
    let options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
            "height": "20mm"
        },
        "footer": {
            "height": "20mm",
        },
    };
    pdf.create(data, options).toFile("report.pdf", function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send("File created successfully");
        }
    });
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
