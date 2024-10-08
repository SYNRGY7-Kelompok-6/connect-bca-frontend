import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "micro" | "general" | "puffy";
  colorScheme?: "primary" | "secondary" | "reset";
  state?: "active" | "inactive";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
  children,
  className = "",
  variant = "",
  colorScheme = "",
  state = "",
  isLoading = false,
}) => {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "micro":
        return "font-semibold rounded-lg text-sm py-1 w-[125px]";
      case "general":
        return "font-semibold rounded-[12px] text-base py-[10px] px-[56px]";
      case "puffy":
        return "font-bold text-lg rounded-[12px] py-[32px] w-[500px]";
      default:
        return "";
    }
  };

  const getColorSchemeClasses = (colorScheme: string, state: string) => {
    switch (colorScheme) {
      case "primary":
        return state === "active"
          ? "bg-primary-blue text-white hover:bg-primary-dark-blue"
          : "bg-primary-blue text-white hover:bg-primary-dark-blue";
      case "secondary":
        return state === "active"
          ? "bg-secondary-red text-white hover:bg-secondary-dark-red"
          : "bg-secondary-red text-white hover:bg-secondary-dark-red";
      case "reset":
        return state === "active"
          ? "bg-secondary-red text-white hover:bg-secondary-dark-red"
          : "bg-secondary-red text-white hover:bg-secondary-dark-red";
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      className={`flex items-center justify-center ${getVariantClasses(
        variant
      )} ${getColorSchemeClasses(
        colorScheme,
        state
      )} ${className} transition-colors duration-100`}
    >
      {children}
    </button>
  );
};

export default Button;
