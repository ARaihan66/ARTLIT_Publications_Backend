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


  // User login
const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password.",
        });
      }
  
      // Find user by email
      const user = await userModel.findOne({ email });
  
      // Check if user exists and password matches
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
  
      // Set JWT token in HTTP-only cookie
      res
        .cookie("Token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          secure: true,
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful.",
          token,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again later.",
      });
    }
  };
  