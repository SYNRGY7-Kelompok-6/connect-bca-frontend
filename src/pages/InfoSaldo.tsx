import React, { useEffect, useState } from "react";
import LaporanKeuangan from "../components/layout/laporankeuangan/LaporanKeuangan";
import InfoUser from "../components/layout/infouser";
import InfoRekening from "../components/layout/inforekening";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";
import Preloading from "../components/base/preloading/preloading";
import MenuFitur from "../components/layout/menufitur";

const InfoSaldo: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchBankStatement, bankStatement, fetchAccountMonthly } =
    useBankStatement();

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchLoginInfo(),
            fetchBankStatement("05-08-2024", "05-08-2024"),
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
      {loading ? (
        <Preloading />
      ) : (
        <>
          <InfoUser />
          <MenuFitur />
          <section className="container mx-auto mt-5 md:mt-[50px] pb-5 md:pb-[50px] px-4 md:px-0">
            <div className="grid flex-col md:grid-cols-4 lg:grid-cols-3 md:mb-[50px] gap-5 md:gap-10">
              <InfoRekening showInfoAkun={true} />
              <LaporanKeuangan />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default InfoSaldo;
