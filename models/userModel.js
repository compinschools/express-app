const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authToken: String
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password')){
    return next()
}
  this.password = require('crypto').createHash('sha1').update(this.password).digest('hex');
  return next();
});

module.exports.User = mongoose.model('User', userSchema, 'users');