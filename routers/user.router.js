const router = require('express').Router();

const {verifyToken} = require('../middleware/auth.middleware.js');
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.registerUser);
router.post('/login', UserController.login);
router.get('/getUser', verifyToken, UserController.ensureAuthorized);

module.exports = router;