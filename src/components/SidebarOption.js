import React from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { db } from '../firebase.js'
import { enterRoom } from '../features/appSlice.js';
import { collection,  addDoc} from "firebase/firestore";

const SidebarOption = ({Icon, title, addChannelOption, id}) => {
    const dispatch = useDispatch();

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

    const selectChannel = (event) => {
        if(id) {
            dispatch(enterRoom({
                roomId: event.target.id
            }));
        }
    }

    return (
        <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel} id={id}>
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

const SidebarOptionChannel = styled.h3`
    padding: 5px 0;
    font-weight: 300;
`;
