const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   password: { 
      type: String,
      required: true
   }, 
   name: {
      type: String,
      required: true
   }, 
   birthdate: { 
      type: Date,
      required: true
   },
   classroom: { 
      type: String,
      required: true
   },
   position: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   }
})

module.exports = User = mongoose.model('user', UserSchema);