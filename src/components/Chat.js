import React, {useRef} from 'react';
import styled from "styled-components";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import {selectRoomId} from '../features/appSlice';
import ChatInput from "./ChatInput.js"
import { db } from '../firebase.js'
import { collection, doc, orderBy} from "firebase/firestore";
import {useCollection, useDocument} from 'react-firebase-hooks/firestore';
import Message from './Message';
import { useEffect } from 'react';
function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails, loading, error] = useDocument(roomId && doc(db, "channels", roomId));
    const [roomMessages] = useCollection(roomId && collection(db, "channels", roomId, "messages"));
    
    useEffect(() => {
        if(chatRef !== null) {
            chatRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }
    }, [loading, roomMessages])

    return(
        <ChatContainer>
            {roomDetails && roomMessages && (
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
                        {roomMessages?.docs.map((item) => {
                            return item.data();
                        }).sort((b,a) => {
                            return new Date(b.timestamp.seconds) - new Date(a.timestamp.seconds);
                        }).map((item) => {
                            const {message, timestamp, user, userImage} = item;
                            return (
                                <Message
                                    key={item.id}
                                    message={message}    
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                >
                                </Message>
                            )
                        })}
                        <ChatBottom ref={chatRef}></ChatBottom>
                    </ChatMessages>
        
                    <ChatInput 
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                        chatRef={chatRef}
                    />
                </>
            )}
            
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

    @media only screen and (max-width: 600px) {
        > h4 {
            font-size: 14px;
        }
        > h4 > .MuiSvgIcon-root {
            font-size: 14px
        }
        > .MuiSvgIcon-root {
            font-size: 14px;
        }
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

    @media only screen and (max-width: 600px) {
        > p {
            font-size: 10px
        }

        > p > .MuiSvgIcon-root {
            font-size: 12px;
        }
    }
`
const ChatMessages = styled.div`
    /* height: 780px; */
    /* overflow-y: scroll; */

    @media only screen and (max-width: 600px) {
    }
`;

const ChatBottom = styled.div`
    padding-bottom: 80px;
`
