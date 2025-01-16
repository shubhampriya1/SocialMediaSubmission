import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import AdminLogin from "./Components/AdminLogin";
import UserSubmissionForm from "./Components/UserSubmissionForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/user-submission" element={<UserSubmissionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
