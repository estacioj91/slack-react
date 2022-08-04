import React from "react";
import styled from "styled-components";

function Message ({message, timestamp, user, userImage}){
    return(
        <MessageContainer>
            <img src={userImage} alt={user} />
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}
export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 50px;
        border-radius: 8px;
    }

    @media only screen and (max-width: 600px) {
        padding: 10px;
        > img {
            height: 30px;
        }
    }

    @media only screen and (max-width: 420px) {
        align-items: flex-start;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;
    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }
    @media only screen and (max-width: 600px) {
        > h4  {
            font-size: 12px;
        }
        > p {
            font-size: 10px;
        }
        > h4 > span {
            font-size: 8px;
        }
    }

    @media only screen and (max-width: 420px) {
        > h4 > span {
            display: block;
            margin: 2px 0 2px 0;
        }
    }
`
