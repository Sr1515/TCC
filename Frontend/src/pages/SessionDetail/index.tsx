import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import NavBar from "../../components/Navbar";
import { Container, Content, ExportData, HeaderContent, SessionCard, SessionInfo } from "./style";
import Title from "../../components/Title";
import Button from "../../components/Button";

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

                        <div style={{ textAlign: "center", paddingBlock: "2rem" }}>
                            <Title name="INFORMAÇÕES DA SESSÃO" fontSize="2rem" color="#FFFFFF" />
                        </div>

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

            </Container>

        </>
    );
};

export default SessionDetail;
