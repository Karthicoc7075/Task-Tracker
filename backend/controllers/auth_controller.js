const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const customError = require("../errors/index");

exports.SignUp = async (req, res,next) => {
  const { Name, Email, Password, Country } = req.body;
  try {

    if(!Name || !Email || !Password || !Country) {
       throw new customError.BadRequestError("Please provide all values");
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
        throw new customError.BadRequestError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    

    const newUser = new User({ Name, Email, Password: hashedPassword, Country, });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiration
    });
    
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        Name: newUser.Name,
        Email: newUser.Email,
        Country: newUser.Country,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.Login = async (req, res,next) => {
    const { Email, Password } = req.body;
   
    
    try {
        if (!Email || !Password) {
        throw new customError.BadRequestError("Please provide all values");
        }
    
        const user = await User.findOne({ Email });
        if (!user) {
        throw new customError.UnauthenticatedError("Invalid credentials");
        }
        const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
        if (!isPasswordCorrect) {
        throw new customError.UnauthenticatedError("Invalid credentials");
        }
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                Name: user.Name,
                Email: user.Email,
                Country: user.Country,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
