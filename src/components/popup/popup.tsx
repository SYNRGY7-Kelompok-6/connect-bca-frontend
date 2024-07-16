import React from "react";

interface PopupProps {
  message: string;
  svgSrc: string;
  svgAlt: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, svgSrc, svgAlt, buttonText, onButtonClick }) => {
  return (
    <section className="container mx-auto mt-[60px] mb-[60px]">
      <div className="bg-white items-center text-center flex flex-col gap-[30px] justify-center rounded-[20px] p-[40px] w-[490px]">
        <h1 className="font-semibold text-base text-primary-dark-blue">
          {message}
        </h1>
        <img src={svgSrc} alt={svgAlt} width="78" height="80" />
        <button
          className="bg-primary-dark-blue text-base text-white font-bold rounded-[16px] w-[262px] h-[44px]"
          type="button"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Popup;
