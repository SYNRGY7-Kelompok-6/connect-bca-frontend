import React from "react";
import LaporanKeuangan from "../components/layout/laporankeuangan/LaporanKeuangan";
import InfoRekening from "../components/layout/inforekening";

const InfoSaldo: React.FC = () => {
  return (
    <>
      <InfoRekening showInfoCVV={true} />
      <LaporanKeuangan />
    </>
  );
};

export default InfoSaldo;
