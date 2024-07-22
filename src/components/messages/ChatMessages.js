import React from 'react';
import styled from 'styled-components';
import '../../styles/App.css';

const ChatMessage = styled.div`
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    height: 10%;
    width: 80%;
`;
const ChatMessageContent = styled.div`
    flex-grow: 1;
`;
const ChatMessageWriter = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 0.8em;
    color: #888;
`;
const ChatMessages = ({ message, writer }) => {
    return (
        <ChatMessage id='messageBubble'>
            <ChatMessageContent>{message}</ChatMessageContent>
            <ChatMessageWriter>{writer}</ChatMessageWriter>
        </ChatMessage>
    );
};

export default ChatMessages;
