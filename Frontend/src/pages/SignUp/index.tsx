import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import { Container, FooterContainer, ErrorMessage } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { signUpSchema, SignUpData } from "../../schemas/signUpSchema";
import { api } from "../../api/axios";

const SignUp = () => {
    const [signUpError, setSignUpError] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = async (data: SignUpData) => {
        try {
            setSignUpError("");
            const response = await api.post("users/", data);

            if (response.status === 201) {
                navigate("/");
            }
        } catch (error) {
            setSignUpError("Falha ao cadastrar. Tente novamente!");
        }
    };

    return (
        <Container>

            <Title name="Cadastrar" />

            <div>
                <Input
                    icon={FaUser}
                    type="email"
                    placeholder="Digite seu e-mail"
                    {...register("email")}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div>
                <Input
                    icon={FaUser}
                    type="text"
                    placeholder="Nome de usuário"
                    {...register("username")}
                />
                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            </div>

            <div>
                <Input
                    icon={FaLock}
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            {signUpError && <ErrorMessage>{signUpError}</ErrorMessage>}

            <Button name="Cadastrar" onClick={handleSubmit(onSubmit)} width="23rem" />

            <FooterContainer>
                <Title name="Já possui conta?" color="whitesmoke" fontSize="28px" />
                <Title name="Entrar" color="#FCA311" fontSize="28px" onClick={() => navigate("/")} />
            </FooterContainer>
        </Container>
    );
};

export default SignUp;
