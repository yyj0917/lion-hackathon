import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  HandMetal,
  HeartHandshake,
  PartyPopper,
  Siren,
  ThumbsUp,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeletePostApi,
  LikePostApi,
  ReadPersonalPostApi,
  UnlikePostApi,
  UpdatePostApi,
} from '../../api/diary';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
`;

const ModalContainer = styled.div`
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  border-bottom: 3px solid #ddd;
  padding-bottom: 10px;
  padding-left: 10px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  padding-left: 10px;
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
    font-family: 'Nunito', Courier, monospace;
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
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #fac6c6;
      transform: scale(1.1);
    }
  }
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
function PublicDiaryOne() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState({});
  // edit용 state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [isSelect, setIsSelect] = useState(false);
  const [type, setType] = useState('');
  const [selectReaction, setSelectReaction] = useState(false);

  // Public 일기 id에 맞는 거 하나 불러오기
  const fetchDiary = async () => {
    try {
      const response = await ReadPersonalPostApi(id);
      setDiary(response);
      setEditedTitle(response.title);
      setEditedBody(response.body);
      const reactionType = response?.user_reaction?.user_reaction_type;
      if (reactionType === null) {
        setSelectReaction({
          like: false,
          congrats: false,
          excited: false,
          together: false,
        });
        setIsSelect(false);
      } else {
        if (reactionType === 'like') {
          setSelectReaction({
            like: true,
            congrats: false,
            excited: false,
            together: false,
          });
        } else if (reactionType === 'congrats') {
          setSelectReaction({
            like: false,
            congrats: true,
            excited: false,
            together: false,
          });
        } else if (reactionType === 'excited') {
          setSelectReaction({
            like: false,
            congrats: false,
            excited: true,
            together: false,
          });
        } else if (reactionType === 'together') {
          setSelectReaction({
            like: false,
            congrats: false,
            excited: false,
            together: true,
          });
        }
      }
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };
  useEffect(() => {
    fetchDiary();
  }, []);

  // Public 일기 수정버튼 클릭
  const handleEditClick = () => {
    setIsEditing(true);
  };
  // Public 일기 수정사항 저장
  const handleSaveClick = async () => {
    try {
      const response = await UpdatePostApi(
        diary.id,
        editedTitle,
        editedBody,
        diary.date
      );
      setDiary(response);
      alert('수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      alert('같은 유저만 수정할 수 있습니다.');
      setIsEditing(false);
    }
  };
  // Public 일기 삭제
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        await DeletePostApi(diary.id);
        alert('삭제되었습니다.');
        navigate(-1);
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      alert('같은 유저만 삭제할 수 있습니다.');

      console.error('Error creating diary entry:', error);
    }
  };
  // Public 일기 수정 취소
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(diary.title);
    setEditedBody(diary.body);
  };
  // 공감 눌렀을 때 함수
  const postReaction = async (id, type) => {
    try {
      await LikePostApi(id, type);
      console.log('post');
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };
  // 공감 취소했을 때 함수
  const cancelReaction = async (id) => {
    try {
      await UnlikePostApi(id);
      console.log('cancel');
    } catch (error) {
      console.error('Error canceling reaction:', error);
    }
  };

  // 공감 누르기
  const handleReactionClick = (type) => {
    setIsSelect((prevIsSelect) => !prevIsSelect);
    setType(type);
    console.log('click');
  };
  useEffect(() => {
    if (diary.id) {
      const updateReaction = async () => {
        if (isSelect === true) {
          await postReaction(id, type);
        } else {
          await cancelReaction(id);
          await postReaction(id, type);
        }
        await fetchDiary(); // 상태 변경 후 diary를 다시 fetch
      };
      updateReaction();
    }
  }, [isSelect, type]);

  return (
    <ModalBackground>
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
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{diary.title}</ModalTitle>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span>
                <Siren size={24} style={{ color: 'white' }} />
              </span>
            </div>
          </ModalHeader>
          <ModalContent>
            <p>{diary.body}</p>
            <p className="username">{diary.date}</p>
          </ModalContent>
          <ModalFooter>
            <IconSpan>
              <span
                onClick={() => handleReactionClick('like')}
                style={{
                  backgroundColor: selectReaction.like ? '#0064FF' : 'white',
                  color: selectReaction.like ? 'white' : '#0064FF',
                }}
              >
                <ThumbsUp size={16} />
                {diary.reactions && diary.reactions.like !== undefined
                  ? diary.reactions.like
                  : 0}
              </span>

              <span
                onClick={() => handleReactionClick('congrats')}
                style={{
                  backgroundColor: selectReaction.congrats
                    ? '#008C8C'
                    : 'white',
                  color: selectReaction.congrats ? 'white' : '#008C8C',
                }}
              >
                <PartyPopper size={16} />
                {diary.reactions && diary.reactions.congrats !== undefined
                  ? diary.reactions.congrats
                  : 0}
              </span>
              <span
                onClick={() => handleReactionClick('excited')}
                style={{
                  backgroundColor: selectReaction.excited ? '#FF8200' : 'white',
                  color: selectReaction.excited ? 'white' : '#FF8200',
                }}
              >
                <HandMetal size={16} />
                {diary.reactions && diary.reactions.excited !== undefined
                  ? diary.reactions.excited
                  : 0}
              </span>
              <span
                onClick={() => handleReactionClick('together')}
                style={{
                  backgroundColor: selectReaction.together
                    ? '#FF5A5A'
                    : 'white',
                  color: selectReaction.together ? 'white' : '#FF5A5A',
                }}
              >
                <HeartHandshake size={16} />
                {diary.reactions && diary.reactions.together !== undefined
                  ? diary.reactions.together
                  : 0}
              </span>
            </IconSpan>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <EditButton onClick={handleEditClick}>수정하기</EditButton>
              <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
            </div>
          </ModalFooter>
        </ModalContainer>
      )}
    </ModalBackground>
  );
}

export default PublicDiaryOne;
