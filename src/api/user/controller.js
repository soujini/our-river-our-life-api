import { success, notFound } from '../../services/response/'
import { User } from '.'

var ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

export const login = ({ bodymen: { body } }, res, next) =>{
  console.log("souj")

  // Filter user from the users array by username and password
  const user = User.find(u => {u.phoneNumber === body.phoneNumber });
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ phoneNumber: body.phoneNumber }, accessTokenSecret);

    res.json({
        accessToken
    });
} else {
    res.send('Phone Number is incorrect');
}

}

export const signIn = ({ bodymen: { body } }, res, next) =>{
  console.log(body)
  User.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber},{new: true, upsert: true })
  .then((user) => (user.view(true)))
  .then(success(res, 201))
  .catch(next)
}

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
