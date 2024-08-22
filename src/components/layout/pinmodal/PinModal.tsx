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
      <div className="bg-primary-light-blue rounded-[20px] w-[90%]  h-[180px] sm:h-[250px] sm:w-[511px] rounded p-[15px] sm:p-[30px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}>
        <div className="text-center text-base sm:text-lg text-primary-dark-blue mb-[13px] sm:mb-[26px]"
         aria-label="Masukan Pin Anda">
          <strong>Masukan PIN Anda</strong>
        </div>
        <div className="w-[300px] sm:w-[460px] h-[35px] sm:h-[50px] mb-[36px] flex justify-between px-2" aria-label="Kolom pin">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              value={digit}
              onChange={(event) => handlePinChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              maxLength={1}
              className={`w-10 sm:w-12 h-10 sm:h-12 text-primary-dark-blue rounded-full border-primary-dark-blue border-[2px] ${digit ? 'bg-primary-dark-blue' : 'bg-white'}`}
            />
          ))}
        </div>
        {modalHandlePin && (
          <div className="text-base text-center top-[50.6%] sm:top-[51.8%]"
          aria-label="Pin Harus 6 Digit"
            style={{
              color: "red",
              position: "absolute"
            }}>
            PIN harus 6 digit
          </div>
        )}
        {modalHandleWrongPin && (
          <div className="text-base text-center top-[50.6%] sm:top-[51.8%]"
          aria-label="Pin yang anda masukan salah"
            style={{
              color: "red",
              position: "absolute"
            }}>
            PIN Yang Anda Masukan Salah
          </div>
        )}
        <button
          onClick={handleConfirmPin}
          className="text-base text-white bg-primary-blue w-[203px] border rounded-[12px] border-primary-blue pt-[5px] pr-[30px] pb-[5px] pl-[30px] sm:pt-[10px] sm:pr-[60px] sm:pb-[10px] sm:pl-[60px]"
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
