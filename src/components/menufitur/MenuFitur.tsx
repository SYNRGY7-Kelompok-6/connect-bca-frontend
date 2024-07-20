import React from "react";
import { useState } from "react";

const MenuFitur: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState("Beranda");

  const buttons = [
    "Beranda",
    "Saldo & Mutasi",
    "Transaksi",
    "Informasi Lainnya",
    "Administrasi",
    "E-Mail",
    "Profil",
  ];
  return (
    <div className="bg-black h-[60px] flex items-center">
      <div className="container mx-auto flex justify-center gap-10">
        {buttons.map((button) => (
          <button
            key={button}
            className={`text-base font-medium py-[4px] px-[16px] rounded-[16px] ${
              selectedButton === button
                ? "bg-primary-blue text-white"
                : "text-white"
            }`}
            type="button"
            aria-label={`Tombol untuk ${button}`}
            onClick={() => setSelectedButton(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFitur;
