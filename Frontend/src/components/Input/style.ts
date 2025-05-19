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
  border-bottom: 3px solid #101318;
  outline: none;
  font-family: 'Irish Grover', cursive;
  font-size: 36px;
  color: whitesmoke;
  background: transparent;

  &:focus {
    border-bottom: 2px solid whitesmoke;
  }

  @media (max-width: 800px) {
    font-size: 28px;
    height: 3.5rem;
    padding-left: 36px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    height: 3rem;
    padding-left: 32px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  pointer-events: none; 
  padding-left: 30px;
`;

