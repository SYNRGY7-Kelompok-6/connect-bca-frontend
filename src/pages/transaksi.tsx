import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdowntransfer from "../components/layout/dropdowntransfer";
// import MutasiRekening from "./MutasiRekening";
import QrisBayar from "./qrisbayar";
import QrisTransfer from "./qristransfer";

const Transaksi: React.FC = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/transaksi/transfer":
        return <QrisBayar />;
      case "/transaksi/qris-bayar":
        return <QrisBayar />;
      case "/transaksi/qris-transfer":
        return <QrisTransfer />;
      default:
        return <QrisBayar />;
    }
  };

  return (
    <div className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto mt-[50px] pb-[50px]">
        <div className="flex flex-row gap-[80px]">
          <div className="">
            <Dropdowntransfer
              buttonLabel="Transaksi Transfer"
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
              buttonLabel2="Transaksi Qris"
              activeItem2={location.pathname}
              items2={[
                {
                  label: "Qris Bayar",
                  href: "/transaksi/qris-bayar",
                },
                {
                  label: "Qris Transfer",
                  href: "/transaksi/qris-transfer",
                },
              ]}
            />
          </div>
          {renderContent()}
        </div>
      </section>
    </div>
  );
};

export default Transaksi;