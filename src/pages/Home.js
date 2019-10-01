import React from 'react';

import styled from 'styled-components';
import GlobalStyle from './../styles/global';

import TopBar from '../components/TopBar';
import ToolBar from '../components/ToolBar';
import OptionsPanel from '../components/OptionsPanel';
import Board from '../components/Board';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        };

        this.openSideMenu = this.openSideMenu.bind(this)
    }

    openSideMenu() {
        this.setState({showMenu: !this.state.showMenu});
    }

    render() {
        return (
            <>
                <Container>
                    <TopBar openSideMenu={this.openSideMenu} />
                    <ToolBar  showMenu={this.state.showMenu} />
                    <OptionsPanel />
    
                    <Boards>
                        <Board />
                    </Boards>
                </Container>
                
                <GlobalStyle />
            </>
        );
    }
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

