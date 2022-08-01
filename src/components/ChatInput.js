import React, {useRef} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import { db } from '../firebase.js'
import { collection, addDoc, FieldValue, getDoc, doc} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';

function ChatInput({channelName, channelId, chatRef}) {
    const inputRef = useRef(null);
    const sendMessage = async (e) =>  {
        e.preventDefault();
        if(!channelId){ return false;}
        
        const date = new Date();
        const rand = Math.floor(Math.random() * 100000);

        const docRef = await addDoc(
            collection(db, "channels", channelId, "messages"),
            {   
                id: rand,
                message: inputRef.current.value,
                timestamp: date,
                user: "John Estacio",
                userImage: 'https://media-exp2.licdn.com/dms/image/C5603AQHVtJLYJQWX4w/profile-displayphoto-shrink_800_800/0/1595821325239?e=1663200000&v=beta&t=cL6VwY8xwiZwLE3B-sVltQ2Te_vR5aJOUopP1lEhDW8'
            }
            );
        chatRef.current.scrollIntoView({
            behavior: 'smooth',
        })
        inputRef.current.value = "";
    }

    return (
        <ChatInputContainer>
            <form>
                <input ref={inputRef} placeholder={`Message ${channelName}`} type="text" />
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form  {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;
