import { success, notFound } from '../../services/response/'
import { User } from '.'

var ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';



export const auth = ({ bodymen: { body } }, res, next) =>{

  // Filter user from the users array by username and password
  User.findOne({phoneNumber: body.phoneNumber}, function(err,user){
    if(user){
      console.log("phonesouj")
      console.log(user.phoneNumber)
      // Generate an access token
      const accessToken = jwt.sign({ phoneNumber: user.phoneNumber }, accessTokenSecret);

      res.json({
        accessToken
      });

    }
    else{
       res.send('Phone Number is incorrect');
    }
  });

}

export const signIn = ({ bodymen: { body } }, res, next) =>{
  console.log(body)
  User.findOneAndUpdate({phoneNumber:body.phoneNumber},{phoneNumber:body.phoneNumber},{new: true, upsert: true })
  .then((user) => (user.view(true)))
  .then(success(res, 201))
  .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  console.log("getting with token")
User.count(query)
.then(count => User.find(query, select, cursor)
.then((users) => ({
  count,
  rows: users.map((user) => user.view())
}))
)
.then(success(res))
.catch(next)
}

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
