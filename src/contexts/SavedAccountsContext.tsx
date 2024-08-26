import axios from "axios";
import React, { createContext, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

type SavedAccount = {
  id: number;
  savedBeneficiaryId: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
  favourite: boolean;
};

export interface SavedAccountsContextType {
  destinationAccount: SavedAccount | null;
  savedAccounts: SavedAccount[] | null;
  fetchSavedAccounts: () => Promise<void>;
  getSavedAccountById: (id: string) => Promise<SavedAccount | null>;
  addSavedAccount: (accountNumber: string) => Promise<SavedAccount | null>;
  error: string | null;
  changeDestinationAccount: (account: SavedAccount) => void;
  clearError: () => void; // Ensure this is included
}

export const SavedAccountsContext = createContext<SavedAccountsContextType>({
  destinationAccount: null,
  savedAccounts: null,
  fetchSavedAccounts: async () => {},
  getSavedAccountById: async () => null,
  addSavedAccount: async () => null,
  error: null,
  changeDestinationAccount: () => {},
  clearError: () => {}, // Provide a default implementation
});

export const SavedAccountsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[] | null>(
    null
  );
  const [destinationAccount, setDestinationAccount] =
    useState<SavedAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeDestinationAccount = (account: SavedAccount) => {
    setDestinationAccount(account);
  };

  const fetchSavedAccounts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1.0/saved-accounts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setSavedAccounts(response.data.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Failed to fetch saved accounts"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const getSavedAccountById = async (
    id: string
  ): Promise<SavedAccount | null> => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/v1.0/saved-accounts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setError(null);
      return response.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Failed to fetch saved account by ID"
        );
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    }
  };

  const addSavedAccount = async (
    accountNumber: string
  ): Promise<SavedAccount | null> => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1.0/saved-accounts`,
        {
          beneficiaryAccountNumber: accountNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const newAccount: SavedAccount = response.data.data;
      setSavedAccounts((prev) => (prev ? [...prev, newAccount] : [newAccount]));
      setError(null);
      return newAccount;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const message = err.response?.data.message;
        switch (status) {
          case 400:
            if (message.includes("can't add your own account")) {
              setError(
                "Anda tidak dapat menambahkan akun Anda sendiri ke daftar yang disimpan."
              );
            } else if (message.includes("account already added")) {
              setError("Akun ini sudah ditambahkan");
            } else if (
              message.includes(
                "Field 'beneficiaryAccountNumber': account number's length must be 10"
              )
            ) {
              setError("Panjang No. Rekening harus 10 digit");
            } else {
              setError(message || "Failed to add saved account");
            }
            break;
          case 404:
            if (message.includes("account number not found")) {
              setError("Akun tidak dapat ditemukan");
            } else {
              setError(message || "Failed to add saved account");
            }
            break;

          default:
            setError("An unexpected error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    }
  };

  const clearError = () => {
    setError(null); // Clear the error
  };

  return (
    <SavedAccountsContext.Provider
      value={{
        savedAccounts,
        fetchSavedAccounts,
        getSavedAccountById,
        addSavedAccount,
        error,
        destinationAccount,
        changeDestinationAccount,
        clearError, // Include the clearError method
      }}
    >
      {children}
    </SavedAccountsContext.Provider>
  );
};
