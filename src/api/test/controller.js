import { success, notFound } from '../../services/response/'
import { Test } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Test.create(body)
    .then((test) => test.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Test.count(query)
    .then(count => Test.find(query, select, cursor)
      .then((tests) => ({
        count,
        rows: tests.map((test) => test.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? test.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? Object.assign(test, body).save() : null)
    .then((test) => test ? test.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Test.findById(params.id)
    .then(notFound(res))
    .then((test) => test ? test.remove() : null)
    .then(success(res, 204))
    .catch(next)
