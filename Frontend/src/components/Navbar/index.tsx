import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { Container } from "./style";

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

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container color={color} width={width} height={height}>
            <Button name="Voltar" height="4rem" width="10rem" onClick={handleBack} />
        </Container>
    );

};

export default NavBar;
