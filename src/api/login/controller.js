import { success, notFound } from '../../services/response/'
import { Login } from '.'

export const login = ({ bodymen: { body } }, res, next) =>{
console.log("scooby "+JSON.stringify(body))
Login.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber},{new: true, upsert: true })
.then((login) => login.view(true))
.then(success(res, 201))
.catch(next)
}
export const create = ({ bodymen: { body } }, res, next) =>{
  console.log("souj "+body)
Login.create(body)
.then((login) => login.view(true))
.then(success(res, 201))
.catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Login.count(query)
.then(count => Login.find(query, select, cursor)
.then((logins) => ({
  count,
  rows: logins.map((login) => login.view())
}))
)
.then(success(res))
.catch(next)

export const show = ({ params }, res, next) =>
Login.findById(params.id)
.then(notFound(res))
.then((login) => login ? login.view() : null)
.then(success(res))
.catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
Login.findById(params.id)
.then(notFound(res))
.then((login) => login ? Object.assign(login, body).save() : null)
.then((login) => login ? login.view(true) : null)
.then(success(res))
.catch(next)

export const destroy = ({ params }, res, next) =>
Login.findById(params.id)
.then(notFound(res))
.then((login) => login ? login.remove() : null)
.then(success(res, 204))
.catch(next)
