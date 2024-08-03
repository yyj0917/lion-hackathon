// RecieveCounsel.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Award, CircleUserRound, MessageSquareText } from 'lucide-react';
import CategorySidebar from './CategorySideBar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;
const ListWrapper = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  gap: 5px;
  a {
    position: relative;
    box-sizing: border-box;
    height: 23%;
    display: flex;
    background-color: #fff;
    border: 1px solid #f5af19;
    border-radius: 10px;
    padding: 10px;
    text-decoration: none;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;
const ListFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px 0;
  label {
    margin: 0 5px;
    color: black;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 20px;
    width: 20px;
    text-align: center;
    height: auto;
  }
  .active {
    background-color: #ff5a5a;
    color: #fff;
  }
  label input {
    display: none;

    &:checked + span {
      font-weight: bold;
      text-decoration: underline;
    }
  }
  label span {
    padding: 5px;
  }
`;
const Icon = styled.div`
  width: 40%;
  /* background: red; */
  border-radius: 20px;
  display: grid;
  place-items: center;
  /* background: linear-gradient(to bottom left, #f12711, #f5af19); */
  span {
    font-size: 12px;
    padding: 5px 10px;
    font-weight: 700;
    color: #f5af19;
    text-transform: uppercase;
    font-family: 'Sunflower', sans-serif;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;
const TextSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin: 5px;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  p {
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 5px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    gap: 5px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
`;
function RecieveCounselor() {
  const [selectedCategories, setSelectedCategories] = useState(['전체']);
  const [openChatRooms, setOpenChatRooms] = useState([
    {
      id: 1,
      name: '홍길동',
      age: 30,
      workplace: '서울시청',
      comment: '항상 응원합니다!',
      link: 'https://open.kakao.com/o/sdEKmaEg',
      category: '정신건강',
    },
    {
      id: 2,
      name: '김철수',
      age: 28,
      workplace: '부산지검',
      comment: '힘내세요!',
      link: 'https://open.kakao.com/o/gFkGj9Cd',
      category: '직업적 스트레스',
    },
    {
      id: 3,
      name: '이영희',
      age: 35,
      workplace: '삼성전자',
      comment: '할 수 있습니다!',
      link: 'https://open.kakao.com/o/gTkGj9Cd',
      category: '직업적 스트레스',
    },
    {
      id: 4,
      name: '박지수',
      age: 27,
      workplace: '네이버',
      comment: '당신을 응원합니다!',
      link: 'https://open.kakao.com/o/gHkGj9Cd',
      category: '정신건강',
    },
    {
      id: 5,
      name: '김영미',
      age: 32,
      workplace: 'LG전자',
      comment: '잘하고 있어요!',
      link: 'https://open.kakao.com/o/gQkGj9Cd',
      category: '대인관계',
    },
    {
      id: 6,
      name: '최민호',
      age: 29,
      workplace: '카카오',
      comment: '응원합니다!',
      link: 'https://open.kakao.com/o/gPkGj9Cd',
      category: '신체건강',
    },
    {
      id: 7,
      name: '장철수',
      age: 33,
      workplace: '현대차',
      comment: '화이팅!',
      link: 'https://open.kakao.com/o/gOkGj9Cd',
      category: '신체건강',
    },
    {
      id: 8,
      name: '박민지',
      age: 26,
      workplace: '기아차',
      comment: '힘내세요!',
      link: 'https://open.kakao.com/o/gNkGj9Cd',
      category: '기타',
    },
    // 더 많은 오픈채팅방 데이터를 여기에 추가할 수 있습니다.
  ]);
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategories([value]);
  };
  const filteredRooms = selectedCategories.includes('전체')
    ? openChatRooms
    : openChatRooms.filter((room) =>
        selectedCategories.includes(room.category)
      );
  const [currentPage, setCurrentPage] = useState(1);
  const chatPerPage = 4;
  const indexOfLastPost = currentPage * chatPerPage;
  const indexOfFirstPost = indexOfLastPost - chatPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지네이션 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRooms.length / chatPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Wrapper>
      <CategorySidebar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <CardList>
        <ListWrapper>
          {currentRooms.map((room) => (
            <Link
              key={room.id}
              to={room.link}
              className="chatroom-card"
              target="_blank"
              rel=""
            >
              <Icon>
                <CircleUserRound size={70} color="#f5af19" />
                <span>카테고리</span>
              </Icon>
              <TextSpace>
                <h3>
                  {room.name} ({room.age})
                </h3>
                <Info>
                  <p>
                    <Award size={12} />
                    5년 / 소방교/ 서울소방청
                  </p>
                  <p>
                    <MessageSquareText size={12} />
                    {room.comment}
                  </p>
                </Info>
              </TextSpace>
            </Link>
          ))}
        </ListWrapper>
        <ListFooter>
          {pageNumbers.map((number) => (
            <label
              key={number}
              className={`${currentPage === number ? 'active' : ''}`}
            >
              <input
                type="checkbox"
                checked={currentPage === number}
                onChange={() => setCurrentPage(number)}
              />
              {number}
            </label>
          ))}
        </ListFooter>
      </CardList>
    </Wrapper>
  );
}

export default RecieveCounselor;
