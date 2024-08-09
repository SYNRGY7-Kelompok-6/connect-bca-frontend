import React from "react";
import Button from "../button";
import PinInput from "../pininput";

interface PopupProps {
  message?: string;
  svgSrc?: string;
  svgAlt?: string;
  button?: boolean;
  labelButton?: string;
  labelPopup?: string;
  buttonText?: string;
  className?: string;
  propsFunc?: {
    setPinSubmitted?: (submitted: boolean) => void;
    setPopupVisible?: (submitted: boolean) => void;
  };
  onButtonClick?: () => void;
}

const DatePicker: React.FC<PopupProps> = ({
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
      aria-label={labelPopup}
    >
      <div className={`bg-primary-light-blue items-center text-center flex flex-col gap-[26px] text-primary-dark-blue justify-center rounded-[20px] p-[40px] w-[490px] ${className}`}>
        <h1 className="">
          {message}
        </h1>
        {
          svgSrc && <img src={svgSrc} alt={svgAlt} width="78" height="80" />
        }
        <PinInput length={6} onPinSubmit={handlePinSubmit} />
        {
          button && <Button
          type="button"
          onClick={onButtonClick}
          ariaLabel={labelButton}
          variant="general"
          colorScheme="primary"
          state="active"
        >
          {buttonText}
        </Button>
        }
      </div>
    </div>
  );
};

export default DatePicker;
