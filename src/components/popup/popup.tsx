import React from "react";
import Button from "../button";

interface PopupProps {
  message: string;
  svgSrc: string;
  svgAlt: string;
  labelButton: string;
  labelPopup: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Popup: React.FC<PopupProps> = ({
  message,
  svgSrc,
  labelButton,
  labelPopup,
  svgAlt,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-label={labelPopup}
    >
      <div className="bg-white items-center text-center flex flex-col gap-[30px] justify-center rounded-[20px] p-[40px] w-[490px]">
        <h1 className="font-semibold text-base text-primary-dark-blue">
          {message}
        </h1>
        <img src={svgSrc} alt={svgAlt} width="78" height="80" />
        <Button
          type="button"
          onClick={onButtonClick}
          ariaLabel={labelButton}
          variant="general"
          colorScheme="primary"
          state="active"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Popup;
