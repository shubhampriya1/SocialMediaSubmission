import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Spinner from "./Spinner";

const PrivateRouter = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
