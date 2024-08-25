import React from "react";

interface IconButtonProps {
  ariaLabel: string;
  onClick?: () => void;
  imgSrc: string;
  imgAlt: string;
  text: string;
  imgClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  backgroundClassName?: string;
}

const ButtonIcon: React.FC<IconButtonProps> = ({
  ariaLabel,
  onClick,
  imgSrc,
  imgAlt,
  text,
  imgClassName,
  textClassName = "",
  containerClassName = "",
  backgroundClassName = "",
}) => {
  return (
    <button
      type="submit"
      aria-label={ariaLabel}
      className={`flex items-center gap-[7px] ${containerClassName}`}
      onClick={onClick}
    >
      <div className={`bg-fill4 p-2 rounded-lg ${backgroundClassName}`}>
        <img src={imgSrc} alt={imgAlt} className={imgClassName} />
      </div>
      <p className={`text-sm font-semibold text-neutral-9 ${textClassName}`}>{text}</p>
    </button>
  );
};

export default ButtonIcon;
