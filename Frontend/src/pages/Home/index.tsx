import Button from "../../components/Button";
import { Container } from "./style";

const Home = () => {
    return (
        <>
            <Container>

                <Button name="Criar sessão" height="13rem" width="28rem" />
                <Button name="Minhas sessões" height="13rem" width="28rem" />
                <Button name="Sair" height="13rem" width="60rem" />

            </Container>
        </>
    );
};

export default Home;
