import styled from "styled-components";

export const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Irish Grover', cursive;
  
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  
  transition: transform 0.1s ease, box-shadow 0.2s ease;

  &:active {
    transform: scale(0.95); 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3); 
  }
`;
