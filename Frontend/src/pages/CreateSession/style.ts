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

  @media (max-width: 1024px) {
    gap: 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;


export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const PlayerInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 2rem;
  width: 10rem;
  text-align: center;
  background-color: #D9D9D9;
  font-family: 'Irish Grover', cursive;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 8rem;
  }

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
  background-color: #D9D9D9;
  color: #000000;
  text-align: center;
  gap: 2rem;
  font-size: 0.9rem;
  min-height: 60px;
  border-radius: 20px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
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
  background-color: #D9D9D9;
  font-family: 'Irish Grover', cursive;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const TimeOptions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

export const TimeOption = styled.div<{ selected?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: 1px solid ${({ selected }) => (selected ? '#4CAF50' : '#ddd')};
  background-color: ${({ selected }) => (selected ? '#4CAF50' : '#D9D9D9')};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s;
  width: 16rem;

  &:hover {
    border-color: #4CAF50;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;
