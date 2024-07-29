// RecieveCounsel.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import kakao from '../../assets/kakaotalk.jpg';
import profile from '../../assets/firefighterProfile.png';
import CategorySidebar from './CategorySideBar';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
const ListWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 처음에 4개의 요소가 꽉 차게 */
    grid-auto-rows: minmax(150px, auto); /* 각 행의 높이 */    
    gap: 20px;
    /* overflow-y: auto; 세로 스크롤 가능하게 설정 */
    a {
        position: relative;
        display: block;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 15px;
        text-decoration: none;
        color: #333;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        h3 {
            margin: 0 0 10px;
            font-size: 18px;
        }
        p {
            margin: 5px 0;
            font-size: 14px;
        }
        .icon-container {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            span {
                font-size: 14px;
                color: #3B5998; /* 카카오톡 아이콘 색상 */
            }
            img {
            width: 30px;
            border-radius: 50%;
            }   
        }
        .icon-profile {
            position: absolute;
            bottom: 10px;
            right: 10px;
            img {
            width: 50px;
            border-radius: 50%;
            }   
        }
    }
`;
const ListFooter = styled.div`
    
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    padding: 10px 0;
    /* background-color: aliceblue; */
    /* background: #ffffff; */
    label {
        margin: 0 5px;
        color: black;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        cursor: pointer;
        border-radius: 20px;
        width: 20px;
        text-align: center;
        height: auto;

    }
    .active {
        background-color: #FF5A5A;
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
const CardList = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;

`;
const RecieveCounselor = () => {
    const [selectedCategories, setSelectedCategories] = useState(['전체']);
    const [openChatRooms, setOpenChatRooms] = useState([
        { id: 1, name: '홍길동', age: 30, workplace: '서울시청', comment: '항상 응원합니다!', link: 'https://open.kakao.com/o/sdEKmaEg', category: '정신건강' },
        { id: 2, name: '김철수', age: 28, workplace: '부산지검', comment: '힘내세요!', link: 'https://open.kakao.com/o/gFkGj9Cd', category: '직업적 스트레스' },
        { id: 3, name: '이영희', age: 35, workplace: '삼성전자', comment: '할 수 있습니다!', link: 'https://open.kakao.com/o/gTkGj9Cd', category: '직업적 스트레스' },
        { id: 4, name: '박지수', age: 27, workplace: '네이버', comment: '당신을 응원합니다!', link: 'https://open.kakao.com/o/gHkGj9Cd', category: '정신건강' },
        { id: 5, name: '김영미', age: 32, workplace: 'LG전자', comment: '잘하고 있어요!', link: 'https://open.kakao.com/o/gQkGj9Cd', category: '대인관계' },
        { id: 6, name: '최민호', age: 29, workplace: '카카오', comment: '응원합니다!', link: 'https://open.kakao.com/o/gPkGj9Cd', category: '신체건강' },
        { id: 7, name: '장철수', age: 33, workplace: '현대차', comment: '화이팅!', link: 'https://open.kakao.com/o/gOkGj9Cd', category: '신체건강' },
        { id: 8, name: '박민지', age: 26, workplace: '기아차', comment: '힘내세요!', link: 'https://open.kakao.com/o/gNkGj9Cd', category: '기타' },
    // 더 많은 오픈채팅방 데이터를 여기에 추가할 수 있습니다.
      ]);
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setSelectedCategories([value]);
  };
    const filteredRooms = selectedCategories.includes('전체')
        ? openChatRooms
        : openChatRooms.filter(room => selectedCategories.includes(room.category));
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
            <CategorySidebar selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
            <CardList>
                <ListWrapper>
                    {currentRooms.map(room => (
                        <Link key={room.id} to={room.link} className="chatroom-card" target="_blank" rel="">
                            <div className="icon-container">
                                <img src={kakao} alt='kakaologo' style={{
                                    borderRadius: '50%',
                                }}/>
                                <span>openchat</span>
                            </div>
                            <h3>{room.name}</h3>
                            <p>나이: {room.age}</p>
                            <p>근무지: {room.workplace}</p>
                            <p>한마디: {room.comment}</p>
                            <div className='icon-profile'>
                                <img src={profile} alt="profile"/>
                            </div>
                        </Link>
                        ))}
                </ListWrapper>
                <ListFooter>
                    {pageNumbers.map(number => (
                                    <label key={number} className={`${currentPage === number ? 'active' : ''}`}>
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
    )
}

export default RecieveCounselor;

