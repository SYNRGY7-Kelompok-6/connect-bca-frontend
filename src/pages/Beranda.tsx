import React, { useEffect, useState } from "react";
import Header from "../components/layout/header";
import InfoRekening from "../components/layout/inforekening";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import FastMenu from "../components/layout/fastmenu";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";
import Preloading from "../components/base/preloading/preloading";

const Beranda: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchBankStatement } = useBankStatement();

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([fetchLoginInfo(), fetchBankStatement()]);
          setHasFetchedData(true);
        } catch (err) {
          console.error("Error fetching data", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [hasFetchedData, fetchLoginInfo, fetchBankStatement, setLoading]);

  return (
    <div className="bg-primary-dark-blue font-sans">
      {loading ? (
        <Preloading />
      ) : (
        <>
          <Header />
          <InfoUser />
          <MenuFitur />
          <section className="container mx-auto mt-[50px] pb-[50px]">
            <div className="grid grid-cols-3 grid-flow-row mb-[50px] gap-16">
              <InfoRekening showInfoAkun={true} />
              <FastMenu />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Beranda;
