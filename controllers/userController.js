const createError = require('http-errors'); // Import createError
const {User} = require('../models/userModel'); // Import User model


exports.index = async function(req, res) {
  console.log("undex")
  const users = await User.find({});
  return res.send(users);
}

exports.show = async function(req, res,next) {
  const user = await User.findById(req.params.username);
  if(user)
    return res.send(user);
  else
    return next(createError(404, "User not found"));
}

exports.login = async function(req, res,next) {
  const user = req.body;
  //encrypt the password
  user.password = require('crypto').createHash('sha1').update (user.password).digest('hex');

  const userFound = await User.findOne({username  : user.username, password : user.password});

  if(userFound){
    //set auth token
    userFound.authToken = require('crypto').randomBytes(64).toString('hex');
    await userFound.save();

    return res.send({result: true, authToken: userFound.authToken});
  }
  else
    return next(createError(404, "User not found"));
}


exports.create = function(req, res,next) {
  const user = req.body;

  
  if (!user.username) {
    return next(createError(400, "Username is required"));
  }

  if (!user.password) {
    return next(createError(400, "Password is required"));
  }

  const newUser = new User(user);
  newUser.save();

  return res.send({result: true});

}
