import React, { createContext, ReactNode, useState, useCallback } from "react";
import axios from "axios";
import {
  BankStatementData,
  Mutation,
  MutationData,
  MonthlyBankStatementData,
} from "../types/BankStatementTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export interface BankStatementContextType {
  bankStatement: BankStatementData | null;
  monthlyBankStatement: MonthlyBankStatementData | null;
  mutation: Mutation[] | null;
  fetchBankStatement: (
    fromDate?: string,
    toDate?: string,
    page?: number,
    pageSize?: number
  ) => Promise<void>;
  fetchMutation: (
    fromDate?: string,
    toDate?: string,
    page?: number,
    pageSize?: number
  ) => Promise<void>;
  fetchAccountMonthly: (
    month: number
  ) => Promise<void>;
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
    useState<MonthlyBankStatementData | null>(null);
  const [mutation, setMutation] = useState<Mutation[]>([]);
  // const [accountMonthly, setAccountMonthly] = useState<AccountMonthly | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBankStatement = useCallback(async (
    fromDate?: string,
    toDate?: string,
    page?: number,
    pageSize?: number
  ): Promise<void> => {
    try {
      const response = await axios.get<{ data: BankStatementData }>(
        `${apiUrl}/api/v1.0/bank-statement`,
        {
          params: {
          fromDate,
          toDate,
          page,
          pageSize
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setBankStatement(response.data.data);
      console.log(response.data.data)
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

  const fetchMutation = useCallback(async (
    fromDate?: string,
    toDate?: string,
    page?: number,
    pageSize?: number): Promise<void> => {
    try {
      const response = await axios.get<MutationData>(`${apiUrl}/api/v1.0/bank-statement/mutations`, {
        params: {
          fromDate,
          toDate,
          page,
          pageSize
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-PIN-TOKEN': `${localStorage.getItem('pinToken')}`
        }
      });
      const mutations = response.data.data.mutations;
      setMutation(mutations);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Failed to fetch bank statement');
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, []);

  // const fetchAccountMonthly = useCallback(async (
  //   month: number
  //   ): Promise<void> => {
  //   try {
  //     const response = await axios.get<AccountMonthlyData>(`${apiUrl}/api/v1.0/bank-statement/monthly`, {
  //       params: {
  //         month
  //       },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //       }
  //     });
  //     const monthlyData = response.data.data;
  //     setAccountMonthly(monthlyData);
  //     console.log(monthlyData)
  //     setError(null);
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       setError(err.response?.data.message || 'Failed to fetch bank statement');
  //     } else {
  //       setError('An unexpected error occurred');
  //     }
  //   }
  // }, []);

  return (
    <BankStatementContext.Provider
      value={{
        bankStatement,
        mutation,
        monthlyBankStatement,
        fetchBankStatement,
        fetchAccountMonthly,
        fetchMutation,
        error,
      }}
    >
      {children}
    </BankStatementContext.Provider>
  );
};

export { BankStatementProvider, BankStatementContext };
