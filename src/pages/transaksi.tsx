import React from "react";
import { useLocation } from "react-router-dom";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdowntransfer from "../components/layout/dropdowntransfer";
import QrisBayar from "./qrisbayar";
import QrisTransfer from "./qristransfer";

const Transaksi: React.FC = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/transaksi/transfer":
        return <QrisBayar />;
      case "/transaksi/qris-transfer":
        return <QrisTransfer />;
      case "/transaksi/qris-bayar":
        return <QrisBayar />;
      default:
        return <QrisBayar />;
    }
  };

  return (
    <div className="bg-fill-0 font-jakartasans">
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
                  label: "Transfer Antar Bank BCA",
                  href: "/transfer",
                }
              ]}
              buttonLabel2="Transaksi Qris"
              activeItem2={location.pathname}
              items2={[
                {
                  label: "Qris Transfer",
                  href: "/transaksi/qris-transfer",
                },
                {
                  label: "Qris Bayar",
                  href: "/transaksi/qris-bayar",
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