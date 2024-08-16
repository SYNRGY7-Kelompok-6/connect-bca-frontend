import React from "react";
import ButtonIcon from "../../base/buttonicon";
import { useNavigate } from "react-router-dom";

const FastMenu: React.FC = () => {
  const navigate = useNavigate();
  const handleTransferClick = () => {
    navigate("/transaksi");
  };

  const handleQrisClick = () => {
    navigate("/qris");
  };

  const handleInfoSaldoClick = () => {
    navigate("/mutasi-rekening");
  };

  return (
    <div className="md:col-span-2 items-center md:gap-[20px] shadow-box h-fit order-1 md:order-2">
      <div className="flex flex-col gap-6 justify-center items-center w-full bg-neutral-1 rounded-b ">
        <h1 className="text-md text-white font-bold bg-primary-dark-blue w-full p-[18px] text-center rounded-t">
          Fitur Utama
        </h1>
        <div className="flex gap-[40px] p-[18px]">
          <ButtonIcon
            ariaLabel="Tombol transfer"
            onClick={handleTransferClick}
            imgSrc="/Transfer.svg"
            imgAlt="Tombol transfer"
            text="Transfer"
            imgClassName="w-[40px]"
            textClassName="text-primary-dark-blue"
            containerClassName="flex-col"
            backgroundClassName="bg-fill4"
          />
          <ButtonIcon
            ariaLabel="Tombol QRIS Bayar"
            onClick={handleQrisClick}
            imgSrc="/QRIS.svg"
            imgAlt="Tombol QRIS Bayar"
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
            imgAlt="Tombol Mutasi Rekening"
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
