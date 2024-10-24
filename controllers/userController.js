const createError = require('http-errors'); // Import createError
const {User} = require('../models/userModel'); // Import User model


exports.index = async function(req, res) {
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




exports.create = async function(req, res,next) {
  const user = req.body;
  
  if (!user.username) {
    return next(createError(400, "Username is required"));
  }

  if (!user.password) {
    return next(createError(400, "Password is required"));
  }

  const newUser = new User(user);
  await newUser.save();

  return res.send({result: true});

}

exports.delete = async function(req, res) {
  const username = req.params.username;

  await User.findByIdAndDelete(username);
  return res.send({result: true});
 
}
