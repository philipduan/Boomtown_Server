const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Please enter your full name']
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Please enter an email adress']
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = { User };
