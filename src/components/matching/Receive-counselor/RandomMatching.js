import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AlignJustify, IterationCcw } from 'lucide-react';
import GateKeeperCard from './GateKeeperCard';
import { RequestMatchingApi } from '../../../api/matching';

// styled-components 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const CategoryContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px;
`;

const CategoryButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;

  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? '#FFE6E6' : 'white')};
  color: ${(props) => (props.checked ? '#FF5A5A' : 'black')};
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
`;
const CheckInput = styled.input`
  display: none;

  &:checked + span {
    background-color: #ff5a5a;
    border: 2px solid white;
  }
  &:checked + span::after {
    background-color: #ff5a5a;
    transform: scale(1);
  }
`;
const Checkmark = styled.span`
  display: inline-block;
  width: 14.5px;
  height: 14.5px;
  margin-right: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 2px solid #ff5a5a;

  &::after {
    content: '';
    display: none;
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const ConfirmButton = styled.button`
  padding: 10px;
  margin-top: 40px;
  border: none;
  border-radius: 4px;
  width: 130px;
  height: 50px;
  cursor: pointer;
  background-color: #ff5a5a;
  color: white;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 18px;
  &:hover {
    transform: scale(1.08);
  }
`;

const FooterButton = styled.div`
  width: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  button {
    display: flex;
    align-items: center;
    border: 1px solid #007bff;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    width: 48%;
    padding: 5px;
    &:hover {
      background-color: #0056b3;
    }
    p {
      text-align: center;
      margin: 0;
      padding: 5px;
      font-size: 13px;
      font-weight: 800;
    }
  }
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #ff5a5a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;
const TextCard = styled.div`
  /* background-color: #f9f9f9; 배경색 */
  border: 1px solid #e0e0e0; /* 테두리 */
  display: flex;
  width: 80%;
  height: 20%;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; /* 글자 크기 */
    color: #333; /* 글자 색상 */
    margin: 0; /* 마진 제거 */
    line-height: 1.5; /* 줄 간격 */
  }
`;

function RandomMatching() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [matchGateKeeper, setMatchGateKeeper] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const categories = [
    { id: 'mental', name: 'mental' },
    { id: 'stress', name: 'stress' },
    { id: 'physical', name: 'physical' },
    { id: 'relationship', name: 'relationship' },
    { id: 'other', name: 'other' },
  ];


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    // 여기에서 랜덤 상담사 매칭 API 호출 로직을 추가합니다.
    try {
      console.log(selectedCategories);
      const res = await RequestMatchingApi(selectedCategories);
      setMatchGateKeeper(res);
      setLoading(true);
      setTimeout(() => {
      alert('제출이 완료되었습니다. 잠시만 기다려주세요. ');
      setLoading(false);
    }, 2000);
    } catch (error) {
    }
    // 임시 데이터로 랜덤 상담사를 설정합니다.
    
  };
  const handleRematching = () => {
    const confirm = window.confirm('다시 매칭하시겠습니까?');
    if (confirm) {
      setLoading(true);
      setTimeout(() => {
        alert('다시 매칭중입니다. 잠시만 기다려주세요. ');
        setLoading(false);
      }, 2000);
    } else {
      alert('매칭을 취소하였습니다.');
    }
  };

  const handleViewAll = () => {
    navigate('/matching/counselor-list');
  };

  return (
    <>
      {loading ? (
        <Wrapper>
          <Spinner />
        </Wrapper>
      ) : matchGateKeeper === null ? (
        // 카테고리 선택 UI
        <Wrapper>
          <TextCard>
            <p>
              ** Gate Keeper Matching **
              <br/>1. 상담을 받고 싶은 카테고리를 선택해주세요.
              <br/>2. 복수 선택이 가능하며, Gate Keeper와의 더 나은 매칭을 위한 정보입니다.
              <br/>3. Gate Keeper와 함께 많은 얘기를 나눠보세요.
            </p>
          </TextCard>
          <CategoryContainer>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                // checked={category.includes(category.id)}
              >
                <CheckInput
                  type="checkbox"
                  value={category.id}
                  // checked={category.includes(category.id)}
                  onChange={handleCategoryChange}
                  style={{ marginRight: '10px' }}
                />
                <Checkmark />
                {category.name}
              </CategoryButton>
            ))}
          </CategoryContainer>
          <ConfirmButton onClick={handleConfirm}>제출하기</ConfirmButton>
        </Wrapper>
      ) : (
        // 상담사 정보 및 전체보기 버튼
        <Wrapper>
          <GateKeeperCard key={matchGateKeeper.id} gatekeeper={matchGateKeeper}>
          </GateKeeperCard>
          <FooterButton>
            <button className="rematching" onClick={handleRematching}>
              <IterationCcw />
              <p>다시 매칭하기</p>
            </button>
            <button className="viewAll" onClick={handleViewAll}>
              <AlignJustify />
              <p>전체 상담사리스트</p>
            </button>
          </FooterButton>
        </Wrapper>
      )}
    </>
  );
}

export default RandomMatching;
