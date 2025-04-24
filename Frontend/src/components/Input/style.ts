import styled from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; 
`;

export const InputContainer = styled.div`
  position: relative;
  width: 40%;
`;

export const InputField = styled.input`
  width: 100%;
  height: 4rem;
  padding: 10px;
  padding-left: 3rem;  
  border: none;
  border-bottom: 4px solid #101318;
  outline: none;
  font-family: 'Irish Grover', cursive;
  font-size: 36px;
  color: #A0A4B8;
  background: transparent;

  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #E1E5EE;
  pointer-events: none;
`;
