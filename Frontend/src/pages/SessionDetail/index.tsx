import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import NavBar from "../../components/Navbar";
import { CenteredTitle, Container, Content, ExportData, HeaderContent, PlayersData, SessionCard, SessionInfo } from "./style";
import Title from "../../components/Title";
import Button from "../../components/Button";
import PlayersTable from "../../components/PlayerTable";

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

    checkToken();

    const playersData = [
        {
            id: 1,
            name: "DEV001",
            stats: {
                teamwork: "33.56",
                communication: "40.23",
                timeManagement: "70.00"
            },
            score: "164.08"
        },
        {
            id: 2,
            name: "DEV002",
            stats: {
                teamwork: "53.56",
                communication: "40.23",
                timeManagement: "70.00"
            },
            score: "164.08"
        }
    ];

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

    if (!session) return <p>Carregando detalhes da sessão...</p>;

    return (
        <>
            <NavBar />

            <Container>

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

                        <Button name="PDF" backgroundColor="#FF6567" width="13rem" borderRadius="2rem" height="4rem" />
                    </ExportData>

                </HeaderContent>


                <PlayersData>
                    <PlayersTable players={playersData} />
                </PlayersData>



            </Container>

        </>
    );
};

export default SessionDetail;
