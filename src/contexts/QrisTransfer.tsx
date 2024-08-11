// import React, { createContext, ReactNode, useState, useCallback } from "react";
// import axios from "axios";

// const apiUrl = "https://connect-bca-api.glitch.me/api/v1.0";

// export interface QRISContextType {
//   qrImage: string | null;
//   expiresAt: number | null;
//   generateQRIS: (
//     amount: number,
//     currency: string
//   ) => Promise<void>;
//   error: string | null;
// }

// const QRISContext = createContext<QRISContextType | undefined>(undefined);

// const QRISProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [qrImage, setQRImage] = useState<string | null>(null);
//   const [expiresAt, setExpiresAt] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const generateQRIS = useCallback(async (
//     amount: number,
//     currency: string
//   ): Promise<void> => {
//     try {
//       const response = await axios.post<{ data: { qrImage: string, expiresAt: number } }>(
//         ${apiUrl}/qr/qr-transfer,
//         {
//           amount: {
//             value: amount,
//             currency: currency,
//           },
//         },
//         {
//           headers: {
//             Authorization: Bearer ${localStorage.getItem("accessToken")},
//           },
//         }
//       );

//       setQRImage(response.data.data.qrImage);
//       setExpiresAt(response.data.data.expiresAt);
//       setError(null);
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(
//           err.response?.data.message || "Failed to generate QR code"
//         );
//       } else {
//         setError("An unexpected error occurred");
//       }
//     }
//   }, []);

//   return (
//     <QRISContext.Provider
//       value={{
//         qrImage,
//         expiresAt,
//         generateQRIS,
//         error,
//       }}
//     >
//       {children}
//     </QRISContext.Provider>
//   );
// };

// export { QRISProvider, QRISContext };