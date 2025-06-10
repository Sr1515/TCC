import React from "react";
import { StyledButton } from "./style";

type ButtonProps = {
    name: string;
    color?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    backgroundColor?: string;
    borderRadius?: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    name,
    color = "#1C1C1E",
    width = "23rem",
    height = "5rem",
    fontSize = "40px",
    backgroundColor = "#FCA311",
    borderRadius = "20px",
    onClick,

}) => {
    return (
        <StyledButton
            style={{ borderRadius, backgroundColor, color, width, height }}
            onClick={onClick}>

            <h1 style={{ fontSize }}>{name}</h1>
        </StyledButton>
    );
};

export default Button;
