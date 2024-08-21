import React, { useEffect, useState } from "react";
import InfoUser from "../components/layout/infouser/InfoUser";
import MenuFitur from "../components/layout/menufitur/MenuFitur";
import ProfileLayout from "../components/layout/profile";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useProfile from "../contexts/useProfile";
import useBankStatement from "../contexts/useBankStatement";
import Preloading from "../components/base/preloading/preloading";

const Profile: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchProfile } = useProfile();
  const { fetchBankStatement } = useBankStatement();

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchLoginInfo(),
            fetchBankStatement(),
            fetchProfile(),
          ]);
          setHasFetchedData(true);
        } catch (err) {
          console.error("Error fetching data", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [
    hasFetchedData,
    fetchLoginInfo,
    fetchBankStatement,
    fetchProfile,
    setLoading,
  ]);

  return (
    <div className="font-jakartasans bg-fill0">
      {loading ? (
        <Preloading />
      ) : (
        <>
          <InfoUser />
          <MenuFitur />
          <ProfileLayout />
        </>
      )}
    </div>
  );
};

export default Profile;
