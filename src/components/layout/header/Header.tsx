import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <div className="bg-primary-dark-blue h-[140px]">
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="flex items-center gap-2">
            <img src="/LogoBCA.svg" alt="Logo Connect by BCA" />
            <div className="flex flex-col">
              <h1
                className="font-bold text-white text-lg"
                aria-label="Connect by BCA"
              >
                Connect
              </h1>
              <p className="text-white text-base" aria-hidden="true">
                by BCA
              </p>
            </div>
          </div>
          <h2
            className="font-bold text-lg text-white ml-4"
            aria-label="Internet Banking"
          >
            Internet Banking
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;
