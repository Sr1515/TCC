import { useContext } from "react";
import Button from "../../components/Button";
import { Container } from "./style";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { logout } = useContext(AuthContext);
    const { checkToken } = useContext(AuthContext);
    const navigate = useNavigate();

    checkToken();

    const goToCreateSession = () => navigate('/sessions/create');
    const goToMySessions = () => navigate('/sessions');

    return (
        <Container>
            <Button
                name="Criar sessão"
                height="13rem"
                width="28rem"
                onClick={goToCreateSession}
            />
            <Button
                name="Minhas sessões"
                height="13rem"
                width="28rem"
                onClick={goToMySessions}
            />
            <Button
                name="Sair"
                height="13rem"
                width="60rem"
                onClick={logout}
            />
        </Container>
    );
};

export default Home;
