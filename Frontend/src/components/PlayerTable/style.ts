import styled from "styled-components";

export const PlayerCard = styled.div`
  width: 80%;
  margin: 2rem auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const StatsTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableHeader = styled.th`
  background-color: #2baeb7;
  font-family: 'Irish Grover', cursive;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 30px;
  width: 33.33%; 
`;

export const TableCell = styled.td`
  background-color: #e9ecef;
  font-family: 'Irish Grover', cursive;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  width: 33.33%; 
`;

export const TableRow = styled.tr``;

export const TableFooter = styled.td`
  background-color: #2baeb7;
  font-family: 'Irish Grover', cursive;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
`;
