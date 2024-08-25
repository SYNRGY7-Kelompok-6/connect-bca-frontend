import React from "react";
import wrongPin from "../../../../public/WrongPin.svg";

interface WrongPinModalProps {
  isOpen: boolean;
  handleTryAgain: () => void;
}

const WrongPinModal: React.FC<WrongPinModalProps> = ({ isOpen, handleTryAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] h-[271.5px] w-[312px] sm:h-[362px] sm:w-[416px] rounded p-[18px] sm:p-[36px] flex flex-col items-center">
        <img src={wrongPin} className="mb-[10px] sm:mb-[42.75px]" />
        <div className="text-center text-base w-[225px] sm:w-[325px] mb-[10px] sm:mb-[24px]"
          aria-label="PIN yang anda masukan salah, silahkan coba kembali">
          PIN yang anda masukan salah, silahkan coba kembali
        </div>
        <button
          onClick={handleTryAgain}
          className="text-[18.34px] text-white bg-primary-blue w-[100%] border rounded-[12px] border-primary-blue pt-[10px] pr-[60px] pb-[10px] pl-[60px]"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          aria-label="Coba Kembali"
        >
          Coba Kembali
        </button>
      </div>
    </div>
  );
};

export default WrongPinModal;
