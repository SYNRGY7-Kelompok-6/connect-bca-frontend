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

interface SavedAccountsContextType {
  destinationAccount: SavedAccount | null;
  savedAccounts: SavedAccount[] | null;
  fetchSavedAccounts: () => Promise<void>;
  error: string | null;
  changeDestinationAccount: (account: SavedAccount) => void;
}

export const SavedAccountsContext = createContext<SavedAccountsContextType>({
  destinationAccount: null,
  savedAccounts: null,
  fetchSavedAccounts: async () => {},
  error: null,
  changeDestinationAccount: () => {}, // Updated to not require a parameter
});

export const SavedAccountsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}): React.ReactElement => {
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[] | null>(null);
  const [destinationAccount, setDestinationAccount] = useState<SavedAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeDestinationAccount = (account: SavedAccount) => {
    setDestinationAccount(account); // Now actually uses the `account` parameter
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

  return (
    <SavedAccountsContext.Provider
      value={{
        savedAccounts,
        fetchSavedAccounts,
        error,
        destinationAccount,
        changeDestinationAccount,
      }}
    >
      {children}
    </SavedAccountsContext.Provider>
  );
};
