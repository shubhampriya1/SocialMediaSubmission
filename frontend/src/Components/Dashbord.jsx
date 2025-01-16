import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchUserData = async (page = 1) => {
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard?page=${page}`
      );
      if (response.status === 200) {
        setUploads(response.data.uploads);
        setPagination(response.data.pagination);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  if (!uploads || uploads.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">No Media Found</h2>
            <p className="text-gray-600 mt-2">
              You haven&apos;t uploaded any media yet. Start by adding your
              first upload!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            User Dashboard
          </h2>
          {uploads.map((upload) => (
            <div key={upload._id} className="mb-6">
              <h3 className="text-lg font-semibold">{upload.name}</h3>
              <p className="text-sm text-gray-600">
                Social Media: {upload.socialMediaHandle}
              </p>
              <div className="flex flex-wrap mt-2">
                {upload.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API_URL}/${image}`}
                    alt={`Uploaded ${index}`}
                    className="w-32 h-32 object-cover mr-2 mb-2 rounded-md"
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <p className="text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
