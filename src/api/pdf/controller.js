var pdf = require("pdf-creator-node");
var fs = require('fs');
// Read HTML Template
var html = fs.readFileSync('./templates/pdf.html', 'utf8');

export const create = ({ body }, res, next) =>{
  var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm"
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
      path: "./output.pdf"
  };

  console.log("souji "+document);
  pdf.create(document, options)
      .then(res => {
          console.log(res)
      })
      .catch(error => {
          console.error(error)
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
