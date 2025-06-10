import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/Navbar";
import { MainContainer } from "./style";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import PopupConfirmation from "../../components/PopupConfirmation";

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

const Sessions = () => {
    const { checkToken } = useContext(AuthContext);
    const { tokenState } = useContext(AuthContext);
    const [mySessions, setMySessions] = useState<SessionProps[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

    checkToken();

    const fetchSessions = async () => {

        if (!tokenState) return;

        try {
            const response = await api.get("sessions/", {
                headers: {
                    Authorization: `Bearer ${tokenState}`
                }
            });

            setMySessions(response.data);

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    useEffect(() => {
        if (tokenState) {
            fetchSessions();
        }
    }, [tokenState]);

    const confirmDeleteSession = async () => {

        if (!tokenState || !sessionToDelete) return;

        try {
            await api.delete(`sessions/${sessionToDelete}/`, {
                headers: {
                    Authorization: `Bearer ${tokenState}`
                }
            });

            setMySessions((prev) => prev.filter((session) => session.id !== sessionToDelete));
            setSessionToDelete(null);
            setShowPopup(false);

        } catch (error) {
            console.error("Erro ao deletar a sessão:", error);
        }
    };

    const handleDeleteClick = (sessionId: string) => {
        setSessionToDelete(sessionId);
        setShowPopup(true);
    };

    const cancelDelete = () => {
        setSessionToDelete(null);
        setShowPopup(false);
    };

    return (
        <>
            <NavBar />

            <MainContainer>
                {mySessions.map((session) => (
                    <Card
                        key={session.id}
                        id={session.id}
                        duration={`${session.duration} minutos`}
                        status={session.status}
                        game={session.game_title}
                        sessionCode={session.session_code}
                        players={session.max_participantes}
                        onDelete={() => handleDeleteClick(session.id)}
                    />
                ))}
            </MainContainer>

            {showPopup && (
                <PopupConfirmation
                    message="Tem certeza que deseja excluir esta sessão?"
                    onConfirm={confirmDeleteSession}
                    onCancel={cancelDelete}
                />
            )}
        </>
    );
};

export default Sessions;
