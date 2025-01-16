import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Uploads = mongoose.model("Uploads", uploadSchema);

export default Uploads;
