import React, { createContext, ReactNode, useState, useCallback } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL_2;

export interface QrisTfContextType {
  qrImage: string | null;
  expiresAt: number | null;
  generateQRIS: (
    amount: number,
    currency: string
  ) => Promise<void>;
  error: string | null;
}

const QrisTfContext = createContext<QrisTfContextType | undefined>(undefined);

const QrisTfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [qrImage, setQRImage] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQRIS = useCallback(async (
    amount: number,
    currency: string
  ): Promise<void> => {
    try {
      const response = await axios.get<{ data: { qrImage: string, expiresAt: number } }>(
        `${apiUrl}/api/v1.0/qr/qr-transfer`,
        {
          params: {
            amount: amount,
            currency: currency,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setQRImage(response.data.data.qrImage);
      setExpiresAt(response.data.data.expiresAt);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Failed to generate QR code"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  }, []);

  return (
    <QrisTfContext.Provider
      value={{
        qrImage,
        expiresAt,
        generateQRIS,
        error,
      }}
    >
      {children}
    </QrisTfContext.Provider>
  );
};

export { QrisTfProvider, QrisTfContext };
