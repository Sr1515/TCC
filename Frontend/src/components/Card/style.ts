import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #8C92AC;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #e2e8f0;
    width: 30%;
    height: 12rem;
    border-radius: 30px;
`;

export const GameInfo = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    text-align: start;
    width: 30%;
    color: #1C1C1E;
    font-family: 'Irish Grover', cursive;
`;

export const CardFooter = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center; 
    padding: 30px;
    gap: 2rem;
    width: 45%;
`;
