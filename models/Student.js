const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({ 
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
   studentID: {
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
   room: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   break: {
      type: Boolean,
      default: false
   }
})

module.exports = Student = mongoose.model('student', StudentSchema);