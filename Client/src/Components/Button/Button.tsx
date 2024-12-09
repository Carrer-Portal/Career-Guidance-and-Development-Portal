import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import clsx from "clsx";
import "./Button.css";

interface CustomButtonProps extends Omit<MuiButtonProps, "color" | "variant"> {
  size?: "small" | "medium" | "large";
  color?: string;
  disabled?: boolean;
  variant?: "contained" | "outline"; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  size = "medium",
  color = "#634897",
  disabled = false,
  variant = "contained", 
  className,
  ...rest
}) => {
  return (
    <MuiButton
      className={clsx(
        "custom-button",
        className,
        size,
        variant, 
        { disabled }
      )}
      style={{
        backgroundColor:
          variant === "outline" ? "transparent" : disabled ? "#b3b3b3" : color,
        border:
          variant === "outline"
            ? `1px solid ${disabled ? "#b3b3b3" : color}`
            : "none",
        color:
          variant === "outline" ? (disabled ? "#b3b3b3" : color) : "#ffffff",
        borderRadius: "5px",
      }}
      disabled={disabled}
      {...rest}
    />
  );
};

export default CustomButton;
