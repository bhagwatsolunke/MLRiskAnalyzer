const express = require('express');
const User = require('../models/User');
const router = express.Router();
var jwt = require('jsonwebtoken');
var fetchuser = require ('../middleware/fetchuser');
const JWT_SECRET = 'ramisagoodb$oy';


router.get('/', (req, res) => {
    res.send('Hello edit!')
  })

router.put('/:id',  async (req, res) => {
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
    console.log("here is error");
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router