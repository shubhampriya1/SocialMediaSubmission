import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold text-gray-800">Social Media</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleNavigate("/dashboard")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigate("/user-submission")}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Upload File
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
