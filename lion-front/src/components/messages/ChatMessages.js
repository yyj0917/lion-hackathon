import React from 'react';
import styled from 'styled-components';
import '../../styles/App.css';

const ChatMessage = styled.div`
    background-color: aliceblue;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    height: 10%;
    width: 80%;
`;
const ChatMessageContent = styled.div`
    flex-grow: 1;
`;
const ChatMessageTimestamp = styled.div`
    margin-left: 10px;
    font-size: 0.8em;
    color: #888;
`;
const ChatMessages = ({ message, timestamp }) => {
    return (
        <ChatMessage id='messageBubble'>
            <ChatMessageContent>{message}</ChatMessageContent>
            <ChatMessageTimestamp>{timestamp}</ChatMessageTimestamp>
        </ChatMessage>
    );
};

export default ChatMessages;
