import { PlayerCard, StatsTable, TableCell, TableHeader, TableRow } from "./style";

interface PlayerStats {
    teamwork: string;
    communication: string;
    timeManagement: string;
}

interface Player {
    id: number;
    name: string;
    stats: PlayerStats;
    score: string;
}

interface PlayersTableProps {
    players: Player[];
}

const PlayerStats: React.FC<{ player: Player }> = ({ player }) => {
    return (
        <PlayerCard>
            <StatsTable>
                <thead>
                    <tr>
                        <TableHeader colSpan={3}>Nome</TableHeader>
                    </tr>
                    <tr>
                        <TableCell colSpan={3}>{player.name}</TableCell>
                    </tr>
                    <TableRow>
                        <TableHeader>Trabalho em equipe</TableHeader>
                        <TableHeader>Comunicação</TableHeader>
                        <TableHeader>Gerenciamento de tempo</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    <tr>
                        <TableCell>{player.stats.teamwork}</TableCell>
                        <TableCell>{player.stats.communication}</TableCell>
                        <TableCell>{player.stats.timeManagement}</TableCell>
                    </tr>
                    <tr>
                        <TableHeader colSpan={3}>Score</TableHeader>
                    </tr>
                    <tr>
                        <TableCell colSpan={3}>{player.score}</TableCell>
                    </tr>
                </tbody>
            </StatsTable>
        </PlayerCard>
    );
};


const PlayersTable: React.FC<PlayersTableProps> = ({ players }) => {
    return (
        <div>
            {players.map((player) => (
                <PlayerStats key={player.id} player={player} />
            ))}
        </div>
    );
};

export default PlayersTable;