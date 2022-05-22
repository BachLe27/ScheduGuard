const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const config = require('config');


const User = require('../../models/User');

// @route GET api/user
// @desc 
// @access Public

router.get('/', (req, res) => {
   res.send('User route...');
})


// @route POST api/user
// @desc Register user
// @access Public

router.post('/', [
      body('username', 'Tài khoản phải chứa ít nhất 5 ký tự').not().isEmpty().isLength({ min: 5 }),
      body('password', 'Mật khẩu phải chứa ít nhất 5 kí tự').not().isEmpty().isLength({ min: 5 }),
      body('name', 'Họ và tên không được để trống').not().isEmpty(),
      body('birthdate', 'Ngày sinh không được để trống').not().isEmpty(),
      body('classroom', 'Lớp không được để trống').not().isEmpty(),
      body('position', 'Chức vụ không được để trống').not().isEmpty(),
      body('phone', 'Số điện thoại không được để trống').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, name, birthdate, classroom, position, phone } = req.body;

      try {
         // See if user exists
         let user = await User.findOne({ username });
         if (user) {
            return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });
         }

         user = new User({ 
            username,
            password,
            name,
            birthdate,
            classroom,
            position,
            phone
         });

         // Encrypt password

         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);

         await user.save();

         // Return Jsonwebtoken
         const payload = {
            user: {
               id: user.id
            }
         }

         jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {expiresIn: 108000}, 
            (err, token) => {
               if (err) throw err;
               res.json({ token });
            }
         )
         // res.send('Đăng ký thành công!');
      } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
   }
)

module.exports = router;