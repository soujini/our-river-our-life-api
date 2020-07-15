import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'
var PDFController = require('../pdf/controller')


// export const create = ({ bodymen: { body } }, res, next) =>{
//   WaterTestDetails.create(body)
//   .then((waterTestDetails) =>{
//     var params = {"id":waterTestDetails._id}
//     PDFController.generateReport({waterTestDetails})
//     show({params})
//   })
//   .then(success(res, 201))
//   .catch(next)
// }

export const create = ({ bodymen: { body } }, res, next) =>
WaterTestDetails.create(body)
.then((waterTestDetails) => waterTestDetails.view(true))
.then(success(res, 201))
.catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  console.log("here")
WaterTestDetails.count(query)
.then(count => WaterTestDetails.find(query, select, cursor)
.then((waterTestDetails) => ({
  count,
  rows: waterTestDetails.map((waterTestDetails) => waterTestDetails.view())
}))
)
.then(success(res))
.catch(next)
}

export const show = ({ params }, res, next) =>{
console.log("souj "+params.id)
WaterTestDetails.findById(params.id)
.then(notFound(res))
.then((waterTestDetails) => waterTestDetails ? waterTestDetails.view() : null)
.then(success(res))
.catch(next)
}

export const updateImage = ({ params }, res, next) =>{
  WaterTestDetails.findById(params.id, function(err, waterTestDetails){
    if(waterTestDetails){

      if(params.fieldName == 'flora'){
      waterTestDetails.flora.push({imageURL:params.flora, description:params.description});
    }
    else if(params.fieldName == 'fauna'){
        waterTestDetails.fauna.push({imageURL:params.fauna, description:params.description});
    }
    else if(params.fieldName == 'artwork'){
        waterTestDetails.artwork.push({imageURL:params.artwork, description:params.description});
    }
    else if(params.fieldName == 'groupPicture'){
        waterTestDetails.groupPicture.push({imageURL:params.groupPicture, description:params.description});
    }
    else if(params.fieldName == 'activity'){
        waterTestDetails.activity.push({imageURL:params.activity, description:params.description});
    }
    else if(params.fieldName == 'river'){
        waterTestDetails.river.push({imageURL:params.river, description:params.description});
    }
    else if(params.fieldName == 'certificate'){
        waterTestDetails.certificateURL = params.certificate;
    }
      waterTestDetails.save()
    }
    else{
      console.log('Water test details id is incorrect');
    }
  });
}

export const update = ( { bodymen: { body }, params }, res, next) =>{
  WaterTestDetails.findById(params.id)
  .then(notFound(res))
  .then((waterTestDetails) => waterTestDetails ? Object.assign(waterTestDetails, req).save() : null)
  .then((waterTestDetails) => waterTestDetails ? waterTestDetails.view(true) : null)
  .then(success(res))
  .catch(next)
}

export const destroy = ({ params }, res, next) =>
WaterTestDetails.findById(params.id)
.then(notFound(res))
.then((waterTestDetails) => waterTestDetails ? waterTestDetails.remove() : null)
.then(success(res, 204))
.catch(next)
