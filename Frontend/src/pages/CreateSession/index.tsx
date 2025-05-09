import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



type Game = {
    id: string;
    name: string;
    description: string;
};

type TimeOption = {
    minutes: number;
    label: string;
};

type TokenPayload = {
    user_id: string;
};

const CreateSession = () => {
    const [playersCount, setPlayersCount] = useState<number>(4);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [allGames, setAllGames] = useState<Game[] | null>(null);
    const { tokenState } = useContext(AuthContext);
    const { checkToken } = useContext(AuthContext);

    const navigate = useNavigate();

    checkToken();

    const timeOptions: TimeOption[] = [
        { minutes: 4, label: "4 minutos" },
        { minutes: 5, label: "5 minutos" },
        { minutes: 6, label: "6 minutos" }
    ];

    const fetchGames = async () => {

        if (!tokenState) {
            return;
        }

        try {
            const response = await api.get('games/', {
                headers: {
                    Authorization: `Bearer ${tokenState}`
                }
            })

            setAllGames(response.data);

        } catch (error) {
            console.log(`Error: ${error}`)
        }

    }

    const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGameName = e.target.value;
        const game = allGames?.find(g => g.name === selectedGameName) ?? null;
        setSelectedGame(game || null);
    };

    const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPlayersCount(isNaN(value) ? 1 : Math.max(0, Math.min(10, value)));
    };

    const handleTimeSelect = (minutes: number) => {
        setSelectedTime(minutes);
    };

    const onSubmit = async () => {

        if (!tokenState) {
            return;
        }

        if (!playersCount) {
            return;
        }

        if (!selectedGame) {
            return;
        }

        if (!selectedGame) {
            return;
        }

        try {
            const decoded = jwtDecode<TokenPayload>(tokenState);
            const userId = decoded.user_id;

            const session = {
                organizer: userId,
                game: selectedGame.id,
                max_participantes: playersCount,
                duration: selectedTime
            }

            const response = await api.post('sessions/', session, {
                headers:
                    { Authorization: `Bearer ${tokenState}` }
            });

            if (response.status == 201) {
                navigate('/home', { replace: true });
            }


        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        fetchGames();
    }, [tokenState])


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

                            <Button name="CRIAR SESSÃO" backgroundColor="#3D8361" onClick={onSubmit} />

                        </OptionsContainer>

                        <InfoContainer>

                            <InfoGames>

                                <Title name="JOGOS" fontSize="36px" />

                                <GameSelect onChange={handleGameChange}>
                                    {allGames?.map((game, index) => (
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