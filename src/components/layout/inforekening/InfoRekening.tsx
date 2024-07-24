import React, { useState } from "react";
import InfoCVV from "../infocvv";
import InfoAkun from "../infoakun/InfoAkun";

interface InfoRekeningProps {
  showInfoCVV?: boolean;
  showInfoAkun?: boolean;
}

const InfoRekening: React.FC<InfoRekeningProps> = ({
  showInfoCVV = false,
  showInfoAkun = false,
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const balance = "IDR 1,000,000";

  const [textToCopy] = useState("145 267 389 5162");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Nomor berhasil disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      });
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-lg text-white font-bold">Informasi Rekening</h1>
      <div className="bg-primary-blue rounded-5 flex flex-col w-[400px] rounded-[20px] p-5 gap-[10px]">
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">Rekening</p>
          <div className="flex justify-between">
            <h2 className="text-md text-white font-semibold">{textToCopy}</h2>
            <button type="button" onClick={handleCopy}>
              <img src="/IconCopy.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">Saldo</p>
          <div className="flex justify-between items-center">
            <h2 className="text-md text-white font-semibold">
              {isBalanceVisible ? balance : "IDR ********"}
            </h2>
            <button type="button" onClick={toggleBalanceVisibility}>
              <img
                src={
                  isBalanceVisible ? "/VisibilityOff.svg" : "/VisibilityOn.svg"
                }
                alt={isBalanceVisible ? "Hide Balance" : "Show Balance"}
              />
            </button>
          </div>
        </div>
      </div>

      {showInfoCVV && <InfoCVV />}
      {showInfoAkun && <InfoAkun />}
    </div>
  );
};

export default InfoRekening;
