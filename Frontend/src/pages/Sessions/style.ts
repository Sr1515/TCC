import styled from 'styled-components';

export const MainContainer = styled.div`
  margin-top: 6rem;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  min-height: calc(100vh - 6rem);
  overflow-y: auto;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;
