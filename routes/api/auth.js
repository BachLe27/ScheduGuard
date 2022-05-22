const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth.js');  

const User = require('../../models/User');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user); 
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})


// @route POST api/auth
// @desc Authenticate user and get token
// @access Public

router.post('/', [
   body('username', 'Tài khoản không được để trống').not().isEmpty(),
   body('password', 'Mật khẩu không được để trống').exists()
],
async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { username, password } = req.body;

   try {
      // See if user exists
      let user = await User.findOne({ username });

      if (!user) {
         return res.status(400).json({ msg: 'Tài khoản hoặc mật khẩu không đúng!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
         return res.status(400).json({ msg: 'Tài khoản hoặc mật khẩu không đúng!' });
      }

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