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
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const elapsed = Date.now() - lastActivityRef.current;

      if (elapsed >= 300000) {
        logout();
        localStorage.setItem("showPopup", "true");
        navigate("/login");
      }
    }, 300000);
  }, [logout, navigate]);

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "keydown",
      "keyup",
      "touchstart",
      "touchmove",
      "scroll",
      "resize",
      "focus",
      "blur",
      "click",
    ];

    const eventListener = () => {
      lastActivityRef.current = Date.now();
      resetTimeout();
    };

    events.forEach((event) => window.addEventListener(event, eventListener));

    document.querySelectorAll("input, textarea, select").forEach((element) => {
      element.addEventListener("input", eventListener);
      element.addEventListener("change", eventListener);
      element.addEventListener("focus", eventListener);
      element.addEventListener("blur", eventListener);
    });

    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) =>
        window.removeEventListener(event, eventListener)
      );
      document
        .querySelectorAll("input, textarea, select")
        .forEach((element) => {
          element.removeEventListener("input", eventListener);
          element.removeEventListener("change", eventListener);
        });
    };
  }, [resetTimeout]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
