import React from "react";
import Button from "../Button";
import { Container, GameInfo, CardFooter } from "./style";
import { useNavigate } from "react-router-dom";

type SessionCardProps = {
  id: string;
  sessionCode?: string;
  status?: string;
  game?: string;
  players?: number;
  duration?: string;
  link?: string;
  color?: string;
  onDelete?: (id: string) => void;
};

const Card: React.FC<SessionCardProps> = ({
  id,
  sessionCode,
  status,
  game,
  players,
  duration,
  link,
  color = "#8C92AC",
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (status !== "concluida") return;
    navigate(`/sessions/${id}`);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleCopyLink = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      alert("Link copiado para a área de transferência!");
    }
  };


  return (
    <Container style={{ color }}>
      <GameInfo>
        <h3>
          Código da sessão: <span className="highlight">{sessionCode}</span>
        </h3>
        <h3>
          Jogo: <span className="highlight">{game}</span>
        </h3>
        <h3>
          Status: <span className="highlight">{status}</span>
        </h3>
        <h3>
          Jogadores: <span className="highlight">{players}</span>
        </h3>
        <h3>
          Duração: <span className="highlight">{duration}</span>
        </h3>

      </GameInfo>

      <CardFooter>
        <Button
          name="Excluir"
          height="4rem"
          width="70%"
          fontSize="23px"
          backgroundColor="#FF5252"
          color="#EDF0F4"
          onClick={handleDeleteClick}
        />

        {link && (
        <Button
          name="Copiar link"
          height="4rem"
          width="70%"
          fontSize="23px"
          backgroundColor="#1565c0"
          color="#EDF0F4"
          onClick={handleCopyLink}
          />
        )}

        {status === "concluida" && (
          <Button
            name="Ver detalhes"
            height="4rem"
            width="70%"
            fontSize="23px"
            backgroundColor="#4CAF50"
            color="#EDF0F4"
            onClick={handleDetailsClick}
          />
        )}

      </CardFooter>
    </Container>
  );
};

export default Card;
