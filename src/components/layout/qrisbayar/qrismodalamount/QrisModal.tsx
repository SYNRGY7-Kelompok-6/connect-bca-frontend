import React from "react";
import logoClose from "../../../../../public/closebutton.svg";
import logoQris from "../../../../../public/logo qris.svg";

interface QrisModalProps {
  isOpen: boolean;
  modalHandleAmount: boolean;
  handleCloseModal: () => void;
  handleQrisBayar: () => void;
  nominal: string;
  handleNominalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QrisModal: React.FC<QrisModalProps> = ({
  isOpen,
  modalHandleAmount,
  handleCloseModal,
  handleQrisBayar,
  nominal,
  handleNominalChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-neutral-1 shadow-box rounded flex flex-col w-96 p-5 gap-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between h-14 border-b border-primary-dark-blue">
          <img src={logoQris} alt="Logo Qris" />
          <img
            src={logoClose}
            style={{ height: "30px", marginTop: "10px", cursor: "pointer" }}
            alt="keluar"
            onClick={handleCloseModal}
          />
        </div>
        <div className="flex gap-4 mt-[24px] mb-[24px] items-center">
          <label
            className="text-base font-semibold text-neutral-9"
            htmlFor="nominal-input"
            aria-label="label-nominal"
          >
            Nominal
          </label>
          <input
            id="nominal-input"
            className="h-8 w-full px-2 border border-neutral-6 focus:outline focus:outline-1 focus:outline-primary-blue rounded"
            value={nominal}
            type="text"
            maxLength={12}
            onChange={handleNominalChange}
            placeholder="Masukkan nominal"
            aria-label="masukan-nominal"
          />
        </div>
        {modalHandleAmount && (
          <div
            className="text-base text-center top-[57.5%] md:top-[53.5%] left-[36%] md:left-[43.4%]"
            aria-label="Pin Harus 6 Digit"
            style={{
              color: "red",
              position: "absolute",
            }}
          >
            Nominal Harus Lebih dari 100
          </div>
        )}
        <button
          onClick={handleQrisBayar}
          className="text-sm text-white w-full items-center border rounded-[12px] bg-primary-blue hover:bg-primary-dark-blue pt-[8px] pr-[18px] pb-[8px] pl-[18px]"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default QrisModal;
