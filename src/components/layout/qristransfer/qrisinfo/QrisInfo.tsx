import React from 'react';

interface BankStatement {
  accountInfo: {
    name: string;
    accountNo: string;
  };
}

interface QrisInfoProps {
  bankStatement?: BankStatement;
}

const QrisInfo: React.FC<QrisInfoProps> = ({ bankStatement }) => (
  <>
    {bankStatement && (
      <>
        <div className="text-lg text-primary-dark-blue font-bold">
          {bankStatement.accountInfo.name}
        </div>
        <div className="text-base text-primary-dark-blue"
          aria-label="BCA">
          BCA -&nbsp;{bankStatement.accountInfo.accountNo}
        </div>
      </>
    )}
  </>
);

export default QrisInfo;
