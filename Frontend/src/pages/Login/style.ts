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
  padding: 2rem;
  gap: 3rem;
  min-width: 320px;  
  overflow: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
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
  text-align: center;
  width: 100%; 

  @media (max-width: 768px) {
    flex-direction: column;  
    gap: 5px;  
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  color: white;
  font-family: 'Irish Grover', cursive;
  padding-top: 10px;
  font-size: 1.2rem;
  width: 100%;  
  
`;
