import React, { useState } from "react";
import Button from "../button"; // Adjust path as needed

const PopupPin: React.FC<{
  className?: string;
  propsFunc?: {
    setPinSubmitted?: (submitted: boolean) => void;
    setPopupVisible?: (submitted: boolean) => void;
  };
  onButtonClick?: () => void;
}

const PinPopup: React.FC<PopupProps> = ({
  message,
  svgSrc,
  labelButton = '',
  labelPopup,
  svgAlt,
  button = true,
  buttonText,
  className,
  propsFunc,
  onButtonClick,
}) => {

  const handlePinSubmit = async () => {
    if (propsFunc?.setPinSubmitted && propsFunc?.setPopupVisible) {
      propsFunc.setPopupVisible(false);
      propsFunc.setPinSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-label="PIN Input Popup"
    >
      <div
        className={`bg-neutral-1 items-center text-center flex flex-col gap-[26px] text-primary-dark-blue justify-center rounded-[20px] p-[40px] w-[490px] ${className}`}
      >
        <h1 className="text-lg font-bold">Masukkan PIN Anda</h1>
        <div className="flex gap-8 mb-4">
          {pin.map((value, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 text-center border-2 ${
                value
                  ? "bg-primary-blue border-primary-blue"
                  : "bg-white border-primary-dark-blue"
              } focus:outline-none rounded-full`}
              placeholder=""
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
        <Button
          type="button"
          aria-label="Konfirmasi PIN"
          variant="general"
          state="active"
          className="bg-primary-blue text-white hover:bg-primary-dark-blue"
          onClick={handleSubmit}
          ariaLabel=""
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  );
};

export default PinPopup;
