import React from "react";
import Button from "../Button";
import { Container, GameInfo, CardFooter } from "./style";

type SessionCardProps = {
    sessionCode?: string;
    status?: string;
    game?: string;
    players?: string;
    duration?: string;
    color?: string;
};

const Card: React.FC<SessionCardProps> = ({
    sessionCode,
    status,
    game,
    players,
    duration,
    color = "#8C92AC"
}) => {

    return (

        <Container style={{ color }}>

            <GameInfo>
                <h3>Código da sessão: {sessionCode}</h3>
                <h3>Jogo: {game}</h3>
                <h3>Status: {status}</h3>
                <h3>Jogadores: {players}</h3>
                <h3>Duração: {duration}</h3>
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
                />

            </CardFooter>

        </Container>
    );
};

export default Card;



