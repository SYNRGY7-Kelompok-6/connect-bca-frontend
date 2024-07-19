import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface ErrorResponse {
  detail?: string;
}

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        `${apiUrl}/api/v1.0/auth/login`,
        {
          username,
          password,
        }
      );
      setAccessToken(response.data.accessToken);
      setError(null);
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
      const responseData = error.response.data as ErrorResponse;
      const detail = responseData?.detail;
      if (detail === "user not found" || detail === "unauthorized") {
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

  const logout = (): void => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
