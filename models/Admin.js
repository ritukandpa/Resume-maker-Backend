const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminId: String,
  name: String,
  email: String,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
