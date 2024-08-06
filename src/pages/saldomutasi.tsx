import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdown from "../components/layout/dropdown/DropDown";
import { useLoading } from "../contexts/useLoading";
import { useAuth } from "../contexts/useAuth";
import useBankStatement from "../contexts/useBankStatement";
import MutasiRekening from "./MutasiRekening";
import InfoSaldo from "./InfoSaldo";
import Preloading from "../components/base/preloading/preloading";

const SaldoMutasi: React.FC = () => {
  const location = useLocation();
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
            fetchBankStatement('05-08-2024', '05-08-2024'),
            fetchAccountMonthly(8),
          ]);
          setHasFetchedData(true);
        } catch (err) {
          console.error("Error fetching data", err);
        } finally {
          setLoading(false);
          console.log(bankStatement)
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
  ]);

  const renderContent = () => {
    switch (location.pathname) {
      case "/saldo-mutasi/informasi-saldo-rekening":
        return <InfoSaldo />;
      case "/saldo-mutasi/mutasi-rekening":
        return <MutasiRekening />;
      default:
        return <InfoSaldo />;
    }
  };

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
            <div className="flex flex-row gap-[80px]">
              <Dropdown
                buttonLabel="Informasi Saldo & Mutasi"
                activeItem={location.pathname}
                items={[
                  {
                    label: "Informasi Saldo Rekening",
                    href: "/saldo-mutasi/informasi-saldo-rekening",
                  },
                  {
                    label: "Mutasi Rekening",
                    href: "/saldo-mutasi/mutasi-rekening",
                  },
                ]}
              />
              {renderContent()}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default SaldoMutasi;
