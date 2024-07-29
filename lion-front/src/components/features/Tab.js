// src/components/Tabs.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PublicDiary from '../diary/PublicDiary';
import Matching from '../matching/Matching';
import {Outlet, useLocation, useNavigate } from 'react-router-dom';
import SharedDiary from '../diary/SharedDiary';
import WritePost from '../diary/WritePublicDiary';
import Posts from '../diary/Posts';


const TabContainer = styled.div`
  display: flex;
  background-color: whitesmoke;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  width: 70%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RadioInput = styled.input`
  display: none;

  &:checked + label {
    color: white;
  }

  &:checked + label + div {
    left: ${({ index }) => `calc(${index * 100}% / 2)`};
  }
`;

const TabLabel = styled.label`
  flex: 1;
  padding: 15px 20px;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color 0.5s ease;

  &:hover {
    background-color: rgba(1, 0, 0, 0.01);
  }
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 2);
  height: 100%;
  background-color: #FF5A5A	;
  border-radius: 25px;
  transition: left 0.3s ease;
  z-index: 0;
`;

const TabContent = styled.div`
  width: 80%;
  height: 85%;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: aliceblue; */
`;
// const TabFilter = styled.div`
//   padding: 20px;
//   text-align: center;
//   input {
//     width: 80%;
//     padding: 10px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 20px;
//     outline: none;
//   }
// `;
const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveIndex(0);
    } else if (location.pathname === '/matching') {
      setActiveIndex(1);
    }

  }, [location]);

  return (
    <>
      <TabContainer>
        <RadioInput
          type="radio"
          id="tab1"
          name="tab"
          checked={activeIndex === 0}
          onChange={() => {
            setActiveIndex(0);
            navigate('/');
          }}
          // onClick={navigate('/')}
        />
        <TabLabel htmlFor="tab1">공유 일기</TabLabel>
        <ActiveTabIndicator style={{ left: `calc(${activeIndex * 100}% / 2)` }} />

        <RadioInput
          type="radio"
          id="tab2"
          name="tab"
          checked={activeIndex === 1}
          onChange={() => {
            setActiveIndex(1);
            navigate('/matching');
          }}
        />
        <TabLabel htmlFor="tab2">동료 매칭</TabLabel>
      </TabContainer>
      <TabContent>
        <Outlet/>
      </TabContent>
    </>
  );
};

export default Tabs;
