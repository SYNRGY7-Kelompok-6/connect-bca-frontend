import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdown from "../components/layout/dropdown";

const SaldoMutasi: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="py-[40px] px-[72px] w-full">
        <div className="flex flex-row gap-[62px]">
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
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default SaldoMutasi;