import React from "react";
import ButtonIcon from "../../base/buttonicon";
import { useNavigate } from "react-router-dom";

const FastMenu: React.FC = () => {
  const navigate = useNavigate();
  const handleTransferClick = () => {
    navigate("/transaksi");
  };

  const handleQrisClick = () => {
    navigate("/transaksi/qris-bayar");
  };

  const handleInfoSaldoClick = () => {
    navigate("/saldo-mutasi");
  };

  return (
    <div className="flex flex-col col-span-2 items-center gap-[20px] mt-[53px]">
      <div className="flex flex-col gap-6 justify-center items-center py-[18px] w-full bg-primary-light-blue rounded-[20px]">
        <h1 className="text-lg text-primary-dark-blue font-bold">Fitur Utama</h1>
        <div className="flex gap-[40px] mt-[10px]">
          <ButtonIcon
            ariaLabel="Tombol transfer"
            onClick={handleTransferClick}
            imgSrc="/Transfer.svg"
            imgAlt="Transfer"
            text="Transfer"
            imgClassName="w-[40px]"
            textClassName="text-primary-dark-blue"
            containerClassName="flex-col"
            backgroundClassName="bg-fill4"
          />
          <ButtonIcon
            ariaLabel="Tombol QRIS"
            onClick={handleQrisClick}
            imgSrc="/QRIS.svg"
            imgAlt="QRIS Bayar"
            text="QRIS Bayar"
            imgClassName="w-[40px]"
            textClassName="text-primary-dark-blue"
            containerClassName="flex-col"
            backgroundClassName="bg-fill4"
          />
          <ButtonIcon
            ariaLabel="Tombol Mutasi Rekening"
            onClick={handleInfoSaldoClick}
            imgSrc="/Calendar.svg"
            imgAlt="Mutasi Rekening"
            text="Mutasi"
            imgClassName="w-[40px]"
            textClassName="text-primary-dark-blue"
            containerClassName="flex-col"
            backgroundClassName="bg-fill4"
          />
        </div>
      </div>
    </div>
  );
};

export default FastMenu;
