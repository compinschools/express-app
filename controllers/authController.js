const createError = require('http-errors'); // Import createError
const {User} = require('../models/userModel'); // Import User model

exports.login = async function(req, res,next) {
  const user = req.body;
  const username = user.username;
  console.log(user);
  const password = require('crypto').createHash('sha1').update(user.password).digest('hex');
  const userFound = await User.findOne({username: username, password: password});

  if(!userFound){
    return next(createError(401, "Invalid username or password"));
  }
  else {
    const authToken = require('crypto').randomBytes(64).toString('hex');
    userFound.authToken = authToken;
    await userFound.save();
    return res.send({authToken: authToken});
  }
}

