import styled from "styled-components";


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 320px;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button<{ tipo: 'confirmar' | 'cancelar' }>`
  padding: 0.5rem 1.5rem;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ tipo }) => (tipo === 'confirmar' ? '#28a745' : '#dc3545')};

  &:hover {
    background-color: ${({ tipo }) => (tipo === 'confirmar' ? '#218838' : '#c82333')};
  }
`;