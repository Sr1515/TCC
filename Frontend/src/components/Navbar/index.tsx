import React from "react";
import Button from "../Button";
import { Container } from "./style"; // Import the styled container

type TitleProps = {
    color?: string;
    height?: string;
    width?: string;
};

const NavBar: React.FC<TitleProps> = ({
    color = "#2F3542",
    width = "100%",
    height = "6rem"
}) => {
    return (
        <Container color={color} width={width} height={height}>
            <Button name="Voltar" height="4rem" width="10rem" />
        </Container>
    );
};

export default NavBar;
