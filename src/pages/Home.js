import React from 'react';

import styled from 'styled-components';
import GlobalStyle from './../styles/global';

import TopBar from '../components/TopBar';
import ToolBar from '../components/ToolBar';
import OptionsPanel from '../components/OptionsPanel';
import Board from '../components/Board';

export default function Home() {
    return (
        <>
            <Container>
                <TopBar />
                <ToolBar />
                <OptionsPanel />

                <Boards>
                    <Board />
                </Boards>
            </Container>
            
            <GlobalStyle />
        </>
    );
}

const Container = styled.div`
    margin: 0;
    height: 100%;
    width: 100%;

    background-color: #e3e3e3;
`;

const Boards = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 20px;
`;

