// DiaryModal.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  max-height: 400px;
  width: 100%;
  height: 100%;
  overflow: auto;

`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: #FF5A5A;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
  p {

        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        white-space: normal;
        font-size: 14px;
        color: #444444;
  }
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;
const DeleteButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DiaryModal = ({ diary, onClose }) => {
  const [likes, setLikes] = useState(diary.likes || 0);
  const [comments, setComments] = useState(diary.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    try {
      // await axios.post(`/api/diaries/${diary.id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Failed to like diary:', error);
    }
  };
  // const handleComment = async () => {
  //   if (!newComment.trim()) return;
  //   try {
  //     const response = await axios.post(`/api/diaries/${diary.id}/comments`, { comment: newComment });
  //     setComments([...comments, response.data]);
  //     setNewComment('');
  //   } catch (error) {
  //     console.error('Failed to add comment:', error);
  //   }
  // };
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{diary.title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <p>{diary.body}</p>
          <p>{diary.date}</p>
        </ModalContent>
        <div>
            <EditButton>수정하기</EditButton>
            <DeleteButton>삭제하기</DeleteButton>
        </div>

      </ModalContainer>
    </ModalBackground>
  );
};

export default DiaryModal;
