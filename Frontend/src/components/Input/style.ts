import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center; 
`;

export const InputField = styled.input`
  width: 40%;
  height: 4rem;
  display: flex;
  justify-content: center;
  padding: 10px;
  padding-left: 4rem;  
  border: none;
  border-bottom: 3px solid #101318;
  outline: none;
  font-size: 36px;
  color: #A0A4B8;
  background: transparent;
  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: calc(30% + 10px); 
  top: 50%;
  transform: translateY(-50%);
  color: #E1E5EE;
  pointer-events: none; 
`;
