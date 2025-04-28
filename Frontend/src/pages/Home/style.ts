import styled from "styled-components";

export const Container = styled.div`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3.5rem;
    align-content: center;
    height: 100vh; 
    width: 100%;    
    background-color: #5B6475;
`;

