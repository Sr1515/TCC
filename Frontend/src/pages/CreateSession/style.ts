import styled from 'styled-components';

export const MainContainer = styled.div`
  margin-top: 6rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 6rem);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 2rem;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;
`;

export const PlayerInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 10rem;
  font-size: 50px;
  text-align: center;
  background-color: #D9D9D9;
  font-family: 'Irish Grover', cursive;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GameDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #D9D9D9;
  color: #000000;
  text-align: center;
  gap: 2rem;
  font-size: 0.9rem;
  min-height: 60px;
  border-radius: 20px;
`;

export const InfoPlayers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const InfoGames = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;


export const GameSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1.2rem;
  width: 100%;
  background-color: #D9D9D9 ;
  font-family: 'Irish Grover', cursive;

`;

export const TimeOptions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

export const TimeOption = styled.div<{ selected?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: 1px solid ${props => props.selected ? '#4CAF50' : '#ddd'};
  background-color: #D9D9D9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  width: 16rem;
  border-radius: 15px;
  
  &:hover {
    border-color: #4CAF50;
  }
`;