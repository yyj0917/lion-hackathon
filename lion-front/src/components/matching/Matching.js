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
    width: 80%;
    height: 20%;
    background-color: #FFE6E6;
    border: 1px solid #f5f5f5;
    border-radius: 50px;
    margin: 10px;
    font-size: 15px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
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
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    width: 70%;
    margin-left: 5px;

`;
const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-right: 5px;
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
                          <h2>상담사로 지원</h2>
                          <p>어떻게어떻게 하세요</p>
                          <h2>상담받는 사람으로 지원</h2>
                          <p>어떻게 어떻게 하세요</p>
                        </IntroText>
                        <BtnWrapper>
                            <Btn onClick={() => { navigate('/matching/counselor'); setIsCounselor(true); setIsRecieveCounsel(false); }}>Counselor</Btn>
                            <Btn onClick={() => { navigate('/matching/recieve-counsel'); setIsCounselor(false); setIsRecieveCounsel(true); }}>Receive Counsel</Btn>
                          </BtnWrapper>
                    </TextWrapper>
                    )}
                {isCounselor && <Outlet />}
                {isRecieveCounsel && <Outlet/>}
            </MatchingWrapper>
        );
    
}

export default Matching;
