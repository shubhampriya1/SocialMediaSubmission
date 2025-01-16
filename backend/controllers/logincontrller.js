import bcrypt from "bcrypt";
import User from "../models/login.js"; 
import registered from "../models/register.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name and password are required!" });
  }

  try {
    // Find user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return success response with the token
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
export const registerUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = await User.create({ name, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
