import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 35vw;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;

  @media (max-width: 1024px) {
    width: 60vw;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }

  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const InputField = styled.input`
  width: 100%;
  height: 4rem;
  padding-left: 90px;
  border: none;
  border-radius: 1rem;
  border: 3px solid #1C1C1E;
  outline: none;
  font-family: 'Irish Grover', cursive;
  font-size: 36px;
  color: #1C1C1E;
  background: #D3D3D3;

  &:focus {
    border: 2px solid whitesmoke;
  }

  @media (max-width: 800px) {
    font-size: 28px;
    height: 3.5rem;
    padding-left: 60px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    height: 3rem;
    padding-left: 52px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
  pointer-events: none;
  font-size: 32px; 

  @media (max-width: 800px) {
    left: 16px;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    left: 12px;
    font-size: 20px;
  }
`;


