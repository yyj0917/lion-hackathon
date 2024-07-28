import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    background-color: #FFE6E6;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    font-family: "Sunflower", sans-serif;

    &:hover {
        background-color: #FF5A5A;
    }
`;
const TextWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    gap: 10px;
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
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
      box-sizing: border-box;
      padding: 20px;
`;

const Matching = () => {
    const [isCounselor, setIsCounselor] = useState(false);
    const [isRecieveCounsel, setIsRecieveCounsel] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 뒤로가기 버튼을 누를 때 실행될 코드
        const handlePopState = () => {
          setIsCounselor(false);
          setIsRecieveCounsel(false);
        };
    
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);
    
      useEffect(() => {
        if (location.pathname === '/') {
          setIsCounselor(false);
          setIsRecieveCounsel(false);
        }
      }, [location]);
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
                              <Btn onClick={() => { navigate('/matching/counselor'); setIsCounselor(true); setIsRecieveCounsel(false); }}>지원하기</Btn>
                            </span>
                          </Box>
                          <Box>
                            <div>
                              <h2>Gate Keeper와 얘기하기</h2>
                              <p>어떻게 어떻게 하세요</p>
                            </div>
                            <span>
                              <Btn onClick={() => { navigate('/matching/recieve-counsel'); setIsCounselor(false); setIsRecieveCounsel(true); }}>요청하기</Btn>
                            </span>
                          </Box>
                        </IntroText>
                    </TextWrapper>
                    )}
                {isCounselor && <Outlet />}
                {isRecieveCounsel && <Outlet/>}
            </MatchingWrapper>
        );
    
}

export default Matching;
