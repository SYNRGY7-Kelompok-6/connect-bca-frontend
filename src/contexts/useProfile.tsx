import { useContext } from 'react';
import { ProfileContext, ProfileContextType } from './ProfileContext';

// Custom hook to use the profile context
const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export default useProfile;
