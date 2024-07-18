// src/components/Tabs.js
import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  background-color: whitesmoke;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  width: 80%;
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
  margin-top: 20px;
`;

const Tabs = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
      <TabContainer>
        <RadioInput
          type="radio"
          id="tab1"
          name="tab"
          checked={activeIndex === 0}
          onChange={() => setActiveIndex(0)}
        />
        <TabLabel htmlFor="tab1">나의 하루 기록</TabLabel>
        <ActiveTabIndicator style={{ left: `calc(${activeIndex * 100}% / 2)` }} />

        <RadioInput
          type="radio"
          id="tab2"
          name="tab"
          checked={activeIndex === 1}
          onChange={() => setActiveIndex(1)}
        />
        <TabLabel htmlFor="tab2">동료 매칭 상담</TabLabel>
      </TabContainer>
      <TabContent>
        {activeIndex === 0 && <div>나의 하루 기록</div>}
        {activeIndex === 1 && <div>동료 매칭 상담</div>}
      </TabContent>
    </>
  );
};

export default Tabs;
