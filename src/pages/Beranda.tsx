import React from "react";
import Header from "../components/header";
import InfoRekening from "../components/inforekening";
import InfoAkun from "../components/infoakun";
import InfoUser from "../components/infouser";
import MenuFitur from "../components/menufitur";
import FastMenu from "../components/fastmenu";

const Beranda: React.FC = () => {
  return (
    <body className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto mt-[50px] pb-[50px]">
        <div className="grid grid-cols-3 grid-flow-row mb-[50px]">
          <InfoRekening />
          <FastMenu />
        </div>
        <InfoAkun />
      </section>
    </body>
  );
};

export default Beranda;
