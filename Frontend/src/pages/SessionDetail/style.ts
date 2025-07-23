import styled from "styled-components";

export const Container = styled.div`
  padding-top: 70px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const SessionInfo = styled.div`
  margin-bottom: 8px;
  font-size: 20px;
  color: #444;
  text-align: center;
  font-family: "Irish Grover", cursive;

  strong {
    font-weight: 600;
  }
`;

export const ChartCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  min-height: 360px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const Value = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;
