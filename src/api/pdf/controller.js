// var pdf = require("pdf-creator-node");
var fs = require('fs');
// var pdf = require('html-pdf');
// // Read HTML Template
// let ejs = require("ejs");
// let path = require("path");
// var html = fs.readFileSync(__dirname +'/report-template.ejs', 'utf8');
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

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
  console.log("in report")
  try {
    (async () => {
        var dataBinding = {
            items: [{
                name: "item 1",
                price: 100
            },
            {
                name: "item 2",
                price: 200
            },
            {
                name: "item 3",
                price: 300
            }
            ],
            total: 600,
            isWatermark: true
        }

        var templateHtml = fs.readFileSync(__dirname +'/report-template.ejs', 'utf8');
        var template = handlebars.compile(templateHtml);
        var finalHtml = template(dataBinding);
        var options = {
            format: 'A4',
            headerTemplate: "<p></p>",
            footerTemplate: "<p></p>",
            displayHeaderFooter: false,
            margin: {
                top: "40px",
                bottom: "100px"
            },
            printBackground: true,
            path: 'invoice.pdf'
        }

        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(`data:text/html,${finalHtml}`, {
            waitUntil: 'networkidle0'
        });
        await page.pdf(options);
        await browser.close();

        console.log('Done: invoice.pdf is created!')
    })();
} catch (err) {
    console.log('ERROR:', err);
}
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
