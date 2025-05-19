import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/Navbar";
import { MainContainer } from "./style";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";

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

    checkToken();

    const fetchSessions = async () => {
        if (!tokenState) {
            return;
        }

        try {
            const response = await api.get("sessions/", {
                headers: {
                    Authorization: `Bearer ${tokenState}`
                }
            });

            console.log(response.data);
            setMySessions(response.data);


        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        if (tokenState) {
            fetchSessions();
        }
    }, [tokenState])


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
                    />
                ))}


            </MainContainer>

        </>
    );
};

export default Sessions;
