const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require ('../middleware/fetchuser');
const JWT_SECRET = 'ramisagoodb$oy';

// ROUTE 1:Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ success, errors: errors.array() });
  }
  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })


    }
    const salt = await bcrypt.genSalt(10);
    SecPass = await bcrypt.hash(req.body.password, salt);


    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: SecPass,
      email: req.body.email,
    });
    const userData = {
      name: user.name,
      lastname: user.lastname,
      designation: user.designation,
      email: user.email,
      organization: user.organization,
      location: user.location,
      userId: user.id,
      watchlist: user.watchlist,
    };


    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    //res.json(user)
    success=true;
    res.json({ success, authtoken, user: userData });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})




// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

let success=false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      success=false;

      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const userData = {
      name: user.name,
      lastname: user.lastname,
      designation: user.designation,
      email: user.email,
      organization: user.organization,
      location: user.location,
      userId: user.id,
      watchlist: user.watchlist,
    };

    const data = {
      user: {
        id: user.id,
      },
    };
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;

    res.json({ success, authtoken, user: userData });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 3: Get loggedin User Details using : POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})



router.put('/edituser/:id', fetchuser, async (req, res) => {
  const { name, lastname, designation, email, organization, location } = req.body;
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.designation = designation || user.designation;
    user.email = email || user.email;
    user.organization = organization || user.organization;
    user.location = location || user.location;

    // Save the updated user
    user = await user.save();

    const userData = {
      name: user.name,
      lastname: user.lastname,
      designation: user.designation,
      email: user.email,
      organization: user.organization,
      location: user.location,
      userId: user.id,
      watchlist: user.watchlist,
    };

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authtoken, user: userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router