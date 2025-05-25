const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');


// Service Routes
router.post('/makeResume', serviceController.makeResume);


module.exports = router;
