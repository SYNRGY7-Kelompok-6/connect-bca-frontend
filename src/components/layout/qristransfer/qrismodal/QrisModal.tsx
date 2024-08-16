import React from 'react';
import logoClose from "../../../../../public/closebutton.svg";
import logoBca from "../../../../../public/LogoBCA.png";

interface QrisModalProps {
  handleCloseModal: () => void;
  handleQrisTransfer: () => void;
  nominal: string;
  handleNominalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QrisModal: React.FC<QrisModalProps> = ({ handleCloseModal, handleQrisTransfer, nominal, handleNominalChange }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-primary-light-blue rounded flex flex-col w-96 p-5 gap-2.5" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between h-14 border-b border-primary-dark-blue">
        <img src={logoBca} alt="logoBca" />
        <img
          src={logoClose}
          style={{ height: "30px", marginTop: "10px", cursor: "pointer" }}
          alt="close"
          onClick={handleCloseModal}
        />
      </div>
      <div className="flex justify-between mt-[24px] mb-[24px]">
        <div className="text-lg text-primary-blue">Nominal</div>
        <input
          className="h-8 w-[200px]"
          value={nominal}
          type="text"
          maxLength={12}
          onChange={handleNominalChange}
        />
      </div>
      <button
        onClick={handleQrisTransfer}
        className="text-sm text-primary-blue w-[100%] justify-between items-center border rounded-[12px] border-primary-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
      >
        Simpan
      </button>
    </div>
  </div>
);

export default QrisModal;
