import React, { useEffect, useState } from "react";
import MutasiLayout from "../components/layout/MutasiLayout";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";
import Preloading from "../components/base/preloading/preloading";
import InfoUser from "../components/layout/infouser/InfoUser";
import MenuFitur from "../components/layout/menufitur/MenuFitur";
import { formatDateFetch } from "../utils/utils";

const MutasiRekening: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchBankStatement, bankStatement, fetchAccountMonthly } =
    useBankStatement();

  const [hasFetchedData, setHasFetchedData] = useState(false);
  const endDate = new Date();
  const startDate = new Date()
  startDate.setMonth(new Date().getMonth() - 1)

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchLoginInfo(),
            fetchBankStatement(formatDateFetch(startDate), formatDateFetch(endDate)),
            fetchAccountMonthly(8),
          ]);
          setHasFetchedData(true);
        } catch (err) {
          console.error("Error fetching data", err);
        } finally {
          setLoading(false);
          console.log(bankStatement);
        }
      };

      fetchData();
    }
  }, [
    hasFetchedData,
    fetchLoginInfo,
    fetchBankStatement,
    fetchAccountMonthly,
    setLoading,
    bankStatement,
  ]);

  return (
    <div className="bg-fill0 font-jakartasans">
      { loading ? (
        <Preloading />
      ) : (
        <>
          <InfoUser />
          <MenuFitur />
          <section className="container mx-auto mt-5 md:mt-[50px] pb-5 md:pb-[50px] px-4 md:px-0">
            <MutasiLayout />
          </section>
        </>
      )}
    </div>
  );
};

export default MutasiRekening;
