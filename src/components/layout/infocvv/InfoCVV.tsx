import React from "react";
import { useState } from "react";
import useBankStatement from "../../../contexts/useBankStatement";

const InfoCVV: React.FC = () => {
  const { bankStatement } = useBankStatement();

  const [isCVVVisible, setIsCVVVisible] = useState(false);
  const CVV = bankStatement?.accountInfo.cvv;

  const toggleCVVVisibility = () => {
    setIsCVVVisible(!isCVVVisible);
  };

  const milliseconds = bankStatement?.accountInfo.accountCardExp;
  const date = milliseconds ? new Date(milliseconds) : new Date();

  const formattedDate = date.toLocaleDateString("id-ID", {
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="flex flex-col mt-10 shadow-box w-[416px]">
      <h1
        className="bg-primary-dark-blue p-[18px] text-md text-white font-bold rounded-t"
        aria-label="informasi akun"
      >
        Informasi Akun
      </h1>
      <div className="bg-neutral-1 rounded-5 flex flex-col rounded-b p-[18px] gap-3">
        <div className="flex gap-2 justify-between">
          <p className="text-primary-dark-blue text-base font-semibold">
            Masa Berlaku
          </p>
          <h2 className="text-base text-primary-dark-blue font-semibold">
            {formattedDate}
          </h2>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="text-primary-dark-blue text-base font-semibold">
            Jenis Kartu
          </p>
          <h2 className="text-base text-primary-dark-blue font-semibold">
            {bankStatement?.accountInfo.accountType}
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-primary-dark-blue text-base font-semibold">
            Kode CVV
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-base text-primary-dark-blue font-semibold">
              {isCVVVisible ? CVV : "***"}
            </h2>
            <button type="button" onClick={toggleCVVVisibility}>
              <img
                src={isCVVVisible ? "/VisibilityOn.svg" : "/VisibilityOff.svg"}
                alt={isCVVVisible ? "Show CVV" : "Hide CVV"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCVV;
