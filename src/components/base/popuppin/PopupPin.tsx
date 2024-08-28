import React, { useState, useEffect } from "react";
import Button from "../button";

const PopupPin: React.FC<{
  className?: string;
  onPinSubmit: (pin: string) => Promise<void>;
  onClose: () => void;
}> = ({ className = "", onPinSubmit, onClose }) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [isPinComplete, setIsPinComplete] = useState<boolean>(false);

  useEffect(() => {
    setIsPinComplete(pin.join("").length === 6);
  }, [pin]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPin = [...pin];
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      newPin[index] = value;
      setPin(newPin);

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

  const handleSubmit = async () => {
    const pinString = pin.join("");
    if (pinString.length === 6) {
      setLoading(true);
      try {
        await onPinSubmit(pinString);
      } catch (error) {
        console.error("Error during PIN submission", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("PIN is incomplete");
    }
  };

  return (
    <div
      role="dialog"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-labelledby="pin-popup-title"
      aria-describedby="pin-popup-description"
    >
      <div
        className={`bg-neutral-1 items-center text-center flex flex-col gap-[26px] text-primary-dark-blue justify-center rounded-[20px] p-[40px] md:w-[490px] w-full mx-4 md:mx-0 ${className}`}
      >
        <h1 id="pin-popup-title" className="md:text-lg text-md font-bold">
          Masukkan PIN Anda
        </h1>
        <p id="pin-popup-description" className="sr-only">
          Masukkan 6 digit PIN Anda untuk melanjutkan.
        </p>
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
              aria-label={`Digit PIN ${index + 1}`}
              aria-invalid={value ? "false" : "true"}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
        <div className="flex flex-row gap-2">
          <Button
            type="button"
            aria-label="Konfirmasi PIN"
            variant="general"
            state="active"
            className="bg-primary-blue text-white hover:bg-primary-dark-blue"
            onClick={handleSubmit}
            aria-disabled={!isPinComplete}
            disabled={!isPinComplete}
            ariaLabel="Tombol Konfirmasi"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              "Konfirmasi"
            )}
          </Button>
          <Button
            type="button"
            aria-label="Tombol Batal"
            variant="general"
            state="active"
            onClick={onClose}
            ariaLabel="Tombol Batal"
            colorScheme="reset"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupPin;
