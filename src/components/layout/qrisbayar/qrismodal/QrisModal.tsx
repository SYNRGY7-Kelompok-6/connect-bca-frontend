import React from "react";
import logoQris from "../../../../../public/logo qris.svg";
import logoBca from "../../../../../public/LogoBCA.png";

interface QrisModalProps {
  isOpen: boolean;
  qrImage: string;
  timeLeft: string;
}

const QrisModal: React.FC<QrisModalProps> = ({ isOpen, qrImage, timeLeft}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-neutran-1 shadow-box rounded flex flex-col w-96 p-5 gap-2.5">
      <div className="flex justify-between h-14 border-b border-primary-dark-blue">
        <img src={logoQris} alt="logoQris" />
        <img src={logoBca} alt="logoBca" />
      </div>
      <div className="flex flex-col justify-center text-center items-center">
          <>
            <img
              src={qrImage}
              className="mt-[12px] mb-[24px]"
              style={{ width: '300px', height: '300px' }}
              alt="logoQrisTransfer"
              aria-label="Barcode Qris"
            />
            <div className="text-base text-primary-blue">
              Masa Berlaku : {timeLeft}
            </div>
          </>
      </div>
    </div>
  );
};

export default QrisModal;
