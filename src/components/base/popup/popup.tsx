import React, { useRef, useEffect } from "react";
import Button from "../button";

interface PopupProps {
  message?: string;
  svgSrc?: string;
  svgAlt?: string;
  button?: boolean;
  labelButton?: string;
  labelPopup?: string;
  buttonText?: string;
  className?: string;
  onButtonClick?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  message,
  svgSrc,
  svgAlt,
  button = true,
  labelButton = '',
  buttonText,
  className,
  onButtonClick,
}) => {
  
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.focus();
    }
  }, []);

  return (
    <div
      role="dialog"  
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4 md:px-0"
      ref={popupRef}
      tabIndex={-1} 
    >
      <div 
        className={`bg-neutral-1 items-center text-center flex flex-col gap-[26px] justify-center rounded-[20px] p-[40px] w-[490px] ${className}`}
        tabIndex={-1} 
      >
        <h1 
          className="text-neutral-9 text-base font-semibold"
        >
          {message}
        </h1>
        {
          svgSrc && <img src={svgSrc} alt={svgAlt} width="100" height="100" />
        }
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

export default Popup;
