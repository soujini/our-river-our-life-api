// var pdf = require("pdf-creator-node");
var fs = require('fs');
var pdf = require('html-pdf');
// Read HTML Template
var html = fs.readFileSync(__dirname +'/pdf.html', 'utf8');

export const create = ({ body }, res, next) =>{
  var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      type: 'pdf',
      timeout: '100000'
  };

  var users = [
      {
          name:"Shyam",
          age:"26"
      },
      {
          name:"Navjot",
          age:"26"
      },
      {
          name:"Vitthal",
          age:"26"
      }

  ]
  var document = {
      html: html,
      data: {
          users: users
      },
      path: __dirname +"/output.pdf"
  };

  console.log("souji "+document);
  // pdf.create(document, options)
  //     .then(res => {
  //       console.log("sue");
  //         console.log(res)
  //     })
  //     .catch(error => {
  //         console.error(error)
  //     });

      pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log("sueeee "+res); // { filename: '/app/businesscard.pdf' }
      });
}


  //res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([])

export const show = ({ params }, res, next) =>
  res.status(200).json({})

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
  res.status(204).end()
