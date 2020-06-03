import { success, notFound } from '../../services/response/'
import { WaterTestDetails } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  WaterTestDetails.create(body)
    .then((waterTestDetails) => waterTestDetails.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  WaterTestDetails.count(query)
    .then(count => WaterTestDetails.find(query, select, cursor)
      .then((waterTestDetails) => ({
        count,
        rows: waterTestDetails.map((waterTestDetails) => waterTestDetails.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  WaterTestDetails.findById(params.id)
    .then(notFound(res))
    .then((waterTestDetails) => waterTestDetails ? waterTestDetails.view() : null)
    .then(success(res))
    .catch(next)

export const updateImage = ({ params }, res, next) =>{
  console.log(params.id)
  console.log(params.flora)
  WaterTestDetails.findById(params.id, function(err, waterTestDetails){
    if(waterTestDetails){
      console.log("in water test details")
      waterTestDetails.flora.push(params.flora);
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
