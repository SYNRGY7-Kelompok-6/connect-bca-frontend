import React, { useCallback, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      logout();
      navigate("/login", { state: { showPopup: true } });
    }, 300000);
  }, [logout, navigate]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keypress", "touchstart"];
    const eventListener = () => resetTimeout();
    events.forEach((event) => window.addEventListener(event, eventListener));
    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) =>
        window.removeEventListener(event, eventListener)
      );
    };
  }, [resetTimeout]);

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, showPopup: true }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
