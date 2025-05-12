import React from "react";

type TitleProps = {
    name: string;
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    onClick?: () => void;
};

const Title: React.FC<TitleProps> = ({
    name,
    color = "#1C1C1E",
    fontSize = "3rem",
    fontFamily = "'Irish Grover', cursive",
    onClick,
}) => {
    return (
        <h1
            style={{ color, fontSize, fontFamily, cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick}
        >
            {name}
        </h1>
    );
};

export default Title;
