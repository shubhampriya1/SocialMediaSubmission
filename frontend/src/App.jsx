import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import AdminRegister from "./Components/AdminRegister";
import Dashboard from "./Components/Dashbord";
import PrivateRouter from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import UserSubmissionForm from "./Components/UserSubmissionForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <AdminRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-submission" element={<UserSubmissionForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
