import React, { useEffect, useState } from "react";
import InfoRekening from "../components/layout/inforekening";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import FastMenu from "../components/layout/fastmenu";
import Preloading from "../components/base/preloading/preloading";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";

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
              <FastMenu />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Beranda;
