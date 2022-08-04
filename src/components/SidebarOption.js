import React, {useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { db } from '../firebase.js'
import { enterRoom } from '../features/appSlice.js';
import { collection,  addDoc} from "firebase/firestore";

const SidebarOption = ({Icon, title, addChannelOption, id}) => {
    const dispatch = useDispatch();
    const channel = useRef(null);

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

    const selectChannel = (channel) => {
        dispatch(enterRoom({
            roomId: channel.current.id
        }));
    }
    useEffect(() => {
        channel.current?.addEventListener('click', function(e){
            for(let i = 0; i < e.path.length; i++){
                if(e.composedPath()[i].id){
                    selectChannel(channel);
                    break;
                }
            }
        })
    },[channel])

    return (
        <SidebarOptionContainer ref={channel} id={id} onClick={addChannelOption ? addChannel : function(){}}>

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

    @media only screen and (max-width: 600px) {
        > h3 {
            font-size: 12px;
        }

        > .MuiSvgIcon-root {
            font-size: 14px;
        }
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 5px 0;
    font-weight: 300;
`;
