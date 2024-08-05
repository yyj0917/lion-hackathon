import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import redlogo from '../../assets/redlogo.png';
import { logoutApi } from '../../api/auth';
import SignINUPBtn from './SignBtn';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, logout, setAuth } from '../../redux/reducers/authReducer';

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin-left: 5px;
  img {
    width: 70px;
    height: 55px;
    cursor: pointer;
  }
`;

const Auth = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #f44336;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #f06e6e; /* 로고 텍스트 색상 */
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 텍스트 그림자 효과 */
  cursor: pointer;
`;
const LogoutBtn = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 10px;
  border: white;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 0, 0, 0.5);
  }
  text-align: center;
  margin: 5px;
  font-size: 17px;
`;
const MyPageBtn = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 10px;
  border: white;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 0, 0, 0.5);
  }
  text-align: center;
  margin: 5px;
  font-size: 17px;
`;

export default function MainHeader() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  // Home Route
  const handleRouteHome = () => {
    navigate('/', { replace: true });
  };
  // Logout
  const handleLogout = async () => {
    try {
      await logoutApi();
      alert('로그아웃 되었습니다.');
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  // MyPage Route
  const handleMyPage = () => {
    navigate('/mypage');
  };
  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '5px',
        }}
        onClick={handleRouteHome}
      >
        <img src={redlogo} alt="logo" />
        <LogoText>FORHERO</LogoText>
      </div>
      <Auth>
        {!isAuth ? (
          <SignINUPBtn />
        ) : (
          <>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            <MyPageBtn onClick={handleMyPage}>마이페이지</MyPageBtn>
          </>
        )}
      </Auth>
    </Wrapper>
  );
}
