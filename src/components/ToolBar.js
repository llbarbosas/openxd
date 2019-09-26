import React from 'react';
import styled from 'styled-components';

import { IoMdNavigate, IoMdRadioButtonOff, IoMdSquareOutline } from 'react-icons/io';
import { FaPenNib } from 'react-icons/fa';
import { MdTitle , MdNote } from 'react-icons/md';

export default function Toolbar(){
    return (
        <Nav>
            <ul>
                <Li active><IoMdNavigate className="io-navigate"/></Li>
                <Li><IoMdSquareOutline/></Li>
                <Li><IoMdRadioButtonOff/></Li>
                <Li>/</Li>
                <Li><FaPenNib/></Li>
                <Li><MdTitle/></Li>
                <Li><MdNote/></Li>
            </ul>
        </Nav>
    );
}

const Nav = styled.nav`
    background-color: white;

    position: fixed;
    left: 0;
    
    padding: 15px;
    height: 100%;
`;

const Li = styled.li`
    font-size: 20px;
    text-align: center;

    color: ${ ({active}) => active ? '#1492e5' : 'black' };

    margin-bottom: 15px;

    .io-navigate {
        transform: rotate(-20deg);
    }
`;