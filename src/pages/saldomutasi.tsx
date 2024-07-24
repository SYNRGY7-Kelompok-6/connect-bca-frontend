import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdown from "../components/layout/dropdown";

// import MutasiRekening from "./MutasiRekening";
import InfoSaldo from "./InfoSaldo";

const SaldoMutasi: React.FC = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/saldo-mutasi/informasi-saldo-rekening":
        return <InfoSaldo />;
      case "/saldo-mutasi/mutasi-rekening":
        return <InfoSaldo />;
      default:
        return <InfoSaldo />;
    }
  };

  return (
    <div className="bg-primary-dark-blue font-sans">
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
    </div>
  );
};

export default SaldoMutasi;
