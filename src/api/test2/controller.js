import { success, notFound } from '../../services/response/'
import { Test2 } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  console.log("suji "+JSON.stringify(body))
  Test2.create(body)
    .then((test2) => test2.view(true))
    .then(success(res, 201))
    .catch(next)
  }

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Test2.count(query)
    .then(count => Test2.find(query, select, cursor)
      .then((test2S) => ({
        count,
        rows: test2S.map((test2) => test2.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Test2.findById(params.id)
    .then(notFound(res))
    .then((test2) => test2 ? test2.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Test2.findById(params.id)
    .then(notFound(res))
    .then((test2) => test2 ? Object.assign(test2, body).save() : null)
    .then((test2) => test2 ? test2.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Test2.findById(params.id)
    .then(notFound(res))
    .then((test2) => test2 ? test2.remove() : null)
    .then(success(res, 204))
    .catch(next)
