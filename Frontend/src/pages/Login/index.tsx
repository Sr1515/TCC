import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import { Container, ErrorMessage, FooterContainer } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PopupMessage from "../../components/PopupMessage";

import { AuthContext } from "../../context/AuthProvider";
import { loginSchema, LoginData } from "../../schemas/loginSchema";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [popupMensagem, setPopupMensagem] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginData) => {
        try {
            await login(data.email, data.password);

            setPopupMensagem("Bem-vindo de volta!");
            setTimeout(() => {
                setPopupMensagem(null);
                navigate("/home", { replace: true });
            }, 2000);

        } catch (error) {
            setPopupMensagem("Falha ao fazer login. Verifique suas credenciais.");
            setTimeout(() => {
                setPopupMensagem(null);
            }, 3000);
        }
    };

    return (
        <>
            <Container>

                <Title name="Entrar" />

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
                        icon={FaLock}
                        type="password"
                        placeholder="Digite sua senha"
                        {...register("password")}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <Button name="Entrar" onClick={handleSubmit(onSubmit)} />

                <FooterContainer>
                    <Title name="Não tem conta?" color="white" fontSize="28px" />
                    <Title name="Cadastre-se" color="#FCA311" fontSize="28px" onClick={() => navigate("/signup")} />
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

export default Login;
