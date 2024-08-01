import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPrivateDiaryEntry } from "../../../api/privateDiary";
import { useNavigate } from "react-router-dom";
import background1 from "../../../assets/background/background_1.jpg";
import background2 from "../../../assets/background/background_2.jpg";
import background3 from "../../../assets/background/background_3.jpg";
import background4 from "../../../assets/background/background_4.jpg";
import background5 from "../../../assets/background/background_5.jpg";


const images = [
  background1, background2, background3, background4, background5
];


const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
  label {
    margin-right: 10px;
    font-size: 16px;
    color: #333;
  }
`;
const Select = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const DiaryWrapper = styled.div`

  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: wrap;
  box-sizing: border-box;
  overflow: hidden;
`;
const Book = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 20px;
  &:hover {
    background-color: #f9f9f9;
  }
  width: 100%;
  height: 25%;
  margin-bottom: -1px;
  box-sizing: border-box;
  border: 1px solid #ddd;

  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
  background-color: #fff;
  border-width: 1px 0;
  cursor: pointer;
`;
const BookIconWrapper = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const BookInfo = styled.div`
  margin-top: 8px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
  h3 {
    margin: 4px 0 0;
    font-size: 16px;
    color: #333;
    display: flex;
    justify-content: space-between;
  }
  .diary-body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    white-space: normal;
    font-size: 12px;
    color: #444444;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
`;
const DiaryContainer = styled.div`
  width: 100%;
  height: 80%; /* 원하는 높이로 설정 */
  box-sizing: border-box;
  overflow: auto;
`;
const DiaryFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
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
const PrivateDiary = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [privateDiary, setPrivateDiary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const diaryPerPage = 4;

  // 날짜 필터 날짜 고르기
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  // 일기 클릭시 이동
  const handleDiaryClick = (id) => {
    navigate(`/mypage/privateDiary/${id}`);
  };
  const fetchPrivateDiary = async () => {
    try {
      const response = await fetchPrivateDiaryEntry();
      setPrivateDiary(response);
    } catch (error) {
      console.error("일기 조회 오류", error);
    }
  };
  useEffect(() => {
    fetchPrivateDiary();
  }, []);

  // 날짜 필터링
  const filteredDiary = selectedDate
    ? privateDiary.filter((diary) => diary.date === selectedDate)
    : privateDiary;

  // 필터 칸에 들어갈 날짜
  const uniqueDates = [...new Set(privateDiary.map((diary) => diary.date))];

  // 칸 마다 몇 개의 diary가 들어갈지
  const indexOfLastPost = currentPage * diaryPerPage;
  const indexOfFirstPost = indexOfLastPost - diaryPerPage;
  const currentDiary = Array.isArray(privateDiary)
    ? filteredDiary.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  // 페이지네이션 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDiary.length / diaryPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Wrapper>
      <FilterWrapper>
        <label htmlFor="dateFilter">날짜 필터:</label>
        <Select
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="">전체</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </Select>
      </FilterWrapper>
      <DiaryContainer>
        <DiaryWrapper>
          {currentDiary.map((diary, index) => (
            <Book key={index} onClick={() => handleDiaryClick(diary.id)}>
              <BookIconWrapper>
                <img src={images[diary.id % images.length]} alt="Book cover" style={{ width: '100%', height: '100%'}} />
              </BookIconWrapper>
              <BookInfo>
                <h3>{diary.title} <p>{diary.date}</p></h3>
                
                <p className="diary-body">{diary.body}</p>
              </BookInfo>
            </Book>
          ))}
        </DiaryWrapper>
      </DiaryContainer>
      <DiaryFooter>
        {pageNumbers.map((number) => (
          <label
            key={number}
            className={`${currentPage === number ? "active" : ""}`}
          >
            <input
              type="checkbox"
              checked={currentPage === number}
              onChange={() => setCurrentPage(number)}
            />
            {number}
          </label>
        ))}
      </DiaryFooter>
    </Wrapper>
  );
};

export default PrivateDiary;
