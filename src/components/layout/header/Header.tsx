import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <header className="container mx-auto pt-10 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/LogoBCA.png" alt="Logo Connect by BCA" />
            <div className="flex flex-col gap-1.5">
              <h1
                className="font-semibold text-white text-lg"
                aria-label="Connect by BCA"
              >
                Connect
              </h1>
              <p className="text-white text-sm" aria-hidden="true">
                by BCA
              </p>
            </div>
          </div>
          <h2
            className="font-semibold text-lg text-white"
            aria-label="Internet Banking"
          >
            Internet Banking
          </h2>
        </div>
      </header>
      <div className="bg-primary-blue h-3 w-full" role="presentation"></div>
    </>
  );
};

export default Header;
