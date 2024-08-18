import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../base/buttonicon";

const Information: React.FC = () => {
  const navigate = useNavigate();

  const goToMainternancePage = () => {
    navigate("/maintenance");
  };
  return (
    <div className="flex lg:flex-row flex-col lg:gap-10 gap-5 mb-10">
      <div className="flex flex-col bg-neutral-1 border border-neutral-3 lg:w-[805px] w-full py-6 px-[32px] rounded-[20px] items-center gap-6 shadow-box">
        <h2 className="text-md text-neutral-9 font-semibold">
          Cari Tahu Lebih Lanjut
        </h2>
        <div className="w-full flex flex-row gap-9 items-center justify-center">
          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page FAQ"
            onClick={goToMainternancePage}
            imgSrc="/FAQ.svg"
            imgAlt="FAQ"
            text="FAQ"
            textClassName=""
            containerClassName="flex-col md:flex-row"
          />

          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page Tutorial Video Demo"
            onClick={goToMainternancePage}
            imgSrc="/VideoDemo.svg"
            imgAlt="Video Demo"
            text="Video Demo"
            textClassName=""
            containerClassName="flex-col md:flex-row"
          />

          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page Syarat & ketentuan"
            onClick={goToMainternancePage}
            imgSrc="/S&K.svg"
            imgAlt="Syarat & Ketentuan"
            text="Syarat & Ketentuan"
            textClassName=""
            containerClassName="flex-col md:flex-row"
          />
        </div>
      </div>
      <div className="flex flex-col bg-neutral-1 lg:w-[451px] w-full py-6 px-4 rounded-[20px] items-center gap-6 border border-neutral-3 shadow-box">
        <h2 className="text-neutral-9 text-md font-semibold">
          Butuh Bantuan ?
        </h2>
        <div className="flex flex-row gap-2">
          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Call Halo Connect"
            onClick={goToMainternancePage}
            imgSrc="/Call.svg"
            imgAlt="Call Halo Connect"
            text="Call Halo Connect"
            textClassName=""
            containerClassName="w-full flex-col md:flex-row"
          />

          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Email Halo Connect"
            onClick={goToMainternancePage}
            imgSrc="/Email.svg"
            imgAlt="Email Halo Connect"
            text="Email Halo Connect"
            textClassName=""
            containerClassName="w-full flex-col md:flex-row"
          />

          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Whatsapp Connect"
            onClick={goToMainternancePage}
            imgSrc="/Whatsapp.svg"
            imgAlt="Whatsapp Call Connect"
            text="Whatsapp Call Connect"
            textClassName=""
            containerClassName="w-full flex-col md:flex-row"
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
