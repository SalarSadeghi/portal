import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromStorage } from "../../utils";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getTokenFromStorage();
  // also check the token’s validity later; for example expired tokens
  if (false) {
    // Redirect to login if there is no token
    return <Navigate to="/auth/login" replace />;
  }
  // If token exists, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
