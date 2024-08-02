import React from 'react';
import styled from 'styled-components';
import '../../styles/App.css';
import PropTypes from 'prop-types';

const ChatMessage = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 10%;
  width: 80%;
  position: relative;
`;
const ChatMessageContent = styled.p`
  flex-grow: 1;
  margin: 0;
  font-size: 18px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: normal;
  font-size: 14px;
  color: #444444;
  @media (max-width: 300px) {
    font-size: 16px;
  }
`;
const ChatMessageWriter = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.8em;
  color: #888;
`;
function ChatMessages({ content, writer }) {
  return (
    <ChatMessage id="messageBubble">
      <ChatMessageContent>{content}</ChatMessageContent>
      <ChatMessageWriter>{writer}</ChatMessageWriter>
    </ChatMessage>
  );
}

// PropType 정의
ChatMessages.propTypes = {
  content: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
};
export default ChatMessages;
