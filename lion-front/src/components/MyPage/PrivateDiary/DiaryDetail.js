import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Undo2 } from 'lucide-react';
import {
  DeletePrivateDiaryApi,
  UpdatePrivateDiaryApi,
  fetchPrivateDiaryOne,
} from '../../../api/privateDiary';
import background1 from '../../../assets/background/background_1.jpg';
import background2 from '../../../assets/background/background_2.jpg';
import background3 from '../../../assets/background/background_3.jpg';
import background4 from '../../../assets/background/background_4.jpg';
import background5 from '../../../assets/background/background_5.jpg';

const images = [
  background1,
  background2,
  background3,
  background4,
  background5,
];
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  margin: 0;
`;
const DiaryContainer = styled.div`
  background: ${({ theme }) =>
    theme === 'default' ? '#fff' : theme === 'red' ? '#FFF0F0' : 'transparent'};
  background-image: ${({ theme, backgroundImage }) =>
    theme === 'image' ? `url(${backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  opacity: ${({ theme }) => (theme === 'image' ? 0.7 : 1)};
  color: ${({ theme }) => (theme === 'image' ? 'white' : 'black')};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 20px;
  max-width: 600px;
  max-height: 500px;
  width: 99%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  box-sizing: border-box;
  //
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
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    white-space: normal;
    font-size: 14px;
  }
  .username {
    text-align: end;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Nunito', Courier, monospace;
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

// Edit
const EditContainer = styled.div`
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  max-width: 600px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  box-sizing: border-box;
`;
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px; /* 고정된 높이 설정 */
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  input,
  textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:focus {
      border-color: #4285f4;
      box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
    }
  }
  textarea {
    height: 100%;
  }
`;
const ThemeButton = styled.button`
  margin: 5px;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: ${({ theme }) =>
    theme === 'default' ? '#fff' : theme === 'red' ? '#FFF0F0' : 'transparent'};
  background-image: ${({ theme, backgroundImage }) =>
    theme === 'image' ? `url(${backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

function DiaryDetail() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const [theme, setTheme] = useState('default');

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  // Fetch Diary
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await fetchPrivateDiaryOne(id);
        setDiary(response);
        setEditedTitle(response.title);
        setEditedBody(response.body);
      } catch (error) {
        console.error('Error fetching diary:', error);
      }
    };

    fetchDiary();
  }, []);

  // Private 일기 수정버튼 클릭
  const handleEditClick = () => {
    setIsEditing(true);
  };
  // Private 일기 수정사항 저장
  const handleSaveClick = async (event) => {
    event.preventDefault(); // 기본 동작 막기
    try {
      const updatedDiary = await UpdatePrivateDiaryApi(
        diary.id,
        editedTitle,
        editedBody,
        diary.date
      );
      setDiary(updatedDiary);
      alert('수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating diary: ', error);
    }
  };
  // Private 일기 삭제버튼 클릭
  const handleDeleteClick = async () => {
    try {
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        await DeletePrivateDiaryApi(diary.id);
        alert('삭제되었습니다.');
        navigate(-1);
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      console.error('Error updating diary: ', error);
    }
  };
  // Private 일기 수정 취소
  const handleCancelClick = (event) => {
    event.preventDefault(); // 기본 동작 막기
    setIsEditing(false);
    setEditedTitle(diary.title);
    setEditedBody(diary.body);
  };

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      {isEditing ? (
        <EditContainer>
          <EditForm>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <EditButton onClick={handleSaveClick}>저장하기</EditButton>
              <DeleteButton onClick={handleCancelClick}>취소하기</DeleteButton>
            </div>
          </EditForm>
        </EditContainer>
      ) : (
        <DiaryContainer
          theme={theme}
          backgroundImage={images[id % images.length]}
        >
          <DiaryHeader>
            <Title>{diary.title}</Title>
            <div>
              <ThemeButton
                theme="default"
                backgroundImage={images[id % images.length]}
                onClick={() => setTheme('default')}
              />
              <ThemeButton
                theme="red"
                backgroundImage={images[id % images.length]}
                onClick={() => setTheme('red')}
              />
              <ThemeButton
                theme="image"
                backgroundImage={images[id % images.length]}
                onClick={() => setTheme('image')}
              />
            </div>
            <Undo2 className="back" onClick={() => navigate(-1)} />
          </DiaryHeader>
          <DiaryContent>
            <p>{diary.body}</p>
            <p className="username">{diary.date}</p>
          </DiaryContent>
          <DiaryFooter>
            <EditButton onClick={handleEditClick}>수정하기</EditButton>
            <DeleteButton onClick={handleDeleteClick}>삭제하기</DeleteButton>
          </DiaryFooter>
        </DiaryContainer>
      )}
    </Wrapper>
  );
}

export default DiaryDetail;
