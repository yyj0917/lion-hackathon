import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdatePrivateDiaryApi, fetchPrivateDiaryOne } from "../../../api/privateDiary";
import styled from "styled-components";
import { CircleX, Undo2 } from "lucide-react";

// const D = styled.div`
//   width: 80%;
//   height: 85%;
//   margin: auto;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h2`
  margin: 0;
`;
const DiaryContainer = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 20px;
  max-width: 600px;
  max-height: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  box-sizing: border-box;
`;
const DiaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .back {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #ff5a5a;
    font-weight: 700;
    padding: 5px;
    color: #ff5a5a;
    cursor: pointer;
    &:hover {
      background-color: #ff5a5a;
      color: white;
    }
  }
`;

const DiaryContent = styled.div`
  margin-bottom: 20px;
  overflow: auto;
  border: solid #ddd;
  border-left: 1px;
  border-right: 1px;
  border-radius: 20px;
  padding: 10px;
  height: 100%;
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
const DiaryFooter = styled.div`
  display: flex;
  justify-content: end;
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
const SaveButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
const InputTitle = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
  /* 스타일링 추가 */
`;

const TextArea = styled.textarea`
  width: 100%;
  /* padding: 10px; */
  height: 100%;
  border: none;
  /* 스타일링 추가 */
`;

const DiaryDetail = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(null);
  const [editedBody, setEditedBody] = useState(null);

  // Fetch Diary
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await fetchPrivateDiaryOne(id);
        setDiary(response);
        setEditedTitle(diary.title);
        setEditedBody(diary.body);
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    fetchDiary();
  }, [id]);
  
  // Diary Update function
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
        const updatedDiary = await UpdatePrivateDiaryApi(
            diary.id,
            editedTitle,
            editedBody,
            diary.date,
        )
        setDiary(updatedDiary);
        alert("수정되었습니다.");
        setIsEditing(false);
    } catch (error) {
        console.error("Error updating diary: ", error);
    }
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(diary.title);
    setEditedBody(diary.body);
  };

  

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrapper>
        <DiaryContainer>
          <DiaryHeader>
            {isEditing ? (
                    <InputTitle
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    />
            ) : (
                <>
                    <Title>{diary.title}</Title>
                    <Undo2 className="back" onClick={() => navigate(-1)} />
                </>
            )}
          </DiaryHeader>
          <DiaryContent>
            {isEditing ? (
                <TextArea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
            ) : (
                <>
                    <p>{diary.body}</p>
                    <p className="username">닉네임/{diary.date}</p>
                </>
            )}
          </DiaryContent>
          <DiaryFooter>
            {isEditing ? (
                <>
                    <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
                    <CancelButton onClick={handleCancelClick}>취소하기</CancelButton>
                </>
            ) : (
                <>
                    <EditButton onClick={handleEditClick}>수정하기</EditButton>
                    <DeleteButton>삭제하기</DeleteButton>
                </>
            )}
          </DiaryFooter>
        </DiaryContainer>
      </Wrapper>
    </>
  );
};

export default DiaryDetail;
