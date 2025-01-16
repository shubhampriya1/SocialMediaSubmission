import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/use-auth";
import Spinner from "./Spinner";

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PublicRoute({ children }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Navigate to="/dashboard" /> : children;
}
