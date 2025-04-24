import React, { useState } from "react";
import { FaUser, FaLock } from 'react-icons/fa';

import Title from "../../components/Title";
import { Container, FooterContainer } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Senha:", password);

        if (!email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        console.log("Fazendo login...");
    };

    return (
        <>
            <Container>

                <Title name="Entrar" />

                <Input
                    icon={FaUser}
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                <Input
                    icon={FaLock}
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <Button name="Entrar" onClick={handleLogin} />

                <FooterContainer>
                    <Title name="Não tem conta?" color="#7D8597" fontSize="28px" />
                    <Title name="Cadastre-se" color="#FCA311" fontSize="28px" />
                </FooterContainer>

            </Container>
        </>
    );
};

export default LoginPage;
