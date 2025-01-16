import axios from "axios";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  user: null,
  setUser: () => null,
  loading: true,
  logout: () => null,
};

export const AuthContext = createContext(initialState);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_API_URL;

  async function logout() {
    try {
      await axios.get(`${backendUrl}/auth/logout`);
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      axios.defaults.withCredentials = true;

      try {
        const { data } = await axios.get(`${backendUrl}/auth/me`);
        setUser(data);
      } catch {
        setUser(null);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
