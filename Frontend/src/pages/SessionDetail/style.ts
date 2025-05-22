import styled from "styled-components";

export const Container = styled.div`
  margin-top: 6rem; 
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  min-height: calc(100vh - 6rem); 
  overflow-y: auto;
`;

export const CenteredTitle = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-block: 2rem;
  text-align: center;
  padding-left: 10rem;

  @media (max-width: 1024px) {
    padding-left: 5rem;
  }

  @media (max-width: 768px) {
    padding-left: 2rem;
  }

  @media (max-width: 480px) {
    padding-left: 0;
    width: 100%;
  }
`;


export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;  
  justify-content: end;
  min-width: 0; 
  max-width: 100%;
`;


export const ExportData = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

export const SessionInfo = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  font-weight: normal;

  strong {
    font-weight: bold;
    color: #333; 
  }
`;

export const SessionCard = styled.div`
  background-color: #D9D9D9;
  align-content: end;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 80%;
  box-sizing: border-box;
`;

export const PlayersData = styled.div`
  width: 100%;
  margin: 0 auto;
`;