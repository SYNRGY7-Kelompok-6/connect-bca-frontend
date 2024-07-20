import React from "react";
import ButtonIcon from "../buttonicon";

const FastMenu: React.FC = () => {
  return (
    <div className="flex flex-col col-span-2 items-center gap-[20px]">
      <h1 className="text-lg text-white font-bold">Fast Menu</h1>
      <div className="flex gap-[40px] mt-[10px]">
        <ButtonIcon
          ariaLabel="Tombol transfer"
          //   onClick={showPopup}
          imgSrc="/Transfer.svg"
          imgAlt="Transfer"
          text="Transfer"
          imgClassName="w-[40px]"
          textClassName=""
          containerClassName="flex-col"
        />
        <ButtonIcon
          ariaLabel="Tombol Menampilkan QRIS Bayar"
          //   onClick={showPopup}
          imgSrc="/QRIS.svg"
          imgAlt="QRIS Bayar"
          text="QRIS Bayar"
          imgClassName="w-[40px]"
          textClassName=""
          containerClassName="flex-col"
        />
        <ButtonIcon
          ariaLabel="Tombol Menampilkan Saldo Pada Rekening"
        //   onClick={showPopup}
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
