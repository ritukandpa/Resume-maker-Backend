const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



// User methods
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log("Login Req Received !")

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ firstName, lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ success: true, message: "Successfully Registered !" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("login req as user", req.body);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }


    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      const { firstName, lastName, email } = user;

      res.json({ token, user: { firstName, lastName, email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





