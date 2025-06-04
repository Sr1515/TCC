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
  width: 100%;
  text-align: center;
  padding: 2rem 0;
`;


export const HeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  width: 100%;
  margin-bottom: 2rem;
`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

export const ExportData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%; 
  }
`;


export const PlayersData = styled.div`
  width: 100%;
  margin: 0 auto;
`;


export const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8rem;
  margin-top: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 4rem; 
  }

  @media (max-width: 480px) {
    gap: 2rem; 
    padding: 0 1rem; 
  }

  @media print {
    .echarts-instance {
      width: 100% !important;
      height: 300px !important;
    }
  }
`;


