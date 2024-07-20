import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../buttonicon";

const Information: React.FC = () => {
  const navigate = useNavigate();

  const goToMainternancePage = () => {
    navigate("/maintenance");
  };
  return (
    <div className="flex flex-row gap-[27px] mb-10">
      <div className="flex flex-col bg-[#00487B] w-[874px] py-[16px] px-[32px] rounded-[20px] items-center">
        <h2 className="text-white text-md font-semibold">
          Cari Tahu Lebih Lanjut
        </h2>
        <div className="flex flex-row gap-[37px] mt-[18px]">
          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page FAQ"
            onClick={goToMainternancePage}
            imgSrc="/FAQ.svg"
            imgAlt="FAQ"
            text="FAQ"
            textClassName=""
            containerClassName=""
          />

          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page Tutorial Video Demo"
            onClick={goToMainternancePage}
            imgSrc="/VideoDemo.svg"
            imgAlt="Video Demo"
            text="Video Demo"
            textClassName=""
            containerClassName=""
          />

          <ButtonIcon
            ariaLabel="Tombol Lanjut ke Page Syarat & ketentuan"
            onClick={goToMainternancePage}
            imgSrc="/S&K.svg"
            imgAlt="Syarat & Ketentuan"
            text="Syarat & Ketentuan"
            textClassName=""
            containerClassName=""
          />
        </div>
      </div>
      <div className="flex flex-col bg-[#00487B] w-[437px] py-[16px] px-[32px] rounded-[20px] items-center">
        <h2 className="text-white text-md font-semibold">Butuh Bantuan ?</h2>
        <div className="flex flex-row gap-[14px] mt-[18px]">
          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Call Halo BCA"
            onClick={goToMainternancePage}
            imgSrc="/Call.svg"
            imgAlt="Cari Halo BCA"
            text="Cari Halo BCA"
            textClassName=""
            containerClassName=""
          />

          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Email Halo BCA"
            onClick={goToMainternancePage}
            imgSrc="/Email.svg"
            imgAlt="Email Halo BCA"
            text="Email Halo BCA"
            textClassName=""
            containerClassName=""
          />

          <ButtonIcon
            ariaLabel="Tombol Meminta Bantuan Lewat Whatsapp Call BCA"
            onClick={goToMainternancePage}
            imgSrc="/Whatsapp.svg"
            imgAlt="Whatsapp Call BCA"
            text="Whatsapp Call BCA"
            textClassName=""
            containerClassName=""
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
