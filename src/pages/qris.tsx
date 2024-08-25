import React from "react";
import { useLocation } from "react-router-dom";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import Dropdown from "../components/layout/dropdown";
import QrisBayar from "./qrisbayar";
import QrisTransfer from "./qristransfer";

const Qris: React.FC = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/qris/qris-transfer":
        return <QrisTransfer />;
      case "/qris/qris-bayar":
        return <QrisBayar />;
      default:
        return <QrisTransfer />;
    }
  };

  return (
    <div className="bg-fill-0 font-jakartasans">
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto md:mt-[50px] mt-5 md:pb-[50px] pb-5 px-4 md:px-0">
        <div className="flex md:flex-row flex-col gap-[80px]">
          <div className="">
            <Dropdown
              buttonLabel="Transaksi Transfer"
              activeItem={location.pathname}
              items={[
                {
                  label: "Qris Transfer",
                  href: "/qris/qris-transfer",
                },
                {
                  label: "Qris Bayar",
                  href: "/qris/qris-bayar",
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

export default Qris;
