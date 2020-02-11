const auth = require('../../middleware/auth.middleware');
const bcrypt = require('bcryptjs');
const config = require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Get logged in user
// @acces   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // send back the entire user object minus the password
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Login (Authenticate user and get token)
// @acces   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 = Bad Request, The server could not understand the request due to invalid syntax
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      // 500 Internal Server Error, The server has encountered a situation it doesn't know how to handle.
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
