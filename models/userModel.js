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

//encrypt the password when set
userSchema.pre('save', function(next) {
  this.password = require('crypto').createHash('sha1').update(this.password).digest('hex');
  next();
});


module.exports.User = mongoose.model('User', userSchema, 'users');