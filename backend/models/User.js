import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image paths
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
