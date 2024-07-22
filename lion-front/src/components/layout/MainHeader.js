import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import LoginBtn from "../button/LoginBtn";
import SignUpBtn from "../button/SignUpBtn";
import { useNavigate } from "react-router-dom";
import redlogo from "../../assets/redlogo.png";
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
  z-index: 1;
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
const Select = styled.div`
  display: flex;
  align-items: center;
`;
const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #F06E6E; /* 로고 텍스트 색상 */
  margin: 0;
  padding: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 텍스트 그림자 효과 */
  cursor: pointer;
`;

export default function MainHeader() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    return (
        <Wrapper>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: '5px',
            }}>

              <img src={redlogo} alt="logo" onClick={handleClick}></img>
              <LogoText onClick={handleClick}>FORHERO</LogoText>
            
            </div>
            <Auth>
              <LoginBtn/>
              <SignUpBtn/>
            </Auth>
        </Wrapper>
    )
}
