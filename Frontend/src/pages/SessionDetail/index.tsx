import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import NavBar from "../../components/Navbar";
import { CenteredTitle, ChartsWrapper, Container, Content, ExportData, HeaderContent, PlayersData, SessionCard, SessionInfo } from "./style";
import Title from "../../components/Title";
import Button from "../../components/Button";
import PlayersTable from "../../components/PlayerTable";
import { gerarPDF } from "../../utils/pdfExport";
import PopupMessage from "../../components/PopupMessage";
import SkillChart from "../../components/SkillChart";

type SessionProps = {
    id: string;
    game: string;
    game_title: string;
    organizer: string;
    organizer_username: string;
    session_code: string;
    max_participantes: number;
    duration: number;
    created_at: string;
    updated_at: string;
    status: string;
};

const SessionDetail = () => {
    const { id } = useParams();
    const { checkToken, tokenState } = useContext(AuthContext);
    const [session, setSession] = useState<SessionProps | null>(null);
    const [players, setPlayers] = useState([]);
    const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

    const contentRef = useRef<HTMLDivElement>(null);

    checkToken();

    useEffect(() => {
        const fetchPlayers = async () => {
            if (!tokenState || !id) return;
            try {
                const response = await api.get(`players/by-session/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${tokenState}`
                    }
                });

                const formattedPlayers = response.data.map((player: any) => ({
                    id: player.id,
                    name: player.player_name,
                    score: player.score,
                    stats: {
                        teamwork: player.teamwork,
                        communication: player.communication,
                        timeManagement: player.time_management
                    }
                }));

                setPlayers(formattedPlayers);
            } catch (error) {
                console.error("Erro ao buscar jogadores da sessão:", error);
            }
        };

        fetchPlayers();
    }, [id, tokenState]);

    useEffect(() => {
        const fetchSession = async () => {
            if (!tokenState || !id) return;
            try {
                const response = await api.get(`sessions/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${tokenState}`
                    }
                });
                setSession(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da sessão:", error);
            }
        };

        fetchSession();
    }, [id, tokenState]);

    const handleDownloadPDF = async () => {
        if (!session) return;

        setPdfSuccessMessage("Preparando PDF...");

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            await gerarPDF(contentRef.current!, `sessao-${session.session_code}.pdf`);
            setPdfSuccessMessage("PDF exportado com sucesso!");
        } catch (error) {
            setPdfSuccessMessage("Erro ao gerar PDF");
            console.error(error);
        } finally {
            setTimeout(() => setPdfSuccessMessage(null), 3000);
        }
    };

    if (!session) return <p>Carregando detalhes da sessão...</p>;

    return (
        <>
            <NavBar />

            <Container ref={contentRef}>
                <HeaderContent>
                    <Content>
                        <CenteredTitle>
                            <Title name="INFORMAÇÕES DA SESSÃO" fontSize="2rem" color="#FFFFFF" />
                        </CenteredTitle>

                        <SessionCard>
                            <SessionInfo><strong>Código:</strong> {session.session_code}</SessionInfo>
                            <SessionInfo><strong>Status:</strong> {session.status}</SessionInfo>
                            <SessionInfo><strong>Jogo:</strong> {session.game_title}</SessionInfo>
                            <SessionInfo><strong>Máximo de participantes:</strong> {session.max_participantes}</SessionInfo>
                            <SessionInfo><strong>Duração:</strong> {session.duration} minutos</SessionInfo>
                            <SessionInfo><strong>Criado em:</strong> {new Date(session.created_at).toLocaleString()}</SessionInfo>
                        </SessionCard>
                    </Content>

                    <ExportData>
                        <div style={{ textAlign: "center", paddingBlock: "2rem" }}>
                            <Title name="EXPORTAR" fontSize="2rem" color="#FFFFFF" />
                        </div>
                        <Button
                            name="PDF"
                            backgroundColor="#FF6567"
                            width="13rem"
                            borderRadius="2rem"
                            height="4rem"
                            onClick={handleDownloadPDF}
                        />
                    </ExportData>
                </HeaderContent>

                <PlayersData>
                    <PlayersTable players={players} />
                </PlayersData>


                {players.length > 0 && (
                    <ChartsWrapper >
                        <SkillChart players={players} skill="score" />
                        <SkillChart players={players} skill="teamwork" />
                        <SkillChart players={players} skill="communication" />
                        <SkillChart players={players} skill="timeManagement" />
                    </ChartsWrapper>
                )}

            </Container>


            {pdfSuccessMessage && (
                <PopupMessage
                    message={pdfSuccessMessage}
                    onClose={() => setPdfSuccessMessage(null)}
                    duration={3000}
                />
            )}
        </>
    );
};

export default SessionDetail;
