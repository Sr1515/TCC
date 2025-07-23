import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const Sidebar = styled.aside`
  width: 240px;
  background-color: #2F3E46;
  color: white;
  padding: 2rem 1rem;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.header`
  padding: 1rem 2rem;
  background-color: #354F52;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background-color: #f5f7fa;
`;