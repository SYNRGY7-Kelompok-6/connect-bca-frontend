export interface Currency {
  value: number;
  currency: string;
  remainingBalance?: number; // Optional field for Mutation
}

export interface Balance {
  availableBalance: Currency;
  holdAmount: Currency;
}

export interface AccountInfo {
  accountNo: string;
  accountType: string;
  accountCardExp: string; // Assuming this is a string based on example
  name: string;
  cvv: string;
  balance: Balance; // Changed from accountBalance to balance
  pinExpiredTimeLeft: number;
}

export interface AccountBalance {
  startingBalance: {
    value: number;
    currency: string;
    dateTime: string;
  };
  endingBalance: {
    value: number;
    currency: string;
    dateTime: string;
  };
}

export interface BeneficiaryAccount {
  beneficiaryAccountNumber: string;
  beneficiaryAccountName: string;
}

export interface Mutation {
  transactionId: string;
  amount: Currency;
  transactionDate: string;
  remark: string;
  desc: string;
  type: "CREDIT" | "DEBIT";
  beneficiaryAccount: BeneficiaryAccount;
  sourceAccount: BeneficiaryAccount;
}

export interface BankStatementData {
  accountInfo: AccountInfo;
  accountBalance: AccountBalance;
  mutations: Mutation[];
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface MutationData {
  status: string;
  message: string;
  data: {
    mutations: Mutation[];
  };
}

export interface AccountMonthlyData {
  data: {
    monthlyIncome: {
      value: number;
      currency: string;
    };
    monthlyOutcome: {
      value: number;
      currency: string;
    };
  };
}

export interface MonthlyBankStatementData {
  monthlyIncome: Currency;
  monthlyOutcome: Currency;
}
