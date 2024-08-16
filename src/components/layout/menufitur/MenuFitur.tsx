import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuFitur: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const location = useLocation();

  const buttons = useMemo(
    () => [
      { name: "Beranda", path: "/" },
      {
        name: "Info Saldo",
        path: "/informasi-saldo-rekening",
      },
      {
        name: "Mutasi Rekening",
        path: "/mutasi-rekening",
      },
      { name: "Transaksi", path: "/transaksi" },
      { name: "Qris", path: "/qris/qris-transfer" },
      { name: "Profil", path: "/profil" },
    ],
    []
  );

  useEffect(() => {
    const currentButton = buttons.find(
      (button) => button.path === location.pathname
    );
    if (currentButton) {
      setActiveButton(currentButton.name);
    }
  }, [location.pathname, buttons]);

  return (
    <div className="bg-primary-dark-blue h-[70px] flex items-center overflow-hidden">
      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden flex items-center px-4 justify-between w-full">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white flex items-center gap-2"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <img src="/hamburger-icon.svg" alt="Ikon Menu" />
        </button>
        {activeButton && (
          <span className="text-white text-base font-semibold">
            {activeButton}
          </span>
        )}
      </div>

      {/* Desktop Menu */}
      <div
        className={`container mx-auto flex-row hidden md:flex ${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:justify-center md:gap-16`}
      >
        {buttons.map((button) => (
          <Link key={button.name} to={button.path}>
            <button
              className={`text-base font-medium py-1 px-9 rounded-xl mx-2 ${
                location.pathname === button.path
                  ? "bg-primary-blue text-white"
                  : "text-white"
              }`}
              type="button"
              aria-label={
                location.pathname === button.path
                  ? `Anda berada di halaman ${button.name}.`
                  : `Tombol Navigasi ${button.name}`
              }
              aria-current={
                location.pathname === button.path ? "page" : undefined
              }
            >
              {button.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[230px] left-0 p-4 w-full bg-primary-dark-blue z-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto flex flex-col">
          {buttons.map((button) => (
            <Link key={button.name} to={button.path}>
              <button
                className={`text-base font-medium py-2 px-4 rounded-xl ${
                  location.pathname === button.path
                    ? "bg-primary-blue text-white"
                    : "text-white"
                }`}
                type="button"
                aria-label={
                  location.pathname === button.path
                    ? `Anda berada di halaman ${button.name}.`
                    : `Tombol Navigasi ${button.name}`
                }
                aria-current={
                  location.pathname === button.path ? "page" : undefined
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {button.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuFitur;
