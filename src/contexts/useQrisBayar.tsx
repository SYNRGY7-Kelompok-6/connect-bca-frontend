import { useContext } from 'react';
import { QrisBrContext, QrisBrContextType } from './QrisBayarContext';

const useQrisBayar = (): QrisBrContextType => {
  const context = useContext(QrisBrContext);
  if (context === undefined) {
    throw new Error('useQrisBayar must be used within an QrisBrProvider');
  }
  return context;
};

export default useQrisBayar;
