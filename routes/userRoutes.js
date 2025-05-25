const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Users Routes
router.post('/user-register', userController.registerUser);
router.post('/user-login',userController.loginUser);

module.exports = router;
