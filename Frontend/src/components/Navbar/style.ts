import styled from "styled-components";


export const Container = styled.div<{ color: string; width: string; height: string }>`
    position: fixed;
    top: 0;
    left: 0;
    width: ${({ width }) => width};
    height: ${({ height }) => height}; 
    background-color: ${({ color }) => color}; 
    z-index: 20;
    display: flex; 
    align-items: center; 
    padding-left: 1rem ;
`;
