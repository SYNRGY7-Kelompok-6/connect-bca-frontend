import React, { useEffect, useState } from "react";
import Preloading from "../components/base/preloading";
import InfoUser from "../components/layout/infouser/InfoUser";
import MenuFitur from "../components/layout/menufitur/MenuFitur";
import { useLoading } from "../contexts/useLoading";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";
import useSavedAccounts from "../contexts/useSavedAccount";
import DaftarRekening from "../components/layout/daftarrekening";
import RekeningBaru from "../components/layout/rekeningbaru";
import TransferForm from "../components/layout/TransferForm";
import TransferConfirmation from "../components/layout/TransferConfirmation";

const Transaksi: React.FC = () => {
  const location = useLocation();
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchBankStatement } = useBankStatement();
  const { fetchSavedAccounts } = useSavedAccounts();

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchLoginInfo(),
            fetchBankStatement(),
            fetchSavedAccounts(), 
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
    fetchSavedAccounts,
    setLoading,
  ]);

  const renderContent = () => {
    switch (location.pathname) {
      case "/transaksi/rekening":
        return <RekeningBaru />;
      case "/transaksi/transfer":
        return <TransferForm />;
      case "/transaksi/transfer/confirmation":
        return <TransferConfirmation />;
      default:
        return <DaftarRekening />;
    }
  };

  return (
    <div className="font-jakartasans bg-fill0">
      {loading ? (
        <Preloading />
      ) : (
        <>
          <InfoUser />
          <MenuFitur />
          <section className="container mx-auto mt-[50px] pb-[50px] md:h-full h-screen px-4 md:px-0">
            <div className="flex flex-row gap-[80px]">{renderContent()}</div>
          </section>
        </>
      )}
    </div>
  );
};

export default Transaksi;
