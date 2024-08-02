import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;
const Header = styled.div`
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
  }
`;
const Footer = styled.div`
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #333;
  }
`;
function SentimentResult() {
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
      <Header>
        <h1>Sentiment Result</h1>
      </Header>
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
      <Footer>
        <h1>Footer</h1>
      </Footer>
    </Wrapper>
  );
}

export default SentimentResult;
