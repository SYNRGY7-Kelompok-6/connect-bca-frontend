import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  items: { label: string; href: string }[];
  buttonLabel: string;
  activeItem: string;
  items2: { label: string; href: string }[];
  buttonLabel2: string;
  activeItem2: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  buttonLabel,
  activeItem,
  items2,
  buttonLabel2,
  activeItem2,
}) => {
  const [isOpen, setIsOpen] = useState(true); 
  const [isOpen2, setIsOpen2] = useState(true); 
  const navigate = useNavigate();

  const handleItemClick = (href: string) => {
    navigate(href);
  };

  const handleTransferClick = () => {
    setIsOpen(!isOpen); 
    if (isOpen2) setIsOpen2(false); 
  };

  const handleQrisClick = () => {
    setIsOpen2(!isOpen2); 
    if (isOpen) setIsOpen(false); 
  };

  return (
    <div className="relative inline-block text-left w-[262px]">
      <button
        onClick={handleTransferClick}
        className="flex gap-2 items-center w-[262px] px-3 py-[14px] bg-primary-dark-blue text-white font-semibold text-base rounded-t-[10px]"
      >
        <img
          src={isOpen ? "/DropDownClose.svg" : "/DropDownOpen.svg"}
          alt={isOpen ? "Close icon" : "Open icon"}
          className="w-5 h-5"
        />
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="left-0 bg-white shadow-lg z-10 w-[262px]">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.href);
              }}
              className={`block px-3 py-[14px] font-semibold text-base ${
                activeItem === item.href
                  ? "text-white bg-primary-blue bg-fill4"
                  : "text-neutral-9 hover:text-white hover:bg-primary-blue hover:bg-fill4"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={handleQrisClick}
        className="flex gap-2 items-center w-[262px] px-3 py-[14px] bg-primary-dark-blue text-white font-semibold text-base"
      >
        <img
          src={isOpen2 ? "/DropDownClose.svg" : "/DropDownOpen.svg"}
          alt={isOpen2 ? "Close icon" : "Open icon"}
          className="w-5 h-5"
        />
        {buttonLabel2}
      </button>
      {isOpen2 && (
        <div className="left-0 bg-white shadow-lg z-10 w-[262px]">
          {items2.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.href);
              }}
              className={`block px-3 py-[14px] font-semibold text-base ${
                activeItem2 === item.href
                  ? "text-white bg-primary-blue bg-fill4"
                  : "text-neutral-9 hover:text-white hover:bg-primary-blue hover:bg-fill4"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
