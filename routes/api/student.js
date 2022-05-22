const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');  
const Student = require('../../models/Student');

// @route GET api/student
// @desc Get all students
// @access Private
router.get('/', auth, async (req, res) => {
   try {

      const students = await Student.find({ user: req.user.id }).select('-user');

      // console.log(students);
      if (!students) {
         return res.status(400).json({ msg: 'Chưa có sinh viên nào!' });
      }

      res.json(students);
   } catch (err) { 
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})


// @route Post api/student
// @desc Create or update a student
// @access Private

router.post('/', [
   auth,
   body('studentID', 'Mã sinh viên không được để trống').not().isEmpty(),
   body('name', 'Tên không được để trống').not().isEmpty(),
   body('classroom', 'Lớp không được để trống').not().isEmpty(),
   body('birthdate', 'Ngày sinh không được để trống').not().isEmpty(),
   body('room', 'Phòng không được để trống').not().isEmpty(),
   body('phone', 'Số điện thoại không được để trống').not().isEmpty(),
   body('position', 'Chức vụ không được để trống').not().isEmpty()
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
   }

   const {studentID, name, classroom, birthdate, room, phone, position } = req.body;
   
   let studentFields = {};
   studentFields = {studentID, name, classroom, birthdate, room, phone, position };
   
   studentFields.user = req.user.id;
   // console.log(studentFields);
   try {
      let student = await Student.findOne({ user: req.user.id, studentID: req.body.studentID });
      
      // Update
      if (student) { 
         // student = await Student.findOneAndUpdate(
         //    { user: req.user.id, studentID: req.body.studentID }, 
         //    { $set: studentFields }, 
         //    { new: true }
         // );
         // return res.json(student);
         return res.status(400).json({ msg: 'Mã số sinh viên đã tồn tại' });
      }

      // Create
      student = new Student(studentFields);

      await student.save();
      return res.json(student);

   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }

   res.send(studentFields);
})

// @route Delete api/student
// @desc Delete a student
// @access Private
router.delete('/', auth, async (req, res) => { 
   const user = req.user.id;
   // console.log(user);

   const {studentIDs} = req.body;
   // res.send(studentIDs);
   if (!studentIDs) {
      return res.status(400).json({ msg: 'Chưa chọn sinh viên nào!' });
   }

   try {
      const students = await Student.find({ studentID: { $in: studentIDs } });
      // console.log(students);
      if (students.length === 0) {
         return res.status(400).json({ msg: 'Không tìm thấy sinh viên nào!' });
      } else {
         await Student.deleteMany({ studentID: { $in: studentIDs } });
         res.json({ msg: 'Xóa thành công!', students });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
   
})


module.exports = router;