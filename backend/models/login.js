import mongoose from "mongoose";

// Define the User schema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Create and export the User model
const login = mongoose.model("login", loginSchema);

export default login;
