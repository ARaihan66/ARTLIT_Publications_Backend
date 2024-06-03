const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
const userRegister = async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
  
      // Check if all required fields are provided
      if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all required fields.",
        });
      }
  
      // Check if the email is already registered
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered.",
        });
      }
  
      // Check if password matches confirmPassword
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match.",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        tc,
      });
  
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Registration failed. Please try again later.",
      });
    }
  };