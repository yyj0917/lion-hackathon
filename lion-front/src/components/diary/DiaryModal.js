// DiaryModal.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  HandMetal,
  HeartHandshake,
  PartyPopper,
  Siren,
  ThumbsUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadPersonalPostApi, ReadPostsApi } from "../../api/diary";

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
`;

const ModalContainer = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 20px;
  max-width: 600px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  box-sizing: border-box;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  span {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #ff5a5a;
    color: white;
    font-weight: 700;
    padding: 5px;
    cursor: pointer;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
  overflow: auto;
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
  .username {
    text-align: end;
    font-size: 14px;
    font-weight: 700;
    color: #5a5a5a;
    font-family: "Nunito", Courier, monospace;
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
const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IconSpan = styled.div`
  display: inline-flex;
  line-height: 18px;
  font-size: 12px;
  /* justify-content: space-between; */
  gap: 10px;
  width: 50%;
  span {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: 100%;
    font-size: 16px;
    display: flex;
    gap: 5px;
    align-items: center;
    /* color: #FF5A5A; */
    justify-content: center;
    cursor: pointer;
  }
`;

const DiaryModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState({});
  const fetchDiary = async () => {
    try {
      const response = await ReadPersonalPostApi(id);
      console.log(response);
      setDiary(response);
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };
  useEffect(() => {
    fetchDiary();
  }, [id]);

  return (
    <ModalBackground>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{diary.title}</ModalTitle>
          <div style={{ display: "flex", gap: "10px" }}>
            <span>
              <Siren size={24} style={{ color: "white" }} />
              신고하기
            </span>
          </div>
        </ModalHeader>
        <ModalContent>
          <p>{diary.body}</p>
          <p className="username">닉네임/{diary.date}</p>
        </ModalContent>
        <ModalFooter>
          <IconSpan>
            <span>
              <ThumbsUp size={16} style={{ color: "#0064FF" }} /> 0
            </span>
            <span>
              <PartyPopper size={16} style={{ color: "#008C8C" }} /> 2
            </span>
            <span>
              <HandMetal size={16} style={{ color: "#FF8200" }} /> 0
            </span>
            <span>
              <HeartHandshake size={16} style={{ color: "#FF5A5A" }} /> 0
            </span>
          </IconSpan>
          <div>
            <EditButton>수정하기</EditButton>
            <DeleteButton>삭제하기</DeleteButton>
          </div>
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default DiaryModal;
