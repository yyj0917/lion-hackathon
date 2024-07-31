import { BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPrivateDiaryEntry } from "../../../api/privateDiary";
import { useNavigate } from "react-router-dom";


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
  width: 40%;
`;
const BookInfo = styled.div`
  margin-top: 8px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
  h3 {
    margin: 4px 0 0;
    font-size: 16px;
    color: #333;
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

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
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
                <BookOpen size={100} strokeWidth={1} />
              </BookIconWrapper>
              <BookInfo>
                <p>{diary.date}</p>
                <h3>{diary.title}</h3>
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
