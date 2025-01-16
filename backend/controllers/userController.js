import User from "../models/User.js";

// Handle user data submission
// 
export const submitUser = async (req, res) => {
  try {
    console.log("Files uploaded:", req.files); // Check the uploaded files
    console.log("Request body:", req.body); // Check other form data

    if (
      !req.body.name ||
      !req.body.socialMediaHandle ||
      !req.files ||
      req.files.length === 0
    ) {
      return res
        .status(400)
        .json({
          error:
            "All fields are required and at least one image must be uploaded.",
        });
    }

    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map((file) => file.path); // Map over the uploaded files

    const newUser = new User({
      name,
      socialMediaHandle,
      images: imagePaths,
    });

    await newUser.save();
    res.json({ message: "User data submitted successfully!" });
  } catch (error) {
    console.error("Error in user submission:", error);
    res.status(500).json({ error: "Failed to submit user data" });
  }
};


// Fetch all users for the admin dashboard
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send back the list of users with their images
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
