const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');  
const Schedule = require('../../models/Schedule');


// @route POST api/schedule
// @desc Create a new schedule
// @access Private

router.post('/', auth, async (req, res) => {
   // console.log(req.body);

   try {
      const { user, location, date, startTime, endTime, students } = req.body;

      const newSchedule = new Schedule({
         user,
         location,
         date,
         startTime,
         endTime,
         students
      });

      await newSchedule.save();

      res.json(newSchedule);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});


// @route GET api/schedule
// @desc Get all schedules
// @access Private

router.get('/', auth, async (req, res) => {
   try {
      const schedules = await Schedule.find({ user: req.user.id });
      res.json(schedules);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
});

router.delete('/', auth, async (req, res) => {

   const { schedules } = req.body;

   if (!schedules) {
      return res.status(400).json({ msg: 'Chưa chọn lịch học!' });
   }

   try {
      await Schedule.deleteMany({ user: req.user.id, _id: { $in: schedules } });

      res.json({ msg: 'Xóa thành công!' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }

})

module.exports = router;
