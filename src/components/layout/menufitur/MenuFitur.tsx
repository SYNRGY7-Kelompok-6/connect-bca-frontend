import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuFitur: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const location = useLocation();

  const buttons = useMemo(
    () => [
      { name: "Beranda", path: "/" },
      { name: "Info Saldo", path: "/informasi-saldo-rekening" },
      { name: "Mutasi Rekening", path: "/mutasi-rekening" },
      { name: "Transfer", path: "/transaksi" },
      { name: "Qris", path: "/qris/qris-transfer" },
      { name: "Profil", path: "/profile" },
    ],
    []
  );

  useEffect(() => {
    const currentButton = buttons.find((button) => {
      return location.pathname === button.path ||
        location.pathname.startsWith(button.path);
    });
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
      <nav
        className={`container mx-auto flex-row hidden md:flex ${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:justify-center lg:gap-16`}
      >
        {buttons.map((button) => (
          <Link key={button.name} to={button.path}>
            <button
              className={`text-base font-medium py-1 px-9 rounded-xl mx-2 ${
                location.pathname === button.path ||
                (button.path !== "/" &&
                  location.pathname.startsWith(button.path))
                  ? "bg-primary-blue text-white"
                  : "text-white"
              }`}
              type="button"
              aria-label={
                location.pathname === button.path ||
                (button.path !== "/" &&
                  location.pathname.startsWith(button.path))
                  ? `Anda berada di halaman ${button.name}.`
                  : `Tombol Navigasi ${button.name}`
              }
              aria-current={
                location.pathname === button.path ||
                (button.path !== "/" &&
                  location.pathname.startsWith(button.path))
                  ? "page"
                  : undefined
              }
            >
              {button.name}
            </button>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 w-1/2 h-full left-0 p-4 bg-neutral-1 shadow-box z-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto flex flex-col h-full">
          {/* Bagian atas dengan gambar */}
          <div className="flex flex-row justify-between items-center mb-4">
            <img src="./LogoBCA.svg" alt="Logo" className="w-16" />
            {/* Tombol Close */}
            <button
              aria-label="Tutup Menu"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center"
            >
              <img src="./close.svg" alt="Tutup Menu" />
            </button>
          </div>

          <div className="flex-grow flex items-center">
            <div className="flex flex-col w-full">
              {buttons.map((button) => (
                <Link key={button.name} to={button.path}>
                  <button
                    className={`text-base font-medium py-2 px-4 rounded-xl ${
                      location.pathname === button.path ||
                      (button.path !== "/" &&
                        location.pathname.startsWith(button.path))
                        ? "bg-primary-blue text-white w-full"
                        : "text-neutral-9"
                    }`}
                    type="button"
                    aria-label={
                      location.pathname === button.path ||
                      (button.path !== "/" &&
                        location.pathname.startsWith(button.path))
                        ? `Anda berada di halaman ${button.name}.`
                        : `Tombol Navigasi ${button.name}`
                    }
                    aria-current={
                      location.pathname === button.path ||
                      (button.path !== "/" &&
                        location.pathname.startsWith(button.path))
                        ? "page"
                        : undefined
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
      </div>
    </div>
  );
};

export default MenuFitur;
