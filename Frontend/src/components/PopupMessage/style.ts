import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  font-family: 'Irish Grover', cursive;
  background: whitesmoke;
  padding: 3rem 3rem;
  border-radius: 12px;
  min-width: 300px;
  text-align: center;
  font-size: 2.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;