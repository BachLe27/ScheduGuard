const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');  
const Location = require('../../models/Location');


// @route POST api/location
// @desc Create location
// @access Private
router.post('/', auth, async (req, res) => {
   const { location } = req.body;

   // check location is exist
   const isExist = await Location.findOne({ user: req.user.id , location: location });
   // console.log(isExist);

   if (isExist) {
      return res.status(400).json({ msg: 'Địa điểm đã tồn tại!' });
   } else {

      try {
         const newLocation = new Location({
            user: req.user.id,
            location: location
         });

         await newLocation.save();
         res.json(newLocation);
         
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
});

// @route GET api/location
// @desc Get all locations
// @access Private
router.get('/', auth, async (req, res) => { 
   try {
      const locations = await Location.find({ user: req.user.id });
      res.json(locations);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})

router.delete('/', auth, async (req, res) => {

   const { locations } = req.body;

   if (!locations) {
      return res.status(400).json({ msg: 'Chưa chọn địa điểm!' });
   }

   try {
      await Location.deleteMany({ user: req.user.id, location: { $in: locations } });

      if (locations.length === 0) {
         return res.status(400).json({ msg: 'Không tìm thấy địa điểm nào!' });
      } else {
         res.json({ msg: 'Xóa thành công!', locations });
      }

   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})

module.exports = router;
