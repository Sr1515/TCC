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
  background: #F5F7FA;
  padding: 4rem;
  border-radius: 12px;
  min-width: 320px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Irish Grover', cursive;
`;

export const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  gap: 4rem;
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button<{ tipo: 'confirmar' | 'cancelar' }>`
  padding: 2rem 1.5rem;
  border: none;
  height: 5rem;
  width: 10rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Irish Grover', cursive;
  background-color: ${({ tipo }) => (tipo === 'confirmar' ? '#28a745' : '#dc3545')};

  &:hover {
    background-color: ${({ tipo }) => (tipo === 'confirmar' ? '#218838' : '#c82333')};
  }
`;