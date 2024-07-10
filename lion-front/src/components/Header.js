import styled from "styled-components";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";

const Wrapper = styled.header`
  border: 3px solid red;
  width: 95%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;
const Center = styled.h1`
  font-family: "Black Han Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: red;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
`;
const Right = styled.div`
  margin-left: auto;
`;

export default function Header() {
    return (
        <Wrapper>
            <Center>ForHero</Center>
            <Right>
                <LoginBtn></LoginBtn>
                <SignUpBtn></SignUpBtn>
            </Right>
        </Wrapper>
    )
}