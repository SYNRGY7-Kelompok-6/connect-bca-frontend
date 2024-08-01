import React, { createContext, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

interface ErrorResponse {
  message?: string;
}

interface LoginAttemp {
  timestamp: string;
  location: string;
}

interface LoginInfo {
  lastSuccessfullLoginAttempt: LoginAttemp;
  failedLoginAttempt: LoginAttemp;
}

export interface AuthContextType {
  accessToken: string | null;
  login: (userID: string, password: string) => Promise<void>;
  logout: () => void;
  fetchLoginInfo: () => Promise<void>;
  loginInfo: LoginInfo | null;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [loginInfo, setLoginInfo] = React.useState<LoginInfo | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (userID: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<{ data: { accessToken: string } }>(
        `${apiUrl}/api/v1.0/auth/login`,
        { userID, password }
      );
      const token = response.data.data.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        setError(null);
        navigate("/");
      } else {
        console.error("Token is undefined");
        setError("Failed to retrieve access token");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleLoginError(error);
      } else {
        console.error("Login failed:", error);
        setError("Login failed");
      }
      throw new Error("Login failed");
    }
  };

  const handleLoginError = (error: AxiosError<ErrorResponse>): void => {
    if (error.response && error.response.status === 401) {
      const responseData = error.response.data;
      const message = responseData?.message;

      if (message === "user not found" || message === "unauthorized") {
        setError(
          "User ID / Kata Sandi yang Anda masukkan tidak sesuai. Mohon masukkan User ID / Kata Sandi Anda dengan benar."
        );
      } else {
        setError("Terjadi kesalahan saat login.");
      }
    } else {
      setError("Terjadi kesalahan saat melakukan permintaan.");
    }
  };

  const fetchLoginInfo = async (): Promise<void> => {
    if (!accessToken) {
      setError("No access token available");
      return;
    }
    try {
      const response = await axios.get<{ data: LoginInfo }>(`${apiUrl}/api/v1.0/auth/login-info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setLoginInfo(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching login info:", error);
      setError("Failed to fetch login information");
    }
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, fetchLoginInfo, loginInfo, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
