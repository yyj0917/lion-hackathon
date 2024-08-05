import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled, { keyframes } from 'styled-components';
import { fetchPrivateDiaryAnalysis } from '../../api/privateDiary';

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
  justify-content: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  gap: 20px;
  box-sizing: border-box;
  padding: 20px;
`;
const Header = styled.div`
  width: 80%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  gap: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
  p {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }
`;
const Content = styled.div`
  width: calc(80% + 30px);
  display: flex;
  height: 30%;
  justify-content: center;
  gap: 10px;

`;
const BarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
`;
const Footer = styled.div`
  width: 80%;
  height: 35%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
  padding: 30px;
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
  }
`;
function SentimentResult() {
  // const [isChecked, setIsChecked] = useState(true);
  const [result, setResult] = useState('긍정');
  useEffect(() => {
    const fetchSentiment = async () => {
      try {

        const response = await fetchPrivateDiaryAnalysis();
        console.log(response)
      } catch (error) {
        console.error('감정분석 오류', error);
      }
    };
    fetchSentiment();
  }, []);
  let message;
  switch (result) {
    case '긍정':
      message = '긍정';
      break;
    case '부정':
      message = '부정';
      break;
    case '중립':
      message = '중립';
      break;
  }
  const chartData = {
    labels: ['30일동안 전체 감정분석'],
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
        <p>윤영준 님, 최근 30일동안의 기록을 감정분석한 결과는 "{result}"입니다.</p>
      </Header>
      <Content>
        <BarWrapper delay={1.5}>
          <Bar style={{
            width: '100%',
            height: '100%',
          }}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
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
        </BarWrapper>
        <BarWrapper delay={1.5}>
          <Bar style={{
            width: '100%',
            height: '100%',
          }}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
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
        </BarWrapper>     
      </Content>
      <Footer delay={2.5}>
        <h1>{message}</h1>
      </Footer>
    </Wrapper>
  );
}

export default SentimentResult;
