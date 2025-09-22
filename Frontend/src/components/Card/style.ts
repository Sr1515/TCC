import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #8c92ac;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #e2e8f0;
  width: 30%;
  height: 15rem;
  border-radius: 30px;
  padding: 1rem;

  @media (max-width: 1024px) {
    width: 45%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 80%;
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
  }
`;

export const GameInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  color: #2d2d2d;
  font-family: "Irish Grover", cursive;
  gap: 0.5rem;

  .highlight {
    color: #FFFF;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 45%;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

