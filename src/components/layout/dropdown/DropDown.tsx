import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  items: { label: string; href: string }[];
  buttonLabel: string;
  activeItem: string; 
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  buttonLabel,
  activeItem,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleItemClick = (href: string) => {
    navigate(href);
    setIsOpen(true); 
  };

  return (
    <div className="relative inline-block text-left w-[262px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-2 items-center w-[262px] px-3 py-[14px] bg-primary-blue text-white font-semibold text-base rounded-t-[10px]"
      >
        <img
          src={isOpen ? "/DropDownClose.svg" : "/DropDownOpen.svg"}
          alt={isOpen ? "Close icon" : "Open icon"}
          className="w-5 h-5"
        />
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="absolute left-0 bg-white rounded-b-[10px] shadow-lg z-10 w-[262px]">
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
                  : "text-primary-blue hover:text-white hover:bg-primary-blue hover:bg-fill4"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="bg-primary-blue w-full h-5 rounded-b-[10px]"></div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
