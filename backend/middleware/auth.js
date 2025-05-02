const jwt = require('jsonwebtoken');
const {config} = require("../config/config");
const CustomError = require('../errors/index');

const auth =()=>
 (req, res, next) => {
    let token = req.header('Authorization')
    if (!token){ 
      throw  new  CustomError.UnauthorizedError('Access denied. No token provided.');
    }
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.userId = decoded.id;
   
      
      next();
    } catch (err) {
       throw new CustomError.UnauthorizedError('Invalid token');
    }
    };
    
    
    module.exports = auth;