import React from "react";
import Header from "../components/header";

const UnderMaintenance: React.FC = () => {
  return (
    <body className="bg-primary-dark-blue font-sans">
      <Header />
      <section className="container mx-auto mt-[60px] pb-[60px]">
        <div className="bg-white items-center text-center flex flex-col justify-center rounded-[20px] p-[40px]">
          <h1 className="font-bold text-[48px] text-primary-dark-blue">
            Fitur Yang Ingin Anda Akses Masih Belum Tersedia
          </h1>
          <img src="/MaintenanceLogo.svg" alt="Under Maintenance" />
          <button
            className="bg-primary-dark-blue text-lg text-white font-bold rounded-[16px] w-[497px] h-[87px]"
            type="button"
          >
            Kembali ke Laman Login
          </button>
        </div>
      </section>
    </body>
  );
};

export default UnderMaintenance;
