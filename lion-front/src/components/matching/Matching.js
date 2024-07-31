import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../../utils/auth";

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
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
  font-family: "Sunflower", sans-serif;

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
  font-family: "Sunflower", sans-serif;
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
`;

const Matching = () => {
  const [isCounselor, setIsCounselor] = useState(false);
  const [isRecieveCounsel, setIsRecieveCounsel] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCounselorClick = () => {
    if (isAuthenticated()) {
      setIsCounselor(true);
      setIsRecieveCounsel(false);
      navigate("/matching/counselor");
    } else {
      alert("로그인 후 다시 시도해주세요.");
      navigate("/login"); // 로그인 페이지로 리디렉트
    }
  };

  const handleRecieveCounselClick = () => {
    if (isAuthenticated()) {
      setIsCounselor(false);
      setIsRecieveCounsel(true);
      navigate("/matching/randomMatching");
    } else {
      alert("로그인 후 다시 시도해주세요.");
      navigate("/login"); // 로그인 페이지로 리디렉트
    }
  };

  return (
    <MatchingWrapper>
      {!isCounselor && !isRecieveCounsel && (
        <TextWrapper>
          <IntroText>
            <Box>
              <div>
                <h2>Gate Keeper가 되는 방법</h2>
                <p>어떻게어떻게 하세요</p>
              </div>
              <span>
                <Btn onClick={handleCounselorClick}>지원하기</Btn>
              </span>
            </Box>
            <Box>
              <div>
                <h2>Gate Keeper와 얘기하기</h2>
                <p>어떻게 어떻게 하세요</p>
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
};

export default Matching;
