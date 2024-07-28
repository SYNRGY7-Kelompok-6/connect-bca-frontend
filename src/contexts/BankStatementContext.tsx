// src/contexts/BankStatementContext.tsx

import React, { createContext, ReactNode, useState, useCallback } from 'react';
import axios from 'axios';
import { BankStatementData } from '../types/BankStatementTypes';

const apiUrl = import.meta.env.VITE_API_URL;

export interface BankStatementContextType {
  bankStatement: BankStatementData | null;
  fetchBankStatement: () => Promise<void>;
  fetchMutationsByDateRange: (
    fromDate: string,
    toDate: string,
    page: number,
    pageSize: number
  ) => Promise<void>;
  error: string | null;
}

const BankStatementContext = createContext<BankStatementContextType | undefined>(undefined);

const BankStatementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bankStatement, setBankStatement] = useState<BankStatementData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBankStatement = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<{ data: BankStatementData }>(`${apiUrl}/api/v1.0/bank-statement`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setBankStatement(response.data.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Failed to fetch bank statement');
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, []);

  const fetchMutationsByDateRange = useCallback(
    async (fromDate: string, toDate: string, page: number, pageSize: number): Promise<void> => {
      try {
        const response = await axios.get<{ data: BankStatementData }>(`${apiUrl}/api/v1.0/bank-statement`, {
          params: { fromDate, toDate, page, pageSize },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setBankStatement(response.data.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || 'Failed to fetch mutations');
        } else {
          setError('An unexpected error occurred');
        }
      }
    },
    []
  );

  return (
    <BankStatementContext.Provider value={{ bankStatement, fetchBankStatement, fetchMutationsByDateRange, error }}>
      {children}
    </BankStatementContext.Provider>
  );
};

export { BankStatementProvider, BankStatementContext };
