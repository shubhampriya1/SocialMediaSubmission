import Uploads from "../models/Upload.js";

export const submitUser = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.socialMediaHandle ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        error:
          "All fields are required and at least one image must be uploaded.",
      });
    }

    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map((file) => file.filename);

    const newUpload = new Uploads({
      name,
      socialMediaHandle,
      images: imagePaths,
      user: req.user._id,
    });

    await newUpload.save();
    res.json({ message: "User data submitted successfully!" });
  } catch (error) {
    console.error("Error in user submission:", error);
    res.status(500).json({ error: "Failed to submit user data" });
  }
};

export const getUserUploads = async (req, res) => {
  try {
    const userId = req.user._id;

    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const uploads = await Uploads.find({ user: userId })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUploads = await Uploads.countDocuments({ user: userId });

    res.json({
      uploads,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalUploads / limitNumber),
        totalItems: totalUploads,
      },
    });
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};
