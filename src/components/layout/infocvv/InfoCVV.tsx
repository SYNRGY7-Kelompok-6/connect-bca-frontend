import React from "react";
import { useState } from "react";

const InfoCVV: React.FC = () => {
  const [isCVVVisible, setIsCVVVisible] = useState(false);
  const CVV = "111";

  const toggleCVVVisibility = () => {
    setIsCVVVisible(!isCVVVisible);
  };
  return (
    <>
      {/* Info Rekening CVV */}
      <div className="bg-primary-blue rounded-5 flex flex-col w-[400px] rounded-[20px] p-5 gap-[10px]">
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">Masa Berlaku</p>
          <h2 className="text-md text-white font-semibold">07/2028</h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">Kode CVV</p>
          <div className="flex justify-between items-center">
            <h2 className="text-md text-white font-semibold">
              {isCVVVisible ? CVV : "***"}
            </h2>
            <button type="button" onClick={toggleCVVVisibility}>
              <img
                src={isCVVVisible ? "/VisibilityOff.svg" : "/VisibilityOn.svg"}
                alt={isCVVVisible ? "Hide CVV" : "Show CVV"}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCVV;
