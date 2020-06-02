import { success, notFound } from '../../services/response/'
import { User } from '.'

var ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
  console.log("trrying to authenticate the token")
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export const login = ({ bodymen: { body } }, res, next) =>{
  console.log("souj")

  // Filter user from the users array by username and password
  User.findOne({phoneNumber: body.phoneNumber}, function(err,user){
    if(user){
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

export const index = (authenticateJWT, { querymen: { query, select, cursor } }, res, next) =>{
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
