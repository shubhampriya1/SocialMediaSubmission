import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import AdminLogin from "./Components/AdminLogin";
import UserSubmissionForm from "./Components/UserSubmissionForm";
import AdminRegister from "./Components/AdminRegister";
import Dashboard from "./Components/dashbord";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/" element={<AdminRegister/>}/>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/user-submission" element={<UserSubmissionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
