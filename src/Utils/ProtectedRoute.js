import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authInstance } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return null;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
