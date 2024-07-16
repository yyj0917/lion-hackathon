import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import fireheroLogo from "../assets/fireheroLogo.png";
import LoginBtn from "../../src/components/LoginBtn";
import SignUpBtn from "../../src/components/SignUpBtn";
const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1440px;
  img {
    width: auto;
    height: 90px;
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

export default function MainHeader() {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/profile');
    // }
    return (
        <Wrapper>
            <img src={fireheroLogo} alt="logo"></img>
            <Auth>
              <LoginBtn/>
              <SignUpBtn/>
            </Auth>
        </Wrapper>
    )
}
