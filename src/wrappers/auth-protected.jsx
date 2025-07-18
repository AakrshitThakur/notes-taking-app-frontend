import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { errorToastify } from "@/utils/functions/toastify";

export default function AuthProtected({ children }) {
  const isAuthenticated = localStorage.getItem("user_id");

  useEffect(() => {
    if (!isAuthenticated) {
      errorToastify(
        "Access Denied: Please register for an account or log in to proceed"
      );
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
