import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import { Container, ErrorMessage, FooterContainer } from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { AuthContext } from "../../context/AuthProvider";
import { loginSchema, LoginData } from "../../schemas/loginSchema";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState<string>("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginData) => {

        try {
            setLoginError("");
            await login(data.email, data.password);
        } catch (error) {
            setLoginError("Falha ao fazer login. Verifique suas credenciais.");
        }
    };

    const handleGoToSignUp = () => {
        navigate("/signup");
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

                {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

                <Button name="Entrar" onClick={handleSubmit(onSubmit)} />

                <FooterContainer>
                    <Title name="Não tem conta?" color="white" fontSize="28px" />
                    <Title name="Cadastre-se" color="#FCA311" fontSize="28px" onClick={handleGoToSignUp} />
                </FooterContainer>

            </Container>
        </>
    );
};

export default Login;
