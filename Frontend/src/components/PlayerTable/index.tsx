import {
  HighlightRow,
  PlayerName,
  StyledTable,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./style";

interface PlayerStats {
  teamwork: number;
  communication: number;
  timeManagement: number;
}

interface Player {
  id: string;
  name: string;
  stats: PlayerStats;
  score: number;
}

const PlayerStats = ({ player }: { player: Player }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeader colSpan={2}>
              <PlayerName>{player.name}</PlayerName>
            </TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>Trabalho em equipe</TableCell>
            <TableCell>{player.stats.teamwork.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comunicação</TableCell>
            <TableCell>{player.stats.communication.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gerenciamento de tempo</TableCell>
            <TableCell>{player.stats.timeManagement.toFixed(2)}</TableCell>
          </TableRow>
          <HighlightRow>
            <TableCell>
              <strong>Score</strong>
            </TableCell>
            <TableCell>{player.score.toFixed(2)}</TableCell>
          </HighlightRow>
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export { PlayerStats };
export type { Player };
