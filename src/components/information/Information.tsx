import React from "react";
import { useNavigate } from 'react-router-dom';

const Information: React.FC = () => {
  const navigate = useNavigate();

  const goToMainternancePage = () => {
    navigate('/maintenance')
  };
  return (
    <div className="flex flex-row gap-[27px] mb-10">
      <div className="flex flex-col bg-[#00487B] w-[874px] py-[16px] px-[32px] rounded-[20px] items-center">
        <h2 className="text-white text-md font-semibold">
          Cari Tahu Lebih Lanjut
        </h2>
        <div className="flex flex-row gap-[37px] mt-[18px]">
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Lanjut ke Page FAQ"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/FAQ.svg" alt="FAQ" />
            </div>
            <p className="text-xs font-bold text-white">FAQ</p>
          </button>
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Lanjut ke Page Tutorial Video Demo"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/VideoDemo.svg" alt="Video Demo" />
            </div>
            <p className="text-xs font-bold text-white">Video Demo</p>
          </button>
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Lanjut ke Page Syarat & ketentuan"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/S&K.svg" alt="Syarat & Ketentuan" />
            </div>
            <p className="text-xs font-bold text-white">Syarat & Ketentuan</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-[#00487B] w-[437px] py-[16px] px-[32px] rounded-[20px] items-center">
        <h2 className="text-white text-md font-semibold">Butuh Bantuan ?</h2>
        <div className="flex flex-row gap-[14px] mt-[18px]">
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Meminta Bantuan Lewat Call Halo BCA"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/Call.svg" alt="Cari Halo BCA" />
            </div>
            <p className="text-xs font-bold text-white">Cari Halo BCA</p>
          </button>
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Meminta Bantuan Lewat Email Halo BCA"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/Email.svg" alt="Email Halo BCA" />
            </div>
            <p className="text-xs font-bold text-white">Email Halo BCA</p>
          </button>
          <button
            type="button"
            className="flex flex-row items-center gap-[7px]"
            aria-label="Tombol Meminta Bantuan Lewat Whatsapp Call BCA"
            onClick={goToMainternancePage}
          >
            <div className="bg-white p-[8px] rounded-[8px]">
              <img src="/Whatsapp.svg" alt="Whatsapp Call BCA" />
            </div>
            <p className="text-xs font-bold text-white">Whatsapp Call BCA</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Information;
