import {
  Award,
  CircleUserRound,
  MessageSquareText,
  SquareMousePointer,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tooltip from '../../../utils/Tooltip';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  gap: 40px;
`;
const CardWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 15px;
  border: 3px solid #f5af19;
  /* overflow: hidden; */
  color: #616161;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 20px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.2),
      0 16px 40px rgba(0, 0, 0, 0.2);
  }
`;
const CardHeader = styled.div`
  height: 200px;
  width: 100%;
  /* background: red; */
  border-bottom: 3px solid #f5af19;
  display: grid;
  place-items: center;
  /* background: linear-gradient(to bottom left, #f12711, #f5af19); */
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 80%;
  margin: 0 auto;
  height: auto;
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 20px;
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  p {
    text-align: center;
    font-size: 12px;
    /* margin-bottom: 20px; */
  }
  button {
    border: none;
    border-radius: 100px;
    padding: 5px 30px;
    color: #fff;
    margin-bottom: 15px;
    text-transform: uppercase;
    background: linear-gradient(to left, #f12711, #f5af19);
  }
`;
const Intro = styled.div`
  display: flex;
  justify-content: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  p {
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }
`;
const Others = styled.div`
  display: flex;
  gap: 10px;
  button {
    border-radius: 8px;
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
  }
`;
// PropType 정의

export default function GateKeeperCard({ gatekeeper }) {
  const [matchGateKeeper, setMatchGateKeeper] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const showTooltip = (text) => {
    setTooltip(text);
  };

  const hideTooltip = () => setTooltip(null);
  useEffect(() => {
    setMatchGateKeeper(gatekeeper.matched_advisor);
  }, []);
  // 백에서 랜덤매칭된 게이트 키퍼 정보 받아오기

  return (
    <Container>
      <CardWrapper
        onMouseEnter={() =>
          showTooltip(`${matchGateKeeper?.openlink} 이동하기`)
        }
        onMouseLeave={hideTooltip}
        onClick={()=>window.open(`${matchGateKeeper?.openlink}`)}
      >
        <CardHeader>
          <CircleUserRound size={100} color="#f5af19" />
        </CardHeader>
        <CardContent>
          <Intro>
            <h3>
              {matchGateKeeper?.advisor_name} ({matchGateKeeper?.age}){' '}
              <SquareMousePointer strokeWidth="3" color="#FF8200" />
            </h3>
          </Intro>
          <Info>
            <p>
              <Award />
              {matchGateKeeper?.work_experience}년 / {matchGateKeeper?.workIn}
            </p>
            <p>
              <MessageSquareText />
              {matchGateKeeper?.giveTalk}
            </p>
          </Info>
          <Others>
            <button>{matchGateKeeper?.categories}</button>
          </Others>
        </CardContent>
        {tooltip === `${matchGateKeeper?.openlink} 이동하기` && (
          <Tooltip text={`${matchGateKeeper?.openlink} 이동하기`} />
        )}
      </CardWrapper>
    </Container>
  );
}
GateKeeperCard.propTypes = {
  gatekeeper: PropTypes.arrayOf(PropTypes.string).isRequired,
};
