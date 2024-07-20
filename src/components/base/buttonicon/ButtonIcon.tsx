import React from 'react';

interface IconButtonProps {
  ariaLabel: string;
  onClick?: () => void;
  imgSrc: string;
  imgAlt: string;
  text: string;
  imgClassName?:string;
  textClassName?: string;
  containerClassName?: string;
}

const ButtonIcon: React.FC<IconButtonProps> = ({
  ariaLabel,
  onClick,
  imgSrc,
  imgAlt,
  text,
  imgClassName,
  textClassName = '',
  containerClassName = '',
}) => {
  return (
    <button
      type="submit"
      aria-label={ariaLabel}
      className={`flex items-center gap-[7px] ${containerClassName}`}
      onClick={onClick}
    >
      <div className="bg-white p-[8px] rounded-[8px]">
        <img src={imgSrc} alt={imgAlt} className={imgClassName} />
      </div>
      <p className={`text-xs font-bold text-white ${textClassName}`}>
        {text}
      </p>
    </button>
  );
};

export default ButtonIcon;
