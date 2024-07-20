import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuFitur: React.FC = () => {
  const location = useLocation();

  const buttons = [
    { name: "Beranda", path: "/" },
    { name: "Saldo & Mutasi", path: "/saldo-mutasi" },
    { name: "Transaksi", path: "/transaksi" },
    { name: "Informasi Lainnya", path: "/informasi-lainnya" },
    { name: "Administrasi", path: "/administrasi" },
    { name: "E-Mail", path: "/e-mail" },
    { name: "Profil", path: "/profil" },
  ];

  return (
    <div className="bg-black h-[60px] flex items-center">
      <div className="container mx-auto flex justify-center gap-10">
        {buttons.map((button) => (
          <Link key={button.name} to={button.path}>
            <button
              className={`text-base font-medium py-[4px] px-[16px] rounded-[16px] ${
                location.pathname === button.path
                  ? "bg-primary-blue text-white"
                  : "text-white"
              }`}
              type="button"
              aria-label={`Tombol untuk ${button.name}`}
            >
              {button.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuFitur;
