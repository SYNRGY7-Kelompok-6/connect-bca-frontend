import { useContext } from "react";
import { SavedAccountsContext, SavedAccountsContextType } from "./SavedAccountsContext";

const useSavedAccounts = (): SavedAccountsContextType => {
  const context = useContext(SavedAccountsContext);

  if (context === undefined) {
    throw new Error("useSavedAccounts must be used within a SavedAccountsProvider");
  }

  return context;
};

export default useSavedAccounts;
