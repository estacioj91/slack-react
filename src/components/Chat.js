import React from 'react';
import styled from "styled-components";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import {selectRoomId} from '../features/appSlice';
import ChatInput from "./ChatInput.js"
import { db } from '../firebase.js'
import { collection, doc} from "firebase/firestore";
import {useCollection, useDocument} from 'react-firebase-hooks/firestore';

function Chat() {
    const roomId = useSelector(selectRoomId);
    const [roomDetails, loading, error] = useDocument(roomId && doc(db, "channels", roomId));
    console.log(roomDetails?.data())
    const [roomMessages] = useCollection(roomId && collection(db, "channels", roomId, "messages"));
    return(
        <ChatContainer>
            <>
            <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#Room {`${roomDetails?.data().name}`}</strong>
                    </h4>
                    <StarBorderOutlinedIcon/>
                </HeaderLeft>
                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </HeaderRight>
            </Header>
            <ChatMessages>

            </ChatMessages>

            <ChatInput 
                channelName={roomDetails?.data().name}
                channelId={roomId}
            />
            </>
        </ChatContainer>
    )
}
export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        margin-right: 10px;
        text-transform: lowercase;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 8px !important;
        font-size: 16px;
    }
`
const ChatMessages = styled.div`

`
