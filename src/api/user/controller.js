import { success, notFound } from '../../services/response/'
import { User } from '.'

export const login = ({ bodymen: { body } }, res, next) =>{
  console.log("souj")
    console.log(body)
  const a = body.id.split("[String: ')");
  const b = a[0].split("]'");
  console.log(b[0])
const userId = b[0].toString();

User.find(user => { user.id === userId })
.then((user) => (user.view(true)))
.then(success(res, 201))
.catch(next)
}


export const create = ({ bodymen: { body } }, res, next) =>
User.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber},{new: true, upsert: true })
.then((user) => (user.view(true)))
.then(success(res, 201))
.catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then((users) => ({
        count,
        rows: users.map((user) => user.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
