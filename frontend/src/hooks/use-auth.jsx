import { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
