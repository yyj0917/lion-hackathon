import { BookIcon } from 'lucide-react';
import React, { useState } from 'react';
import styled from 'styled-components';

const books = [
    { date: '2024-07-25', title: '일기 1' },
    { date: '2024-07-24', title: '일기 2' },
    { date: '2024-07-24', title: '일기 3' },
    { date: '2024-07-24', title: '일기 4' },
    { date: '2024-07-24', title: '일기 5' },
    { date: '2024-07-24', title: '일기 6' },
    { date: '2024-07-24', title: '일기 7' },
    { date: '2024-07-24', title: '일기 8' },

    // 더 많은 책 데이터를 추가
  ];
const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 20%;
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
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-template-rows: repeat(2, auto); /* 두 줄로 고정 */

    gap: 16px;
    padding: 20px;
    width: 100%;
    margin: auto;

`;
const Book = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    text-align: center;
    &:hover {
        transform: scale(1.05);
    }
`;
const BookInfo = styled.div`
    margin-top: 8px;
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
const PrivateDiary = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };
    
      const filteredBooks = selectedDate
        ? books.filter((book) => book.date === selectedDate)
        : books;
    
      const uniqueDates = [...new Set(books.map((book) => book.date))];
    return (
        <Wrapper>
            <FilterWrapper>
                <label htmlFor="dateFilter">날짜 필터:</label>
                <Select id="dateFilter" value={selectedDate} onChange={handleDateChange}>
                    <option value="">전체</option>
                    {uniqueDates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                    ))}
                </Select>
            </FilterWrapper>
            <DiaryContainer>

                <DiaryWrapper>
                    {filteredBooks.map((book, index) => (
                        <Book key={index}>
                            <BookIcon size={48}/>
                            <BookInfo>
                                <p>{book.date}</p>
                                <h3>{book.title}</h3>
                            </BookInfo>
                        </Book>
                    ))}
                </DiaryWrapper>
            </DiaryContainer>
        </Wrapper>
    );
}

export default PrivateDiary;
