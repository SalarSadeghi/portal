import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getTokenFromStorage, TOKEN_KEY } from "../../utils";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { search } = useLocation();
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(search);
    return params.get(TOKEN_KEY);
  };

  const setTokenToStorage = () => {
    const token = getTokenFromUrl();
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  };

  useEffect(() => {
    setTokenToStorage();
  }, []);
  const token = getTokenFromStorage() || getTokenFromUrl();
  // also check the token’s validity later; for example expired tokens

  if (!token) {
    // Redirect to login if there is no token
    return <Navigate to="/auth/login" replace />;
  }
  // If token exists, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
