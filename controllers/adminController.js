const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');



// Admin methods

exports.registerAdmin = async (req, res) => {
  const { adminId, name, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    admin = new Admin({ adminId, name, email, password });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    const payload = { admin: { id: admin.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ success: true, message: "Successfully Registered !" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log("login req as admin", req.body)

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const payload = { admin: { id: admin.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      const { adminId, name, email } = admin;

      res.json({ token, admin: { adminId, name, email} });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

