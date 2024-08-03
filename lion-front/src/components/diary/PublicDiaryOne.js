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


const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  height: 8%;
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
function PublicDiaryOne() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState({});
  const [isSelect, setIsSelect] = useState(false);
  const [type, setType] = useState('');
  const [selectReaction, setSelectReaction] = useState({
    like: false,
    congrats: false,
    excited: false,
    together: false,
  });

  // Public 일기 id에 맞는 거 하나 불러오기
  const fetchDiary = async () => {
    try {
      const response = await ReadPersonalPostApi(id);
      setDiary(response);
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


  const utilReaction = async (id, type, isSelect) => {
    try {
      const response = isSelect
        ? await LikePostApi(id, type)
        : await UnlikePostApi(id);
      return response;
    } catch (error) {
      // console.error(`Error ${isLike ? 'liking' : 'unliking'} reaction:`, error);
    }
  };
  
  // 공감 누르기
  const handleReactionClick = (type) => {
    setIsSelect((prevIsSelect) => !prevIsSelect);
    setType(type);

  };
  useEffect(() => {
    if (diary.id) {
      const updateReaction = async () => {
        await utilReaction(id, type, isSelect);
        await fetchDiary(); // 상태 변경 후 diary를 다시 fetch
      };
      updateReaction();
    }
  }, [isSelect, type]);

  return (
    <ModalBackground>
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
              <span onClick={()=>handleReactionClick('like')} style={{
                backgroundColor: selectReaction.like ? "#0064FF" : "white",
                color: selectReaction.like ? "white" : "#0064FF",
                }}>
                <ThumbsUp size={16} />               
                {diary.reactions && diary.reactions.like !== undefined ? diary.reactions.like : 0}
              </span>
            
              <span onClick={()=>handleReactionClick('congrats')} style={{
                backgroundColor: selectReaction.congrats ? "#008C8C" : "white", 
                color: selectReaction.congrats ? "white" : "#008C8C",
                }}>
                <PartyPopper size={16} />               
                {diary.reactions && diary.reactions.congrats !== undefined ? diary.reactions.congrats : 0}
              </span>
              <span onClick={()=>handleReactionClick('excited')} style={{ 
                  backgroundColor: selectReaction.excited ? "#FF8200" : "white",
                  color: selectReaction.excited ? "white" : "#FF8200",
                  }} >
                <HandMetal size={16} /> 
                {diary.reactions && diary.reactions.excited !== undefined ? diary.reactions.excited : 0}
              </span>
              <span onClick={()=>handleReactionClick('together')} style={{ 
                  backgroundColor: selectReaction.together ? "#FF5A5A" : "white",
                  color: selectReaction.together ? "white" : "#FF5A5A",
                  }} >
                <HeartHandshake size={16} />
                {diary.reactions && diary.reactions.together !== undefined ? diary.reactions.together : 0}
              </span>
            </IconSpan>
          </ModalFooter>
        </ModalContainer>
    </ModalBackground>
  );
}

export default PublicDiaryOne;
