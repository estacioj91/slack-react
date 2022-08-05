import React, {useRef} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import { db } from '../firebase.js'
import { collection, addDoc, FieldValue, getDoc, doc} from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function ChatInput({channelName, channelId, chatRef}) {
    const [user, loading]= useAuthState(auth);
    const inputRef = useRef(null);
    const button = useRef(null);
    const sendMessage = async (e) =>  {
        e.preventDefault();
        console.log("submit")
        if(!channelId){ return false;}
        
        const date = new Date();
        const rand = Math.floor(Math.random() * 100000);

        const docRef = await addDoc(
            collection(db, "channels", channelId, "messages"),
            {   
                id: rand,
                message: inputRef.current.value,
                timestamp: date,
                user: user.displayName,
                userImage: user.photoURL
            }
            );
        chatRef.current.scrollIntoView({
            behavior: 'smooth',
        })
        inputRef.current.value = "";
    }

    const handleKeypress = e => {
        console.log("keypress")
        if (e.keyCode === 13) {
            e.preventDefault();
            button?.current.click();
        }
    };

    return (
        <ChatInputContainer>
            <form>
                <input ref={inputRef} placeholder={`Message ${channelName}`} type="text" onKeyPress={handleKeypress}/>
                <Button ref={button} hidden type="submit" onClick={sendMessage}>
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
