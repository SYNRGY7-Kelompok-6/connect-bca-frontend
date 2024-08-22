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
  scheduleDate?: string; // Tambahan untuk jadwal transfer
};

interface TransferSuccessData {
  refNumber: string;
  transactionId: string;
  amount: {
    value: number;
    currency: string;
  };
  transactionDate: string;
  remark: string;
  desc: string;
  beneficiaryAccountNumber: string;
  beneficiaryName: string;
  sourceAccountNumber: string;
  sourceName: string;
}

interface TransferContextType {
  transferIntrabank: TransferIntrabank | null;
  changeTransferIntrabank: (data: TransferIntrabank) => void;
  transferIntrabankError: string | null;
  transferIntrabankLoading: boolean;
  transferIntrabankSuccess: boolean;
  transferIntrabankSuccessData: TransferSuccessData | null;
  transferIntrabankSubmit: (
    data: TransferIntrabank,
    pin: string,
    scheduleTransfer?: boolean
  ) => Promise<{ status: number; data?: TransferSuccessData; error?: string }>;
}

export const TransferContext = createContext<TransferContextType>({
  transferIntrabank: null,
  changeTransferIntrabank: () => {},
  transferIntrabankError: null,
  transferIntrabankLoading: false,
  transferIntrabankSuccess: false,
  transferIntrabankSuccessData: null,
  transferIntrabankSubmit: async () => ({
    status: 500,
    error: "Not implemented",
  }),
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
  const [transferIntrabankSuccessData, setTransferIntrabankSuccessData] =
    useState<TransferSuccessData | null>(null);

  const changeTransferIntrabank = (data: TransferIntrabank) => {
    setTransferIntrabank(data);
  };

  const transferIntrabankSubmit = async (
    data: TransferIntrabank,
    pin: string,
    scheduleTransfer: boolean = false
  ): Promise<{
    status: number;
    data?: TransferSuccessData;
    error?: string;
  }> => {
    setTransferIntrabankLoading(true);
    setTransferIntrabankError(null);

    try {
      // Validate PIN
      const pinResponse = await axios.post(
        `${apiUrl}/api/v1.0/auth/validate-pin`,
        { pin },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (pinResponse.status !== 200) {
        throw new Error("Invalid PIN");
      }

      const pinToken = pinResponse.data.data.pinToken;

      let transferResponse;

      if (scheduleTransfer && data.scheduleDate) {
        // Perform scheduled transfer
        console.log({
          beneficiaryAccountNumber: data.beneficiaryAccountNumber,
          amount: data.amount.value,
          description: data.desc,
          frequency: "sekali",
          schedule: data.scheduleDate,
        });

        transferResponse = await axios.post(
          `${apiUrl}/api/v1.0/transfer-scheduler`,
          {
            beneficiaryAccountNumber: data.beneficiaryAccountNumber,
            amount: data.amount.value,
            description: data.desc,
            frequency: "sekali", // Asumsikan satu kali, sesuaikan jika berbeda
            schedule: data.scheduleDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "X-PIN-TOKEN": pinToken,
            },
          }
        );
      } else {
        // Perform regular transfer
        transferResponse = await axios.post(
          `${apiUrl}/api/v1.0/transfer-intrabank`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "X-PIN-TOKEN": pinToken,
            },
          }
        );
      }

      if (transferResponse.status !== 200) {
        throw new Error("Transfer failed");
      }

      setTransferIntrabankSuccess(true);
      setTransferIntrabankSuccessData(transferResponse.data);

      return {
        status: transferResponse.status,
        data: transferResponse.data,
      };
    } catch (err) {
      console.error("Error during transfer:", err);

      let errorMessage = "An unexpected error occurred";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data.message || errorMessage;
      }

      if (errorMessage === "Invalid PIN") {
        errorMessage = "PIN yang anda masukan salah, silahkan coba kembali";
      }

      setTransferIntrabankError(errorMessage);
      setTransferIntrabankSuccess(false);
      setTransferIntrabankSuccessData(null);

      return {
        status:
          (err as { response?: { status?: number } }).response?.status || 500,
        error: errorMessage,
      };
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
        transferIntrabankSuccessData,
        changeTransferIntrabank,
        transferIntrabankSubmit,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};
