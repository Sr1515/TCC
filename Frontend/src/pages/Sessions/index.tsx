import { useContext } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/Navbar";
import { MainContainer } from "./style";
import { AuthContext } from "../../context/AuthProvider";

const Sessions = () => {
    const { checkToken } = useContext(AuthContext);
    checkToken();

    return (
        <>
            <NavBar />
            <MainContainer>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </MainContainer>
        </>
    );
};

export default Sessions;
