import React from "react";

interface PinModalProps {
  isOpen: boolean;
  pin: string[];
  handlePinChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleConfirmPin: () => void;
  modalHandlePin: boolean;
  modalHandleWrongPin: boolean;
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, pin, handlePinChange, handleKeyDown, handleConfirmPin, modalHandlePin, modalHandleWrongPin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50" aria-label="Pop up masukan pin">
      <div className="bg-primary-light-blue rounded-[20px] w-[511px] rounded p-[30px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}>
        <div className="text-center text-lg text-primary-dark-blue mb-[26px]">
          <strong>Masukan PIN Anda</strong>
        </div>
        <div className="w-[460px] h-[50px] mb-[36px] flex justify-between px-2" aria-label="Kolom pin">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              value={digit}
              onChange={(event) => handlePinChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              maxLength={1}
              className={`w-12 h-12 text-primary-dark-blue rounded-full border-primary-dark-blue border-[2px] ${digit ? 'bg-primary-dark-blue' : 'bg-white'}`}
            />
          ))}
        </div>
        {modalHandlePin && (
          <div className="text-base text-center"
            style={{
              color: "red",
              position: "absolute",
              top: "51.8%",
            }}>
            PIN harus 6 digit
          </div>
        )}
        {modalHandleWrongPin && (
          <div className="text-base text-center"
            style={{
              color: "red",
              position: "absolute",
              top: "51.8%",
            }}>
            PIN Yang Anda Masukan Salah
          </div>
        )}
        <button
          onClick={handleConfirmPin}
          className="text-base text-white bg-primary-blue w-[203px] border rounded-[12px] border-primary-blue pt-[10px] pr-[60px] pb-[10px] pl-[60px]"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          aria-label="Tombol Konfirmasi"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default PinModal;
