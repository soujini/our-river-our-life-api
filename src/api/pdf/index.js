import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, generateReport } from './controller'

let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");

const router = new Router()

app.get("/generateReport", (req, res) => {
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
            pdf.create(data, options).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
})


/**
 * @api {post} /pdf Create pdf
 * @apiName CreatePdf
 * @apiGroup Pdf
 * @apiSuccess {Object} pdf Pdf's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pdf not found.
 */
router.post('/',
  create)

/**
 * @api {get} /pdf Retrieve pdfs
 * @apiName RetrievePdfs
 * @apiGroup Pdf
 * @apiUse listParams
 * @apiSuccess {Object[]} pdfs List of pdfs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /pdf/:id Retrieve pdf
 * @apiName RetrievePdf
 * @apiGroup Pdf
 * @apiSuccess {Object} pdf Pdf's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pdf not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /pdf/:id Update pdf
 * @apiName UpdatePdf
 * @apiGroup Pdf
 * @apiSuccess {Object} pdf Pdf's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pdf not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /pdf/:id Delete pdf
 * @apiName DeletePdf
 * @apiGroup Pdf
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pdf not found.
 */
router.delete('/:id',
  destroy)

export default router
