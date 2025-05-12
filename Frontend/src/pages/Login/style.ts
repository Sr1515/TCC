import styled from "styled-components";

export const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #5B6475;
  overflow: auto;
  gap: 5rem; 

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 2rem;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  color: red;
  padding-top: 10px;
  font-size: 1.2rem;
`;
