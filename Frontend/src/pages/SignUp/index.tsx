import React, { useState } from "react";
import { FaRegUser, FaLock } from 'react-icons/fa';

import Title from "../../components/Title";
import { Container, FooterContainer } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Senha:", password);
        console.log(`Username ${username}`)
        console.log("Fazendo login...");
    };

    return (
        <>
            <Container>

                <Title name="Cadastrar" />

                <Input
                    icon={FaRegUser}
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                <Input
                    icon={FaRegUser}
                    type="text"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />

                <Input
                    icon={FaLock}
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <Button name="Cadastrar" onClick={handleLogin} width="23rem" />

                <FooterContainer>
                    <Title name="Já possui conta?" color="#7D8597" fontSize="28px" />
                    <Title name="Entrar" color="#FCA311" fontSize="28px" />
                </FooterContainer>

            </Container>
        </>
    );
};

export default SignUp;
