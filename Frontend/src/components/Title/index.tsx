import React from "react";

type TitleProps = {
    name: string;
    color?: string;
    fontSize?: string;
}

const Title: React.FC<TitleProps> = ({
    name,
    color = "#1C1C1E",
    fontSize = "4rem"
}) => {
    return (
        <h1 style={{ color, fontSize }}>
            {name}
        </h1>
    );
}

export default Title;
