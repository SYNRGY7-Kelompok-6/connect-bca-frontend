import React, { createContext, ReactNode, useState, useCallback } from "react";
import axios from "axios";
import {
  BankStatementData,
  MonthlyBankStatementData,
} from "../types/BankStatementTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export interface BankStatementContextType {
  bankStatement: BankStatementData | null;
  monthlyBankStatement: MonthlyBankStatementData | null;
  fetchBankStatement: () => Promise<void>;
  fetchAccountMonthly: (month: number) => Promise<void>;
  error: string | null;
}

const BankStatementContext = createContext<
  BankStatementContextType | undefined
>(undefined);

const BankStatementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bankStatement, setBankStatement] = useState<BankStatementData | null>(
    null
  );
  const [monthlyBankStatement, setMonthlyBankStatement] =
    useState<MonthlyBankStatementData | null>(null); // Tambahkan ini
  const [error, setError] = useState<string | null>(null);

  const fetchBankStatement = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<{ data: BankStatementData }>(
        `${apiUrl}/api/v1.0/bank-statement`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setBankStatement(response.data.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message || "Failed to fetch bank statement"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  }, []);

  const fetchAccountMonthly = useCallback(
    async (month: number): Promise<void> => {
      try {
        const response = await axios.get<{ data: MonthlyBankStatementData }>(
          `${apiUrl}/api/v1.0/bank-statement/monthly`,
          {
            params: { month },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setMonthlyBankStatement(response.data.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data.message ||
              "Failed to fetch monthly bank statement"
          );
        } else {
          setError("An unexpected error occurred");
        }
      }
    },
    []
  );

  return (
    <BankStatementContext.Provider
      value={{
        bankStatement,
        monthlyBankStatement,
        fetchBankStatement,
        fetchAccountMonthly,
        error,
      }}
    >
      {children}
    </BankStatementContext.Provider>
  );
};

export { BankStatementProvider, BankStatementContext };
