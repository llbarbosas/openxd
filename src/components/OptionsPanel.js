import React from 'react';
import styled from 'styled-components';

export default function OptionsPanel(){
    return (
        <Panel>
            <Slot half></Slot><Slot half></Slot>
            <Slot></Slot>
            <Slot></Slot>
            <Slot></Slot>
        </Panel>
    );
}

const Panel = styled.div`
    position: fixed;
    right: 0;

    height: 100%;
    width: 15%;

    background-color: white;
`;

const Slot = styled.div`
    width: ${ ({half}) => half ? '50%' : '100%' };
    height: 40px;
    
    border-bottom: #e3e3e3 solid 2px;

    ${ ({half}) => half ? 'border-right: #e3e3e3 solid 1px' : '' };
    ${ ({half}) => half ? 'display: inline-block' : '' };
`;
