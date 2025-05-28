import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Container } from "./style";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import PopupMessage from "../../components/PopupMessage";

const Home = () => {
    const { logout, checkToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [popupMensagem, setPopupMensagem] = useState<string | null>(null);

    checkToken();

    const handleLogout = async () => {
        await logout();
        setPopupMensagem("Desconectado com sucesso.");

        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
    };


    useEffect(() => {
        if (location.state?.message) {
            setPopupMensagem(location.state.message);
            setTimeout(() => {
                setPopupMensagem(null);
            }, 3000);
        }
    }, [location.state]);

    const goToCreateSession = () => navigate('/sessions/create');
    const goToMySessions = () => navigate('/sessions');

    return (
        <>
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
                    onClick={handleLogout}
                />
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

export default Home;
