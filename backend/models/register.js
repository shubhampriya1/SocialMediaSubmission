import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User Schema Definition
const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Additional fields (e.g
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save hook to hash the password before storing it
registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's modified

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // 10 salt rounds
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


const registered = mongoose.model("registreSchema", registerSchema);

export default registered;
