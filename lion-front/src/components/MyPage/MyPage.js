import {
  BarChart4,
  Laugh,
  Notebook,
  SquarePen,
  SquareUser,
} from 'lucide-react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/auth';

const Wrapper = styled.div`
  width: 70%;
  margin-left: 5px;
  /* height: 740px; */
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  height: 100%;
  position: relative;
`;
const Navbar = styled.div`
  width: 30%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-right: 2px solid #f7f7f7;
`;
const Contents = styled.div`
  margin-left: 5px;
  width: 75%;
  height: 100%;
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: rgba(220, 220, 220, 0.3); */

  position: relative;
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .profile-text {
    display: flex;
    align-items: center; /* 세로 정렬 */
    font-size: 16px;
    line-height: 1.5;
  }
  p {
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: 'Dongle', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
  }
`;
const IconWrapper = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    cursor: pointer;
    position: relative;
    font-family: 'Dongle', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    width: 100px;
    height: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: start;
    color: #f44336;
    gap: 5px;
    &:hover {
      background-color: #f7f7f7;
    }
  }
`;
export default function MyPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // 유저 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUser(response);
    } catch (error) {
      console.log('Error message', error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Wrapper>
      <Navbar>
        <ImgWrapper>
          <SquareUser color="#FF5A5A" strokeWidth={1} size={100} />
          <div className="profile-text">
            <p>
              {user.name}({user.age})/ {user.username}
              <br /> {user.office} / {user.position}
              <br /> {user.phonenumber}
            </p>
          </div>
        </ImgWrapper>
        <IconWrapper>
          <p onClick={() => navigate('/mypage/privateDiary')}>
            <Notebook /> Diary
          </p>
          <p onClick={() => navigate('/mypage/sentiment')}>
            <Laugh /> Feel
          </p>
          <p onClick={() => navigate('/mypage/sentimentResult')}>
            <BarChart4 /> Analyze
          </p>
          <p onClick={() => navigate('/mypage/writePrivateDiary')}>
            <SquarePen /> Write
          </p>
        </IconWrapper>
      </Navbar>
      <Contents>
        <Outlet />
      </Contents>
    </Wrapper>
  );
}
