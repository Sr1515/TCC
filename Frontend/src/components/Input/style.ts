import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem; 
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto; 
`;

export const InputField = styled.input`
  width: 100%;
  height: 4rem;
  padding: 10px;
  padding-left: 3rem; 
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

  @media (max-width: 768px) {
    font-size: 28px;  
    padding-left: 2rem;  
  }

  @media (max-width: 480px) {
    font-size: 24px; 
    height: 3rem;  
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #E1E5EE;
  pointer-events: none;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;  
  }

  @media (max-width: 480px) {
    font-size: 1.6rem; 
  }
`;
