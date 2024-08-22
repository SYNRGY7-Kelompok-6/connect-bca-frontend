import React, { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  imageUrl?: string; // Use imageUrl instead of image, which is not handled in the backend
}

export interface ProfileContextType {
  profile: ProfileData | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (
    profileData: Partial<ProfileData>,
    image?: File
  ) => Promise<void>;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch profile data
  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await axios.get<{
        status: string;
        message: string;
        data: ProfileData;
      }>(`${import.meta.env.VITE_API_URL}/api/v1.0/users/profile/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProfile(response.data.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("An error occurred while fetching profile.");
      }
    }
  };

  const updateProfile = async (
    profileData: Partial<ProfileData>,
    image?: File
  ): Promise<void> => {
    try {
      // Fetch current profile data to compare with the updated profile data
      const currentProfile = profile; // Assuming profile is the current state

      // Prepare FormData
      const formData = new FormData();

      // Append only the fields that are different from the current profile
      Object.keys(profileData).forEach((key) => {
        const currentValue = currentProfile?.[key as keyof ProfileData];
        const newValue = profileData[key as keyof ProfileData];

        // Only append if the new value is different from the current value
        if (newValue !== currentValue && newValue !== undefined) {
          formData.append(key, newValue as string);
        }
      });

      // Include the image file if provided
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put<{
        status: string;
        message: string;
        data: ProfileData;
      }>(`${import.meta.env.VITE_API_URL}/api/v1.0/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the local profile state with the new data
      setProfile(response.data.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Error response:", err.response?.data);
        setError(err.message);
      } else {
        setError("An error occurred while updating profile.");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, fetchProfile, updateProfile, error }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
