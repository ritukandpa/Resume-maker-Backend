const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Admins Routes
router.post('/admin-register', adminController.registerAdmin);
router.post('/admin-login',adminController.loginAdmin);



module.exports = router;
