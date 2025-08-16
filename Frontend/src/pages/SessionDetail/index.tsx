import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../api/axios";
import { Container, Grid, ChartCard, SessionInfo } from "./style";
import SkillChart from "../../components/SkillChart";
import Navbar from "../../components/Navbar";
import { Player, PlayerStats } from "../../components/PlayerTable";
import Button from "../../components/Button";
import { gerarPDF } from "../../utils/pdfExport";
import Title from "../../components/Title";
import PopupMessage from "../../components/PopupMessage";

const SessionDetail = () => {
  const { id } = useParams();
  const { checkToken, tokenState } = useContext(AuthContext);
  const [session, setSession] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(
    null
  );

  const contentRef = useRef<HTMLDivElement>(null);

  checkToken();

  useEffect(() => {
    if (!tokenState || !id) return;

    const fetchData = async () => {
      const [sessionRes, playersRes] = await Promise.all([
        api.get(`sessions/${id}/`, {
          headers: { Authorization: `Bearer ${tokenState}` },
        }),
        api.get(`players/by-session-id/${id}/`),
      ]);

      setSession(sessionRes.data);

      const formattedPlayers: Player[] = playersRes.data.map((player: any) => ({
        id: String(player.id),
        name: player.player_name,
        score: Number(player.score),
        stats: {
          teamwork: Number(player.teamwork),
          communication: Number(player.communication),
          timeManagement: Number(player.time_management),
        },
      }));

      setPlayers(formattedPlayers);
    };

    fetchData();
  }, [id, tokenState]);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setPdfSuccessMessage("Preparando PDF...");

    try {
      await gerarPDF(contentRef.current, `sessao-${session.session_code}.pdf`);
      setPdfSuccessMessage("PDF exportado com sucesso!");
    } catch (error) {
      setPdfSuccessMessage("Erro ao gerar PDF");
      console.error(error);
    } finally {
      setTimeout(() => setPdfSuccessMessage(null), 3000);
    }
  };

  if (!session) return <p>Carregando sessão...</p>;

  return (
    <>
      <Navbar />

      <Container>
        <Grid ref={contentRef}>
          <ChartCard>
            <SessionInfo>
              <strong>Código:</strong> {session.session_code}
            </SessionInfo>
            <SessionInfo>
              <strong>Status:</strong> {session.status}
            </SessionInfo>
            <SessionInfo>
              <strong>Jogo:</strong> {session.game_title}
            </SessionInfo>
            <SessionInfo>
              <strong>Máximo de participantes:</strong>{" "}
              {session.max_participantes}
            </SessionInfo>
            <SessionInfo>
              <strong>Duração:</strong> {session.duration} minutos
            </SessionInfo>
            <SessionInfo>
              <strong>Criado em:</strong>{" "}
              {new Date(session.created_at).toLocaleString()}
            </SessionInfo>
          </ChartCard>

          <ChartCard>
            <Title name="EXPORTAR" fontSize="3rem" />
            <div id="buttonExport">
              <Button
                name="PDF"
                backgroundColor="#FF6567"
                width="13rem"
                borderRadius="2rem"
                height="4rem"
                onClick={handleDownloadPDF}
              />
            </div>
          </ChartCard>

          {players.map((player) => (
            <ChartCard key={player.id}>
              <PlayerStats player={player} />
            </ChartCard>
          ))}

          <ChartCard>
            <SkillChart players={players} skill="score" />
          </ChartCard>

          <ChartCard>
            <SkillChart players={players} skill="teamwork" />
          </ChartCard>

          <ChartCard>
            <SkillChart players={players} skill="communication" />
          </ChartCard>

          <ChartCard>
            <SkillChart players={players} skill="timeManagement" />
          </ChartCard>
        </Grid>

        {pdfSuccessMessage && (
          <PopupMessage
            message={pdfSuccessMessage}
            duration={3000}
            onClose={() => setPdfSuccessMessage(null)}
          />
        )}
      </Container>
    </>
  );
};

export default SessionDetail;
