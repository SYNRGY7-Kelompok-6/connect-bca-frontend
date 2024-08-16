import { useContext } from 'react';
import { QrisTfContext, QrisTfContextType } from './QrisTransferContext';

const useQrisTransfer = (): QrisTfContextType => {
  const context = useContext(QrisTfContext);
  if (context === undefined) {
    throw new Error('useQrisTransfer must be used within an QRISProvider');
  }
  return context;
};

export default useQrisTransfer;
