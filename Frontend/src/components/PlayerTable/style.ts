import styled from "styled-components";

export const TableWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  font-family: "Irish Grover", cursive;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #fca311;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: center;
  font-size: 1.25rem;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
  font-family: "Irish Grover", cursive;
  background-color: #c9c9d0;
`;

export const HighlightRow = styled(TableRow)`
  background-color: gray;
  font-family: "Irish Grover", cursive;
`;

export const PlayerName = styled.span`
  font-weight: bold;
  font-family: "Irish Grover", cursive;
`;
