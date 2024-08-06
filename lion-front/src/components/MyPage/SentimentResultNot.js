import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled, { keyframes } from 'styled-components';
import { fetchPrivateDiaryAnalysis } from '../../api/privateDiary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSentimentResult } from '../../redux/reducers/sentimentSlice';

Chart.register(...registerables);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Spinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #FF5A5A; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 2s linear infinite;
  margin: 30px auto;
`;
const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #ff5a5a;
  text-align: center;

  h1 {
    font-size: 4em;
  }

  p {
    font-size: 1.5em;
  }

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 1.2em;
    margin-top: 20px;
  }
`;
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
const BarWrapper = styled.div`
  width: calc(80% + 30px);
  height: 30%;
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
  display: flex;
  justify-content: center;
    align-items: center;
  p {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
`;
const Positive = () => {
  return (
    <p>최근 30일동안의 기록에 대한 결과가 "긍정"입니다. 힘들고 어려운 하루가 있음에도 늘 긍정을 잃지 않는 윤영준님은 최고의 소방관이자 사람입니다. 앞으로도 긍정으로 가득찬 하루를 보내고, 항상 좋은 일만 있기를 FORHERO는 응원하겠습니다. 다른 동료에게 긍정적인 기운을 나눠주고 싶다면 Gate Keeper에 지원하세요.</p>
  )
}
const Negative = () => {
  return (
    <>
      <p>최근 30일동안의 기록에 대한 결과는 "부정"입니다. 하지만 당신의 하루, 1주, 30일은 그 무엇보다 가치있습니다. 가끔 힘들고, 지친 하루를 마주할 때 한 발자국 물러나 새로운 시간을 가져보는 것은 어떨까요?
        <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
            <a href="https://www.mindcafe.co.kr/">전문가와 얘기하기</a>
            <a href="/matching/randomMatching">FORHERO Gate Keeper와 얘기하기</a>
        </div>
         </p>
    </>
  )
}
const Neutral = () => {
  return (
    <>
      <p>최근 30일 동안의 기록에 대한 결과는 “중립” 입니다. 소방관님의 현재 심리 상태는 큰 변화 없이 안정적으로 유지되는 바람직한 상태입니다. 당신의 하루에 감사하며 긍정적인 에너지로 가득찬 하루를 보내보는 것은 어떨까요? FORHERO는 앞으로도 소방관님의 건강하고 안전한 근무를 기원합니다. </p>
    </>
  )
}

function SentimentResult() {
  const [result, setResult] = useState('긍정');
  const [analysisResult, setAnalysisResult] = useState(null);
  const { data, loading, error } = useSelector((state) => state.sentiment);


  useEffect(() => {
    const fetchResult = async () => {
        try {
          const response = await fetchPrivateDiaryAnalysis();
          setAnalysisResult(response.average_sentiment);
        } catch (error) {
          console.error('감정분석 결과 오류', error);
        }
      }
    fetchResult();
    if (analysisResult?.avg_positive >= analysisResult?.avg_negative && analysisResult?.avg_positive >= analysisResult?.avg_neutral) {
        setResult('긍정');
      } else if (analysisResult?.avg_negative >= analysisResult?.avg_positive && analysisResult?.avg_negative >= analysisResult?.avg_neutral) {
        setResult('부정');
      } else {
        setResult('중립');
      }
  }, [data, loading, error]);

  if (loading) {
    return (
      <Wrapper>
        <Spinner />
        <p style={{fontWeight: '700'}}>최근 30일동안의 기록을 감정분석중입니다. 잠시만 기다려주세요.</p>
      </Wrapper>
      );
  } else if (error) {
    return (
      <ErrorPage>
        <h1>404</h1>
        <p>Error loading sentiment results</p>
        <a href="/">Go back to homepage</a>
      </ErrorPage>
    );
  }
  const chartData = {
    labels: ['30일동안 전체 감정분석'],
    datasets: [
      {
        label: '긍정',
        data: [analysisResult?.avg_positive],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '부정',
        data: [analysisResult?.avg_negative],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '중립',
        data: [analysisResult?.avg_neutral],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <Wrapper>
      <Header delay={0.5}>
        <p>귀하의 최근 30일동안 기록을 감정분석한 결과는 "{result}"입니다.</p>
      </Header>
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
      <Footer delay={2.5}>
        {(result === '긍정') && <Positive />}
        {(result === '부정') && <Negative />}
        {(result === '중립') && <Neutral />}
      </Footer>
    </Wrapper>
  );
}

export default SentimentResult;
