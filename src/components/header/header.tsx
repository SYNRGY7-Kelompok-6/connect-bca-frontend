import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <section className="container mx-auto pt-10 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/LogoBCA.png" alt="Logo Connect by BCA" />
            <div className="flex flex-col gap-1.5">
              <h1 className="font-semibold text-white text-lg">Connect</h1>
              <p className="text-white text-sm">by BCA</p>
            </div>
          </div>
          <div className="font-semibold text-lg text-white">
            <h2>Internet Banking</h2>
          </div>
        </div>
      </section>
      <div className="bg-white h-6 w-full"></div>
    </>
  );
};

export default Header;
