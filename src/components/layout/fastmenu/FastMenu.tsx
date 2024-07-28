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
    <div className="flex flex-col col-span-2 items-center gap-[20px]">
      <h1 className="text-lg text-white font-bold">Fast Menu</h1>
      <div className="flex gap-[40px] mt-[10px]">
        <ButtonIcon
          ariaLabel="Tombol transfer"
          onClick={handleTransferClick}
          imgSrc="/Transfer.svg"
          imgAlt="Transfer"
          text="Transfer"
          imgClassName="w-[40px]"
          textClassName=""
          containerClassName="flex-col"
        />
        <ButtonIcon
          ariaLabel="Tombol Menampilkan QRIS Bayar"
          onClick={handleQrisClick}
          imgSrc="/QRIS.svg"
          imgAlt="QRIS Bayar"
          text="QRIS Bayar"
          imgClassName="w-[40px]"
          textClassName=""
          containerClassName="flex-col"
        />
        <ButtonIcon
          ariaLabel="Tombol Menampilkan Saldo Pada Rekening"
          onClick={handleInfoSaldoClick}
          imgSrc="/InfoSaldo.svg"
          imgAlt="Info Saldo"
          text="Info Saldo"
          imgClassName="w-[40px]"
          textClassName=""
          containerClassName="flex-col"
        />
      </div>
    </div>
  );
};

export default FastMenu;
