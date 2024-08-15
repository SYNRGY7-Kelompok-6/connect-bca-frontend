import axios from "axios";
import React, { createContext, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export type TransferIntrabank = {
  beneficiaryAccountNumber: string;
  remark: string;
  desc: string;
  amount: {
    currency: string;
    value: number;
  };
};

interface TransferContextType {
  transferIntrabank: TransferIntrabank | null;
  changeTransferIntrabank: (data: TransferIntrabank) => void;
  transferIntrabankError: string | null;
  transferIntrabankLoading: boolean;
  transferIntrabankSuccess: boolean;
  transferIntrabankSubmit: (data: TransferIntrabank, pin: string) => Promise<void>;
}

export const TransferContext = createContext<TransferContextType>({
  transferIntrabank: null,
  changeTransferIntrabank: (data: TransferIntrabank) => {},
  transferIntrabankError: null,
  transferIntrabankLoading: false,
  transferIntrabankSuccess: false,
  transferIntrabankSubmit: async () => {},
});

export const TransferProvider: React.FC<React.PropsWithChildren> = ({
  children,
}): React.ReactElement => {
  const [transferIntrabank, setTransferIntrabank] =
    useState<TransferIntrabank | null>(null);

  const [transferIntrabankError, setTransferIntrabankError] = useState<
    string | null
  >(null);
  const [transferIntrabankLoading, setTransferIntrabankLoading] =
    useState<boolean>(false);
  const [transferIntrabankSuccess, setTransferIntrabankSuccess] =
    useState<boolean>(false);

  const changeTransferIntrabank = (data: TransferIntrabank) => {
    setTransferIntrabank(data);
  };

  const transferIntrabankSubmit = async (data: TransferIntrabank, pin: string) => {
    setTransferIntrabankLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1.0/auth/validate-pin`,
        {
          pin: pin,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const pinToken = response.data.data.pinToken;

      try {
        const res = await axios.post(
          `${apiUrl}/api/v1.0/transfer-intrabank`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "X-PIN-TOKEN": pinToken,
            },
          }
        );

        console.log("Transfer intrabank success");
        console.log(res);
        setTransferIntrabankSuccess(true);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setTransferIntrabankError(
            err.response?.data.message || "Failed to transfer intrabank"
          );
        } else {
          setTransferIntrabankError("An unexpected error occurred");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTransferIntrabankLoading(false);
    }
  };

  return (
    <TransferContext.Provider
      value={{
        transferIntrabank,
        transferIntrabankError,
        transferIntrabankLoading,
        transferIntrabankSuccess,
        changeTransferIntrabank,
        transferIntrabankSubmit,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};
