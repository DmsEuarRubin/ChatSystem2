const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const checkAuth = require("../middleware/checkAuth");

router.post('/createUser', controller.createUser);
router.post('/loginUser', controller.loginUser);
router.delete('/logoutUser', checkAuth, controller.logoutUser);

module.exports = router;
