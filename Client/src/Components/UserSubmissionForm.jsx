import React, { useState } from "react";

const UserSubmissionForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialMediaHandle", socialHandle);

    // Append images to the FormData object
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      // Send a POST request to the backend with the form data
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message); // Handle success
        // Optionally reset form values
        setName("");
        setSocialHandle("");
        setImages([]);
      } else {
        console.error(result.error); // Handle error
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          User Submission Form
        </h2>
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Social Media Handle
            </label>
            <input
              type="text"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button" // This button triggers the handleSubmit function, not the form submission
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSubmissionForm;
