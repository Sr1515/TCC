import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import { Container, FooterContainer, ErrorMessage } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PopupMessage from "../../components/PopupMessage";

import { signUpSchema, SignUpData } from "../../schemas/signUpSchema";
import { api } from "../../api/axios";

const SignUp = () => {
    const [popupMensagem, setPopupMensagem] = useState<string | null>(null);
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
            const response = await api.post("users/", data);

            if (response.status === 201) {
                setPopupMensagem("Cadastro realizado com sucesso!");
                setTimeout(() => {
                    setPopupMensagem(null);
                    navigate("/");
                }, 2500);
            }
        } catch (error) {
            setPopupMensagem("Falha ao cadastrar. Tente novamente!");
            setTimeout(() => {
                setPopupMensagem(null);
            }, 3000);
        }
    };

    return (
        <>
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

                <Button name="Cadastrar" onClick={handleSubmit(onSubmit)} width="23rem" />

                <FooterContainer>
                    <Title name="Já possui conta?" color="whitesmoke" fontSize="28px" />
                    <Title name="Entrar" color="#FCA311" fontSize="28px" onClick={() => navigate("/")} />
                </FooterContainer>
            </Container>

            {popupMensagem && (
                <PopupMessage
                    message={popupMensagem}
                    onClose={() => setPopupMensagem(null)}
                    duration={3000}
                />
            )}
        </>
    );
};

export default SignUp;
