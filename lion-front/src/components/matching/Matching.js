import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Counselor from './Counselor';
import RecieveCounselor from './ReceiveCounselor';

const Wrapper = styled.div`
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
        
            <Wrapper>
                {!isCounselor && !isRecieveCounsel && (
                    <>
                        <Btn onClick={() => { navigate('/counselor'); setIsCounselor(true); setIsRecieveCounsel(false); }}>Counselor</Btn>
                        <Btn onClick={() => { navigate('/recieve-counsel'); setIsCounselor(false); setIsRecieveCounsel(true); }}>Receive Counsel</Btn>
                    </>
                    )}
                {isCounselor && <Outlet />}
                {isRecieveCounsel && <Outlet/>}
            </Wrapper>
        );
    
}

export default Matching;
