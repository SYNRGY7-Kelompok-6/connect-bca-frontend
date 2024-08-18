import React, { useState } from "react";
import Button from "../button"; // Adjust path as needed

const PopupPin: React.FC<{
  className?: string;
  onPinSubmit: (pin: string) => void;
}> = ({ className = "", onPinSubmit }) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill("")); // Initialize the PIN state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPin = [...pin];
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      newPin[index] = value;
      setPin(newPin);

      // Move to the next input if the current input is filled
      if (value && index < 5) {
        (e.target.nextSibling as HTMLInputElement)?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        const previousElement = (e.target as HTMLInputElement)
          .previousElementSibling as HTMLInputElement;
        if (previousElement) {
          previousElement.focus();
        }
      }
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    const pinString = pin.join("");
    if (pinString.length === 6) {
      onPinSubmit(pinString); // Pass the PIN value to the parent component
    } else {
      console.error("PIN is incomplete");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-label="PIN Input Popup"
    >
      <div
        className={`bg-neutral-1 items-center text-center flex flex-col gap-[26px] text-primary-dark-blue justify-center rounded-[20px] p-[40px] md:w-[490px] w-full mx-4 md:mx-0 ${className}`}
      >
        <h1 className="md:text-lg text-md font-bold">Masukkan PIN Anda</h1>
        <div className="flex md:gap-8 gap-2 mb-4">
          {pin.map((value, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`md:w-12 w-10 md:h-12 h-10 text-center border-2 ${
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

export default PopupPin;
