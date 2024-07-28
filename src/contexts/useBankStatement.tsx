import { useContext } from 'react';
import { BankStatementContext, BankStatementContextType, } from './BankStatementContext';

const useBankStatement = (): BankStatementContextType => {
  const context = useContext(BankStatementContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useBankStatement;