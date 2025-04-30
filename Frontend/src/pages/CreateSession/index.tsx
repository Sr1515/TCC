import { useState } from "react";
import Button from "../../components/Button";
import NavBar from "../../components/Navbar";
import Title from "../../components/Title";
import {
    GameDescriptionBox,
    GameSelect,
    InfoContainer,
    MainContainer,
    PlayerInput,
    TimeOption,
    TimeOptions,
    ContentWrapper,
    ColumnsContainer,
    OptionsContainer,
    InfoTime,
    InfoPlayers,
    InfoGames
} from "./style";

type Game = {
    name: string;
    description: string;
};

type TimeOption = {
    minutes: number;
    label: string;
};

const CreateSession = () => {
    const [playersCount, setPlayersCount] = useState<number>(4);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);

    const games: Game[] = [
        { name: "SELECTONE O JOGO", description: "" },
        { name: "Jogo teste", description: "Jogo para testar softskills" },
        { name: "Jogo para testar softskills", description: "baseado em gerenciar cozinha" },
        { name: "baseado em gerenciar cozinha", description: "Descrição detalhada sobre o jogo de gerenciar cozinha" }
    ];

    const timeOptions: TimeOption[] = [
        { minutes: 4, label: "4 minutos" },
        { minutes: 5, label: "5 minutos" },
        { minutes: 6, label: "6 minutos" }
    ];

    const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGameName = e.target.value;
        const game = games.find(g => g.name === selectedGameName);
        setSelectedGame(game || null);
    };

    const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPlayersCount(isNaN(value) ? 1 : Math.max(0, Math.min(10, value)));
    };

    const handleTimeSelect = (minutes: number) => {
        setSelectedTime(minutes);
    };

    return (
        <>
            <NavBar />

            <MainContainer>

                <ContentWrapper>

                    <Title name="CRIAR SESSÃO" />

                    <ColumnsContainer>

                        <OptionsContainer>

                            <InfoPlayers>
                                <Title name="JOGADORES" fontSize="36px" />
                                <PlayerInput
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={playersCount}
                                    onChange={handlePlayerCountChange}
                                />
                            </InfoPlayers>

                            <InfoTime>

                                <Title name="TEMPO" fontSize="36px" />

                                <TimeOptions>
                                    {timeOptions.map((option) => (
                                        <TimeOption
                                            key={option.minutes}
                                            selected={selectedTime === option.minutes}
                                            onClick={() => handleTimeSelect(option.minutes)}
                                        >
                                            {option.label}
                                        </TimeOption>
                                    ))}
                                </TimeOptions>

                            </InfoTime>

                            <Button name="CRIAR SESSÃO" backgroundColor="#3D8361" />

                        </OptionsContainer>

                        <InfoContainer>

                            <InfoGames>

                                <Title name="JOGOS" fontSize="36px" />

                                <GameSelect onChange={handleGameChange}>
                                    {games.map((game, index) => (
                                        <option key={index} value={game.name}>
                                            {game.name}
                                        </option>
                                    ))}
                                </GameSelect>

                                {selectedGame && selectedGame.description && (
                                    <GameDescriptionBox>
                                        <Title name={selectedGame.name} fontSize="30px" />
                                        {selectedGame.description}
                                    </GameDescriptionBox>
                                )}

                            </InfoGames>

                        </InfoContainer>

                    </ColumnsContainer>

                </ContentWrapper>

            </MainContainer>
        </>
    );
};

export default CreateSession;