import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled, { keyframes } from 'styled-components';

Chart.register(...registerables);
// const data = [
//     { positive: 40, negative: 30, neutral: 30 },
//     { positive: 50, negative: 20, neutral: 30 },
//     { positive: 60, negative: 10, neutral: 30 },
//     { positive: 30, negative: 50, neutral: 20 },
//     { positive: 70, negative: 20, neutral: 10 },
//     { positive: 40, negative: 30, neutral: 30 },
//     { positive: 50, negative: 30, neutral: 20 },
// ];
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const data = [
  {
    day: '월',
    positive: 40,
    negative: 30,
    neutral: 30,
  },
  {
    day: '화',
    positive: 50,
    negative: 20,
    neutral: 30,
  },
  {
    day: '수',
    positive: 60,
    negative: 10,
    neutral: 30,
  },
  {
    day: '목',
    positive: 30,
    negative: 50,
    neutral: 20,
  },
  {
    day: '금',
    positive: 70,
    negative: 20,
    neutral: 10,
  },
  {
    day: '토',
    positive: 40,
    negative: 30,
    neutral: 30,
  },
  {
    day: '일',
    positive: 50,
    negative: 30,
    neutral: 20,
  },
];
const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  gap: 15px;
`;
const Header = styled.div`
  width: 80%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
   button {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    /* background-color: #FF5A5A;
    color: white; */
    border: none;
    border-radius: 8px;
    height: 30px;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    transition: 0.3s ease-in-out;
   }
`;
const BarWrapper = styled.div`
  width: 80%;
  height: 30%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
  `;
const Footer = styled.div`
  width: 80%;
  height: 35%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
  }
`;
function SentimentResult() {
  const [isChecked, setIsChecked] = useState(true);
  const handleAllCheck = () => {
    setIsChecked(true);
  }
  const handleHighlightCheck = () => {
    setIsChecked(false);
  }
  const chartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '긍정',
        data: data.map((day) => day.positive),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '부정',
        data: data.map((day) => day.negative),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '중립',
        data: data.map((day) => day.neutral),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Wrapper>
      <Header delay={0.5}>
        {/* <label>
          <button onClick={handleAllCheck} style={{ 
            backgroundColor: isChecked ? '#FF5A5A' : 'whitesmoke',
            color: isChecked ? 'white' : 'black' 
            }}>전체 분석결과</button>
        </label>
        <label>
          <button onClick={handleHighlightCheck} style={{ 
            backgroundColor: isChecked ? 'whitesmoke' : '#FF5A5A',
            color: isChecked ? 'black' : 'white' 
 
            }}>하이라이트 분석결과</button>
        </label> */}
        <p>윤영준 님, 최근 30일동안의 기록을 감정분석한 결과는 "긍정"입니다.</p>
      </Header>
      <BarWrapper delay={1.5}>
        {isChecked ? (
          <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: false,
              },
              y: {
                stacked: false,
                beginAtZero: true,
              },
            },
          }}
        />
        ) : (
          <h1>하이라이트 분석결과</h1>
        )}
        
      </BarWrapper>
      <Footer delay={2.5}>
        <h1>Footer</h1>
      </Footer>
    </Wrapper>
  );
}

export default SentimentResult;
