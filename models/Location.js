const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
   user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   location : {
      type: String,
      required: true
   }
})

module.exports = Location = mongoose.model('location', LocationSchema);