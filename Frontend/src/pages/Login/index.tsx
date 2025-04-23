import React from "react";
import { FaUser, FaLock } from 'react-icons/fa';

import Title from "../../components/Title";
import { Container } from "./style";
import Input from "../../components/Input";



const LoginPage = () => {

    return (
        <>
            <Container>

                <Title name="Entrar" />

                <Input
                    icon={FaUser}
                    placeholder="Digite seu e-mail"
                />

                <Input
                    icon={FaLock}
                    placeholder="Digite sua senha"
                />

            </Container>
        </>
    )

}

export default LoginPage;