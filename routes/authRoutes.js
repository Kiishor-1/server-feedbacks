const express = require('express');
const { loginOrRegister } = require('../controllers/authController');
const router = express.Router();
router.post('/register', loginOrRegister);
module.exports = router;
