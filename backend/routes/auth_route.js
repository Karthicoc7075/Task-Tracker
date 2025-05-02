const express = require('express');
const {SignUp, Login } = require('../controllers/auth_controller');
const authRouter = express.Router();


authRouter.post('/signup', SignUp);
authRouter.post('/login', Login);




module.exports = authRouter;