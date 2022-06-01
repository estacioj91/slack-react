import React from 'react';
import styled from "styled-components";
import { db } from '../firebase.js'
import { collection,  addDoc} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';

const SidebarOption = ({Icon, title, addChannelOption}) => {
    const [channels, loading, error] = useCollection(collection(db, "channels")); 
    
    const addChannel  = async () => {
        const channelName = prompt("Enter channel name");
        const rand = Math.floor(Math.random() * 100000);
        const date = new Date();

        if(channelName){
            await addDoc(collection(db, "channels"), {
                name: channelName,
                id: rand,
                timestamp: date,
            });
        }
    }

    const selectChannel = () => {

    }

    return (
        <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon fontSize='small' style={{padding: 10}}/>}
            {Icon? (
                <h3>{title}</h3>
            ): (
                <SidebarOptionChannel>
                    <span>#</span>{title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: .9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.div``;
