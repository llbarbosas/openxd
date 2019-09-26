import React from 'react';
import styled from 'styled-components';

import { FiSearch, FiShare, FiPlay, FiMenu } from 'react-icons/fi';

export default function TopBar() {
    return (
        <Header>
            <nav>
                <PagesUl>
                    <Li><FiMenu size="20" className="fi-menu"/></Li>
                    <Li active>Design</Li>
                    <Li>Prototype</Li>
                </PagesUl>
            </nav>

            <DocumentTitle>Untitled</DocumentTitle>

            <nav>
                <ViewOptionsUl>
                    <li><FiSearch className="fi-search" /> 20%</li>
                    <li><FiPlay className="fi-play"></FiPlay></li>
                    <li><FiShare /></li>
                </ViewOptionsUl>
            </nav>
        </Header>
    )
}

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px 0;

    background-color: white;
    border-bottom: #e3e3e3 solid 2px;
`;

const PagesUl = styled.ul`
    display: flex;
`;

const Li = styled.li`
    display: inline;
    margin-right: 20px;

    color: ${ ({ active }) => active ? 'black' : '#9f9f9f'};

    ${ ({ active }) => active ? 'border-bottom: black solid 2px; padding-bottom: 9px;' : '' };

    .fi-menu {
        margin-right: 20px;
    }
`;

const DocumentTitle = styled.h3`
    font-size: 14px;
    color: #9f9f9f;
`;

const ViewOptionsUl = styled.ul`
    li {
        display: inline;
        margin-left: 20px;

        .fi-search {
            transform: rotate(-270deg);
        }

        .fi-play {
            fill: black;
        }
    }
`;

