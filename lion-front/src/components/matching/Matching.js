import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../../redux/reducers/authReducer';

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
  overflow: auto;
`;
const Btn = styled.button`
  width: 20%;
  height: 100%;
  background-color: #ffe6e6;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  font-family: 'Sunflower', sans-serif;

  &:hover {
    background-color: #ff5a5a;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  gap: 10px;
  padding: 20px;
`;
const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  gap: 20px;
  font-family: 'Lato', sans-serif;
  div {
    width: 100%;
    height: 80%;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 10px 0;
    color: #333;
  }
  p {
    font-size: 16px;
    font-weight: normal;
    margin: 10px 0 20px 0;
    color: #666;
    line-height: 1.6;
  }
  span {
    display: flex;
    width: 100%;
    height: 20%;
    justify-content: end;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 20px;
  h2 {
    width: auto;
    border-bottom: 3px solid #f5f5f5;
    margin-bottom: 10px;
  }
`;

function Matching() {
  const [isCounselor, setIsCounselor] = useState(false);
  const [isRecieveCounsel, setIsRecieveCounsel] = useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleCounselorClick = () => {
    if (isAuth) {
      setIsCounselor(true);
      setIsRecieveCounsel(false);
      navigate('/matching/counselor');
    } else {
      alert('로그인 후 이용해주세요.');
      navigate('/login'); // 로그인 페이지로 리디렉트
    }
  };

  const handleRecieveCounselClick = () => {
    if (isAuth) {
      setIsCounselor(false);
      setIsRecieveCounsel(true);
      navigate('/matching/randomMatching');
    } else {
      alert('로그인 후 이용해주세요.');
      navigate('/login'); // 로그인 페이지로 리디렉트
    }
  };

  return (
    <MatchingWrapper>
      {!isCounselor && !isRecieveCounsel && (
        <TextWrapper>
          <IntroText>
            <Box>
              <div>
                <h2>Gate Keeper로 지원하기</h2>
                <p>Gate Keeper는 주변을 도와주는 사람입니다. <br/> FORHERO에서 동료 소방관을 위한 Gate Keeper가 되어 도움이 필요한 동료에게 다가가 힘이 되어주세요.</p>
              </div>
              <span>
                <Btn onClick={handleCounselorClick}>지원하기</Btn>
              </span>
            </Box>
            <Box>
              <div>
                <h2>Gate Keeper와 얘기하기</h2>
                <p>동료를 위한 Gate Keeper들이 기다리고 있습니다. <br/> 평소 고민이나 어려움이 있다면 가장 먼저 동료 Gate Keeper와 함께 해결해보세요.</p>
              </div>
              <span>
                <Btn onClick={handleRecieveCounselClick}>요청하기</Btn>
              </span>
            </Box>
          </IntroText>
        </TextWrapper>
      )}
      {isCounselor && <Outlet />}
      {isRecieveCounsel && <Outlet />}
    </MatchingWrapper>
  );
}

export default Matching;
