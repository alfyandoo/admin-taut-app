import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token-admin");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
