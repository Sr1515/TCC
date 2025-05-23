import React from "react";
import Button from "../Button";
import { Container, GameInfo, CardFooter } from "./style";
import { useNavigate } from "react-router-dom";

type SessionCardProps = {
    id: string;
    sessionCode?: string;
    status?: string;
    game?: string;
    players?: number;
    duration?: string;
    color?: string;
};

const Card: React.FC<SessionCardProps> = ({
    id,
    sessionCode,
    status,
    game,
    players,
    duration,
    color = "#8C92AC"
}) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/sessions/${id}`);
    };

    return (
        <Container style={{ color }}>
            <GameInfo>
                <h3>Código da sessão: <span className="highlight">{sessionCode}</span></h3>
                <h3>Jogo: <span className="highlight">{game}</span></h3>
                <h3>Status: <span className="highlight">{status}</span></h3>
                <h3>Jogadores: <span className="highlight">{players}</span></h3>
                <h3>Duração: <span className="highlight">{duration}</span></h3>
            </GameInfo>

            <CardFooter>
                <Button
                    name="Excluir"
                    height="4rem"
                    width="70%"
                    fontSize="32px"
                    backgroundColor="#D7263D"
                    color="#EDF0F4"
                />

                <Button
                    name="Ver detalhes"
                    height="4rem"
                    width="70%"
                    fontSize="32px"
                    backgroundColor="#3D8361"
                    color="#EDF0F4"
                    onClick={handleDetailsClick}
                />
            </CardFooter>
        </Container>
    );
};

export default Card;
