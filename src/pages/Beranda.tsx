import React from "react";
import Header from "../components/layout/header";
import InfoRekening from "../components/layout/inforekening";
import InfoUser from "../components/layout/infouser";
import MenuFitur from "../components/layout/menufitur";
import FastMenu from "../components/layout/fastmenu";

const Beranda: React.FC = () => {
  return (
    <body className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto mt-[50px] pb-[50px]">
        <div className="grid grid-cols-3 grid-flow-row mb-[50px]">
          <InfoRekening showInfoAkun={true} />
          <FastMenu />
        </div>
      </section>
    </body>
  );
};

export default Beranda;
