const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },

   location: {
      type: String,
      required: true
   },

   date: {
      type: Date,
      required: true
   },

   startTime: {
      type: String,
      required: true
   },
   endTime: {
      type: String,
      required: true
   },

   students: {
      type: [String],
      required: true
   }
})

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);