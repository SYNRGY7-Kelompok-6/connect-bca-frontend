import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <section className="container mx-auto pt-[38px] mb-[32px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-2">
            <img src="/LogoBCA.png" alt="Logo BCA" />
            <div className="flex flex-col gap-[6px]">
              <h1 className="font-semibold text-white text-lg">Connect</h1>
              <p className="text-white text-sm">by BCA</p>
            </div>
          </div>
          <div className="font-semibold text-lg text-white">
            <h2>Internet Banking</h2>
          </div>
        </div>
      </section>
      <div className="bg-white h-[23px] w-full"></div>
    </>
  );
};

export default Header;
