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
    InfoGames,
    ButtonContainer
} from "./style";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../../components/PopupMessage";

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
    const [inputValue, setInputValue] = useState("4");
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [allGames, setAllGames] = useState<Game[] | null>(null);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const { tokenState, checkToken } = useContext(AuthContext);
    const navigate = useNavigate();

    checkToken();

    const timeOptions: TimeOption[] = [
        { minutes: 5, label: "5 minutos" },
        { minutes: 10, label: "10 minutos" },
        { minutes: 15, label: "15 minutos" },
        { minutes: 20, label: "20 minutos" }
    ];

    const fetchGames = async () => {
        if (!tokenState) return;

        try {
            const response = await api.get('games/', {
                headers: { Authorization: `Bearer ${tokenState}` }
            });

            const games = response.data;
            setAllGames(games);

            if (games.length > 0 && !selectedGame) {
                setSelectedGame(games[0]);
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGameName = e.target.value;
        const game = allGames?.find(g => g.name === selectedGameName) ?? null;
        setSelectedGame(game || null);
    };

    const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleTimeSelect = (minutes: number) => {
        setSelectedTime(minutes);
    };

    const onSubmit = async () => {
        if (!tokenState) return;

        const parsedInput = parseInt(inputValue, 10);

        if (isNaN(parsedInput) || parsedInput === 0) {
            setPopupMessage("A partida precisa ter pelo menos 1 jogador.");
            return;
        }

        if (parsedInput > 10) {
            setPopupMessage("A partida não pode ter mais que 10 jogadores.");
            return;
        }

        if (!selectedGame || selectedTime === null) {
            setPopupMessage("Selecione um jogo e um tempo para continuar.");
            return;
        }

        try {
            const decoded = jwtDecode<TokenPayload>(tokenState);
            const userId = decoded.user_id;

            const session = {
                organizer: userId,
                game: selectedGame.id,
                max_participantes: parsedInput,
                duration: selectedTime 
            };

            const response = await api.post('sessions/', session, {
                headers: { Authorization: `Bearer ${tokenState}` }
            });

            if (response.status === 201) {
                setPopupMessage("Sessão criada com sucesso!");
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 2000);
            }

        } catch (error: any) {
            console.log("Erro:", error);
            if (error.response) {
                setPopupMessage("Erro ao criar sessão: " + JSON.stringify(error.response.data));
            } else {
                setPopupMessage("Erro inesperado ao criar sessão.");
            }
        }
    };

    useEffect(() => {
        fetchGames();
    }, [tokenState]);

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
                                    inputMode="numeric"
                                    value={inputValue}
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

                    <ButtonContainer>
                        <Button
                            name="CRIAR SESSÃO"
                            backgroundColor="#3D8361"
                            onClick={onSubmit}
                        />
                    </ButtonContainer>
                </ContentWrapper>
            </MainContainer>

            {popupMessage && (
                <PopupMessage
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                    duration={2000}
                />
            )}
        </>
    );
};

export default CreateSession;
