export interface Currency {
  value: number;
  currency: string;
  remainingBalance?: number;
}

export interface AccountInfo {
  accountNo: string;
  accountType: string;
  accountCardExp: string;
  name: string;
  cvv: string;
  accountBalance: {
    availableBalance: Currency;
    holdAmount: Currency;
  };
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
  amount: Currency;
  transactionDate: string;
  remark: string;
  type: "CREDIT" | "DEBIT";
  beneficiaryAccount: BeneficiaryAccount;
  sourceAccount: BeneficiaryAccount;
}

export interface BankStatementData {
  accountInfo: AccountInfo;
  accountBalance: AccountBalance;
  mutations: Mutation[];
}

export interface MonthlyBankStatementData {
  monthlyIncome: Currency;
  monthlyOutcome: Currency;
}

  export interface AccountInfo {
    accountNo: string;
    accountType: string;
    accountCardExp: string;
    name: string;
    accountBalance: {
      availableBalance: Currency;
      holdAmount: Currency;
    };
    accountMonthly: AccountMonthly;
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

  export interface AccountMonthly {
    monthlyIncome: Currency;
    monthlyOutcome: Currency;
  }

  export interface BeneficiaryAccount {
    beneficiaryAccountNumber: string;
    beneficiaryAccountName: string;
  }
  
  export interface Mutation {
    transactionId: string;
    amount: Currency;
    desc: string;
    transactionDate: string;
    remark: string;
    type: 'CREDIT' | 'DEBIT';
    beneficiaryAccount: BeneficiaryAccount;
    sourceAccount: BeneficiaryAccount;
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
    }
  }

  export interface BankStatementData {
    accountInfo: AccountInfo;
    accountBalance: AccountBalance;
    mutations: Mutation[];
  }
