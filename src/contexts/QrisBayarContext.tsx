import React, { createContext, ReactNode, useState, useCallback } from "react";
import axios from "axios";

const apiUrl2 = import.meta.env.VITE_API_URL_2;

export interface QrisBrContextType {
    qrImage: string | null;
    expiresAt: number | null;
    generateQRIS: (
        value: number,
        currency: string,
        pinToken : string,
    ) => Promise<void>;
    error: string | null;
}

const QrisBrContext = createContext<QrisBrContextType | undefined>(undefined);

const QrisBrProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [qrImage, setQRImage] = useState<string | null>(null);
    const [expiresAt, setExpiresAt] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateQRIS = useCallback(async (
        value: number,
        currency: string,
        pinToken:string,
      ): Promise<void> => {
        try {
            const response = await axios.post<{ data: { qrImage: string, expiresAt: number } }>(
              `${apiUrl2}/api/v1.0/qr/qr-pay`,
              {amount :{
                value: value,
                currency :currency
              }},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  'X-PIN-TOKEN': pinToken,
                },
              }
            );
            setQRImage(response.data.data.qrImage);
            setExpiresAt(response.data.data.expiresAt);
            setError(null);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              console.error('Axios Error:', err.response?.status);
              console.error('Axios Error Data:', err.response?.data);
              setError(err.response?.data.message || "Failed to qris payment");
            } else {
              console.error('Unexpected Error:', err);
              setError("An unexpected error occurred");
            }
          }
      }, []);
      return (
        <QrisBrContext.Provider
          value={{
            qrImage,
            expiresAt,
            generateQRIS,
            error,
          }}
        >
          {children}
        </QrisBrContext.Provider>
      );
    };

    export { QrisBrProvider, QrisBrContext };



