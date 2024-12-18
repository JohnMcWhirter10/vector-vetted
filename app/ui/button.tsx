"use client";

import { useFormStatus } from "react-dom";
import React from "react";

interface ButtonProps {
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, onClick, type = 'button', className, children }) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
};



export default Button;
